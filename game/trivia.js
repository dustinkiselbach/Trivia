const formatMessage = require('../utils/messages')
const axios = require('axios')

// Getting questions
const fetch = async () => {
  try {
    const res = await axios.get(
      'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple'
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}

function questions (socket, data, i) {
  return new Promise(resolve => {
    setTimeout(() => {
      socket.emit('question', { data })

      resolve(data)
    }, 10000 * (i + 1))
  })
}

function gameStarts (socket) {
  let promises = []

  const apiCall = fetch()

  apiCall.then(sampleData => {
    for (let i = 0; i < sampleData.results.length; i++) {
      promises.push(questions(socket, sampleData.results[i], i))
    }

    Promise.all(promises).then(questions => {
      //   socket.emit('gameOver')
      // TODO get the scoreboards working
      console.log('questions done')
    })
  })
}

// TODO calculate winner
// function for adding all users points
function addScores (users) {
  for (let i = 0; i < users.length; i++) {
    console.log(users[i])
  }
}

module.exports = {
  gameStarts,
  addScores
}
