import { io } from 'socket.io-client';

let socketInstance = null;

export function getSocket() {
    if (!socketInstance) {
        const url = process.env.REACT_APP_SOCKET_URL || 'http://localhost:6001';
        socketInstance = io(url, { transports: ['websocket'], autoConnect: true });
    }
    return socketInstance;
}

export function listenNotifications(callback) {
    const socket = getSocket();
    socket.on('new-order', (data) => callback({ type: 'new-order', data }));
    socket.on('low-stock', (data) => callback({ type: 'low-stock', data }));
}

export function disconnectSocket() {
    if (socketInstance) socketInstance.disconnect();
}