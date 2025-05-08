import asyncio
import json
import random
import websockets
from datetime import datetime

# Configuration for panels
TOTAL_PANELS_RANGE = (25, 35)  # Random range for total panels
DEFECT_PERCENTAGE_RANGE = (20, 40)  # Percentage of defected panels (20-40%)
DEFECT_TYPES = ["Printing", "Material", "Touching", "Cutting"]
UPDATE_INTERVAL = 60  # Update every 60 seconds (1 minute)

# Connected clients
connected_clients = set()

# To track previous total panel count and ensure gradual increase
previous_total_panels = random.randint(*TOTAL_PANELS_RANGE)

async def generate_panel_data():
    """Generate random panel data with gradual increase in total panels"""
    global previous_total_panels

    # Gradually increase total panels count by a small amount (within the range)
    total_panels = previous_total_panels + random.randint(0, 2)  # Only increase by 0, 1, or 2
    total_panels = min(total_panels, TOTAL_PANELS_RANGE[1])  # Ensure it doesn't exceed the max limit
    
    # Update the previous total panels value
    previous_total_panels = total_panels
    
    # Calculate defected panels (random percentage of total)
    defect_percentage = random.randint(*DEFECT_PERCENTAGE_RANGE) / 100
    defected_panels = int(total_panels * defect_percentage)
    
    # Calculate okay panels
    okay_panels = total_panels - defected_panels
    
    # Generate data for chart
    chart_data = {
        "series": [defected_panels, okay_panels, total_panels],
        "labels": ["Defected", "Okay", "Total"]
    }
    
    # Generate defect type distribution
    defect_types_data = {}
    remaining_defects = defected_panels
    
    # Distribute defects across categories
    for defect_type in DEFECT_TYPES[:-1]:  # All except the last one
        if remaining_defects > 0:
            type_count = random.randint(0, remaining_defects)
            defect_types_data[defect_type] = type_count
            remaining_defects -= type_count
        else:
            defect_types_data[defect_type] = 0
    
    # Assign remaining defects to the last category
    defect_types_data[DEFECT_TYPES[-1]] = remaining_defects
    
    # Complete data payload
    data = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "totalPanels": total_panels,
        "defectedPanels": defected_panels,
        "okayPanels": okay_panels,
        "chartData": chart_data,
        "defectTypes": defect_types_data
    }
    
    return data

async def send_panel_updates():
    """Send panel data updates to all connected clients"""
    while True:
        # Generate new data
        data = await generate_panel_data()
        
        # Send to all connected clients
        if connected_clients:
            await asyncio.gather(
                *[client.send(json.dumps(data)) for client in connected_clients]
            )
            print(f"Data sent to {len(connected_clients)} clients: {data}")
        
        # Wait for the next update interval
        await asyncio.sleep(UPDATE_INTERVAL)

# Updated handler function for newer websockets version
async def handle_client(websocket):
    """Handle individual client connection"""
    # Register client
    print(f"Client connected: {websocket.remote_address}")
    connected_clients.add(websocket)
    
    try:
        # Send initial data immediately upon connection
        initial_data = await generate_panel_data()
        await websocket.send(json.dumps(initial_data))
        
        # Keep the connection open and handle incoming messages if needed
        async for message in websocket:
            # For now, we're just ignoring client messages
            pass
    except websockets.exceptions.ConnectionClosed:
        print(f"Client disconnected: {websocket.remote_address}")
    finally:
        # Remove client from set when disconnected
        connected_clients.remove(websocket)

async def main():
    """Start the websocket server"""
    # Updated to use the new API style for newer websockets version
    async with websockets.serve(handle_client, "localhost", 8765):
        print("WebSocket server started on ws://localhost:8765")
        
        # Start the update task
        update_task = asyncio.create_task(send_panel_updates())
        
        # Keep the server running
        await asyncio.Future()  # This will run forever

if __name__ == "__main__":
    asyncio.run(main())
