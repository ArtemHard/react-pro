import { useEffect, useRef } from 'react';

export function WebSocketLogger() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://echo.websocket.org');
    socketRef.current = socket;

    socket.onmessage = (event) => {
      console.log('WebSocket сообщение:', event.data);
    };

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  return <p>WebSocket подключён, входящие сообщения логируются в консоль</p>;
}
