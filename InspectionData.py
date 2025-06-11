import asyncio
import json
import random
import os
import glob
from datetime import datetime
import websockets

from aiohttp import web
import aiohttp_cors

# Configuration for panels
TOTAL_PANELS_RANGE = (25, 35)
DEFECT_PERCENTAGE_RANGE = (20, 40)
DEFECT_TYPES = ["Printing", "Material", "Touching", "Cutting"]
UPDATE_INTERVAL = 60
INSPECTED_PANELS_RANGE = (15, 30)

# Connected clients
connected_clients = set()

# Trackers for gradual increase
previous_total_panels = random.randint(*TOTAL_PANELS_RANGE)
previous_inspected_panels = random.randint(*INSPECTED_PANELS_RANGE)

# --- IMAGE SERVER SETUP ---
IMAGES_PORT = 8063
BASE_DIR = os.path.dirname(__file__)
IMAGES_DIR = os.path.join(BASE_DIR, "images")
RAW_DIR    = os.path.join(IMAGES_DIR, "raw")
CROP_A_DIR = os.path.join(IMAGES_DIR, "crop_a")
CROP_B_DIR = os.path.join(IMAGES_DIR, "crop_b")

for d in (RAW_DIR, CROP_A_DIR, CROP_B_DIR):
    os.makedirs(d, exist_ok=True)

def get_latest_images():
    """Find the newest image in each folder, or fall back to default."""
    def latest_in(dirpath, default_name):
        exts = ("*.jpg","*.jpeg","*.png")
        files = []
        for e in exts:
            files += glob.glob(os.path.join(dirpath, e))
        if not files:
            return f"http://localhost:{IMAGES_PORT}/images/{default_name}/{default_name}.jpg"
        files.sort(key=os.path.getmtime, reverse=True)
        fn = os.path.basename(files[0])
        return f"http://localhost:{IMAGES_PORT}/images/{default_name}/{fn}"

    return {
        "raw_image": latest_in(RAW_DIR,    "raw"),
        "crop_a":    latest_in(CROP_A_DIR, "crop_a"),
        "crop_b":    latest_in(CROP_B_DIR, "crop_b"),
    }

async def handle_get_image(request):
    """Serve up raw / crop_a / crop_b images with fallback to default."""
    t = request.match_info['type']
    fn = request.match_info['filename']
    if t == "raw":
        d = RAW_DIR; default = "default_raw.jpg"
    elif t == "crop_a":
        d = CROP_A_DIR; default = "default_crop_a.jpg"
    elif t == "crop_b":
        d = CROP_B_DIR; default = "default_crop_b.jpg"
    else:
        return web.Response(text="Invalid image type", status=400)

    path = os.path.join(d, fn)
    if not os.path.exists(path):
        path = os.path.join(d, default)
        if not os.path.exists(path):
            return web.Response(text="No image found", status=404)
    return web.FileResponse(path)

async def start_image_http_server():
    app = web.Application()
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*"
        )
    })
    r = app.router.add_get('/images/{type}/{filename}', handle_get_image)
    cors.add(r)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, 'localhost', IMAGES_PORT)
    await site.start()
    print(f"Image HTTP server running on http://localhost:{IMAGES_PORT}")
    return runner

# --- PANEL DATA GENERATION ---
async def generate_panel_data():
    global previous_total_panels, previous_inspected_panels

    total_panels = min(previous_total_panels + random.randint(0,2), TOTAL_PANELS_RANGE[1])
    inspected_panels = max(
        min(previous_inspected_panels + random.randint(-1,2), INSPECTED_PANELS_RANGE[1]),
        INSPECTED_PANELS_RANGE[0]
    )
    previous_total_panels = total_panels
    previous_inspected_panels = inspected_panels

    defected_panels = int(total_panels * (random.randint(*DEFECT_PERCENTAGE_RANGE)/100))
    okay_panels = total_panels - defected_panels

    chart_data = {
        "series": [defected_panels, okay_panels, total_panels],
        "labels": ["Defected", "Okay", "Total"]
    }

    defect_types_data = {}
    rem = defected_panels
    for t in DEFECT_TYPES[:-1]:
        cnt = random.randint(0, rem) if rem>0 else 0
        defect_types_data[t] = cnt
        rem -= cnt
    defect_types_data[DEFECT_TYPES[-1]] = rem

    return {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "totalPanels": total_panels,
        "defectedPanels": defected_panels,
        "okayPanels": okay_panels,
        "inspectedPanels": inspected_panels,
        "defected_States": random.choice([True, False]),
        "chartData": chart_data,
        "defectTypes": defect_types_data,
        "image_urls": get_latest_images()
    }

async def send_panel_updates():
    while True:
        data = await generate_panel_data()
        if connected_clients:
            await asyncio.gather(*[ws.send(json.dumps(data)) for ws in connected_clients])
            print(f"Sent to {len(connected_clients)} clients: {data}")
        await asyncio.sleep(UPDATE_INTERVAL)

async def handle_client(ws):
    print(f"Client connected: {ws.remote_address}")
    connected_clients.add(ws)
    try:
        await ws.send(json.dumps(await generate_panel_data()))
        async for _ in ws: pass
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        connected_clients.remove(ws)
        print(f"Client disconnected: {ws.remote_address}")

async def main():
    # start image server
    image_runner = await start_image_http_server()

    # start websocket
    ws_server = await websockets.serve(handle_client, "localhost", 8765)
    print("WebSocket server listening on ws://localhost:8765")

    # kick off updates
    updater = asyncio.create_task(send_panel_updates())

    try:
        await asyncio.Future()
    finally:
        ws_server.close()
        await ws_server.wait_closed()
        await image_runner.cleanup()

if __name__ == "__main__":
    asyncio.run(main())
