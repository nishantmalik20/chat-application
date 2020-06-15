const express  = require('express')
const app      = express()
const port     = 3000
const server   = app.listen(port, () => {console.log(`Server running at http://localhost:${port}`)})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('.'))

const io = require('socket.io').listen(server)
const user = {}
io.on('connection', function (socket) {
    socket.on('new-user', name => {
        user[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
	console.log('new user')
   // Listen for a "newuser" message
   socket.on('send-the-message', (data) => {
      // display user name in front of their messages
      socket.broadcast.emit('send-the-message', {data: data, name: user[socket.id]})
    // handling event back to console
    socket.on('send-the-message', newMessage => {
        console.log(newMessage)
    })
      // The same as above, but sent to *all* users - try it!
      // io.emit('newuser', data)
   })
})
