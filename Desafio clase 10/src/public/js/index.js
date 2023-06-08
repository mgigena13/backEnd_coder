const socket = io();
socket.emit('message', 'Hola me estoy comunicando desde websocket');

socket.on('user_connected', (data) => {
    console.log(data);
})

socket.on('individual', (data) => {
    console.log(data);
})