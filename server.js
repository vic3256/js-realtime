'use strict';

var http = require('http');
var express = require('express');
var socketio = require('socket.io');

const app = express();
// set view engine
app.set('view engine', 'jade');
// public assets
app.use(express.static('./public'));


// app.use((req, res, next) => {
// 	console.log('In middleware 1');
// 	next();
// 	console.log('Out of middleware 1');
// });

// app.use((req, res, next) => {
// 	console.log('--- In middleware 2');
// 	next();
// 	console.log('--- Out of middleware 2');
// });

app.get('/', (req, res) => {
	res.end('JS Rocks!');
	console.log('In Handler');
});

app.get('/home', (req, res) => {
	res.render('index', {title: 'JS RX'});
});

const server = new http.Server(app);

const port = 3000;
const io = socketio(server);

// socket.on's only apply to the socket we are looking at. Not all the sockets.
io.on('connection', socket => {
	console.log('Client Connected');
	// the 'chat: add' handler is added for every socket that connects. (new function for every connection)
	socket.on('chat: add', data => {
		console.log(data);
		// emit - broadcast to everyone
		io.emit('chat: added', data);
	});

	socket.on('disconnect', () => {
		console.log('Socket Disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});