import { Fade } from 'reactstrap';
import { create } from 'zustand';

let socket;
const PannelData = create((set) => ({
    inspectedPanels: 0,
    okayPanels: 0,
    defectedPanels: 0,
    defectedType: {},
    defectState:true,
    imageMain:"",

    connectSocket: () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            socket = new WebSocket('ws://localhost:8765')

            socket.addEventListener('open', () => {
                console.log("Connection Established Sucssesfully")
            });

            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                console.log("WS recived this data", data);
                Object.entries(data.defectTypes).forEach(([key, value]) => {
                    console.log(`Defect Type - ${key}: ${value}`);
                });
                set({
                    inspectedPanels: data.inspectedPanels || 0,
                    okayPanels: data.okayPanels || 0,
                    defectedPanels: data.defectedPanels || 0,
                    defectedType: data.defectTypes || {},
                    defectState:data.defected_States,
                    imageMain:data.image_urls.raw_image|| ""
                });
            })
            socket.addEventListener('close', () => {
                console.log("WebSocket Closed")
            })
            socket.addEventListener("error", (err) => {
                console.error("WebSocket Error", err)
            })

        }
    },
    getSocketInstance: () => socket,

}));
export default PannelData;
