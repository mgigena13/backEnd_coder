import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productsRoutes from "./routes/products.router.js"


const app = express();
const serverHttp = app.listen(8080, () => console.log("Listening"));

const io = new Server(serverHttp);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);

app.use('/api/products', productsRoutes);


io.on('connection', socket => {
    console.log("Cliente conectado en el back", socket.id);
    socket.on('message', (data) => {
        console.log(data);
    })
    socket.broadcast.emit('user_connected', `user ${socket.id} has connected.`); //Reciben todos menos el socket actual desde el que se envio el mensaje
    socket.emit('individual', 'bienvenido')
        /*
socket.emit ('evento_para_socket_individual', 'Este mensaje solo lo debe recibir el socket');
socketSrver.emit('evento_para_todos', 'este mensaje lo reciben todos los sockets conectados');
    */
})