
const socket = io('http://127.0.0.1:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messsageElement = document.createElement('div');
    messsageElement.innerText = message;
    messsageElement.classList.add('message');
    messsageElement.classList.add(position);
    messageContainer.append(messsageElement);
}

var form1 = document.getElementById('send-container')
form1.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
let userName = prompt('Entry your name to join');
console.log(userName);
socket.emit('new-user-joined', userName);

socket.on('user-joined', userName => {
    append(`${userName} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', data => {
    append(`${data.name} left the chat`, 'left')
})