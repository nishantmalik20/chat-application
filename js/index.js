const socket = io()

// socket.emit('newuser', {user: 'Nishant Malik'})
socket.on('newuser', data => { appendMessage(`${data.name}:${data.newMessage}`)})
socket.on('user-connected', (name) => { appendMessage(`${name} has connected...`)})



//For our form
const msgform = document.getElementById('send-field')
const enterMessage = document.getElementById('write-msg')
const msgContainer = document.getElementById('message')

//To prevent page from loading up so that we don't lose our messages
msgform.addEventListener('submit', loading => {
    loading.preventDefault()
    const newMessage = enterMessage.value
    socket.emit('send-the-message', newMessage)
    enterMessage.value = ('')
})

function appendMessage(newMessage){
    const messageElement = document.createElement('div')
    messageElement.innerText = newMessage
    msgContainer.append(messageElement)
}

//Ask users their name:
const name = prompt('Please enter your name:')
appendMessage('You are in')
socket.emit('new-user', name)
