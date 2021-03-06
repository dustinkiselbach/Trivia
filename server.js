const express = require('express')
const http = require('http')
const app = express()
const index = require('./routes/index')
const server = http.createServer(app)
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  updateUserScore
} = require('./utils/users')
const { preGame, gameStarts, getWinner } = require('./game/trivia')

const io = socketio(server)

app.use(index)

const botName = 'TriviaBunny Bot'

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    console.log(username, room, socket.id)

    socket.join(user.room)

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Triva'))

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the game`)
      )

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  // Setting up game
  socket.on('preGame', params => {
    preGame(params)
  })

  // Listen for gameStart
  socket.on('gameStart', () => {
    const user = getCurrentUser(socket.id)

    gameStarts(io.to(user.room))
  })

  // Listen for scorechange
  socket.on('updateScore', score => {
    const user = updateUserScore(socket.id, score)

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  // Listen for gameEnd
  socket.on('gameEndOn', () => {
    const user = getCurrentUser(socket.id),
      users = getRoomUsers(user.room),
      winners = getWinner(users)

    if (winners.length === 1) {
      io.to(user.room).emit(
        'message',
        formatMessage(
          botName,
          `${winners[0].username} has won the game with ${winners[0].score} points. Please play again.`
        )
      )
    } else {
      io.to(user.room).emit(
        'message',
        formatMessage(
          botName,
          `${winners.map(
            winner => winner.username + ' , '
          )} have won the game with ${winners[0].score} points`
        )
      )
    }
  })

  // runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    console.log('gone')

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the game`)
      )
      //   Send users andd room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })
})

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
