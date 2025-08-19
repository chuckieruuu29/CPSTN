import Echo from 'laravel-echo';
import { io } from 'socket.io-client';

let echoInstance = null;

export function getEcho() {
  if (echoInstance) return echoInstance;
  const driver = (process.env.REACT_APP_ECHO_DRIVER || 'socketio').toLowerCase();
  if (driver === 'pusher') {
    // eslint-disable-next-line no-undef
    window.Pusher = require('pusher-js');
    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: process.env.REACT_APP_PUSHER_KEY,
      cluster: process.env.REACT_APP_PUSHER_CLUSTER || 'mt1',
      wsHost: process.env.REACT_APP_PUSHER_HOST,
      wsPort: Number(process.env.REACT_APP_PUSHER_PORT || 6001),
      wssPort: Number(process.env.REACT_APP_PUSHER_PORT || 6001),
      forceTLS: (process.env.REACT_APP_PUSHER_TLS || 'false') === 'true',
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: (process.env.REACT_APP_API_URL || 'http://localhost:8000/api') + '/broadcasting/auth'
    });
  } else {
    // Socket.io
    echoInstance = new Echo({
      broadcaster: 'socket.io',
      client: io,
      host: process.env.REACT_APP_SOCKET_URL || 'http://localhost:6001',
      transports: ['websocket']
    });
  }
  return echoInstance;
}

export function listenNotifications(callback) {
  const echo = getEcho();
  const channel = echo.channel('notifications');
  channel.listen('.new-order', (data) => callback({ type: 'new-order', data }));
  channel.listen('.low-stock', (data) => callback({ type: 'low-stock', data }));
  return () => {
    echo.leaveChannel('notifications');
  };
}

