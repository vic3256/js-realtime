'use strict';
 
 const socket = io();

 const chatInput = document.querySelector('.chat-form input[type=text]');

 const date = moment().format('MMM Do YYYY, h:mm:ss a');

 chatInput.addEventListener('keypress', event => {
 	// if they did not press enter bail out of handler
 	if(event.keyCode !==  13) return;

 	event.preventDefault();

 	const text = event.target.value.trim();

 	// if no text was input don't do anyting
 	if(text.length === 0) return;

 	// pass an object so you can pass in metadata and other values, as opposed to a string with a single value
 	socket.emit('chat: add', {
 		message: text,
 		sentOn: date
 	});

 	// clear out textbox
 	event.target.value = '';

 });


// show chat message on the client side
const chatList = document.querySelector('.chat-list ul');

// receive added event and handling it
 socket.on('chat: added', data => {
 	const messageElement = document.createElement('li');
 	const timeElement = document.createElement('div');
 	timeElement.setAttribute('class', 'time')

 	// pass message that is emitted out
 	messageElement.innerText = data.message;
 	timeElement.innerText = data.sentOn;

 	chatList.appendChild(messageElement);
 	chatList.appendChild(timeElement);

 	chatList.scrollTop = chatList.scrollHeight;
 });