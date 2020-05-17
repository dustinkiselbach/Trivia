const formatMessage = require('../utils/messages')
const axios = require('axios')

// Variable to hold Data
let questions = {}

// Getting questions
const fetch = async (numberOfQuestions, difficulty) => {
  try {
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}`
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}

function preGame (params) {
  const apiCall = fetch(params.numberOfQuestions, params.difficulty)

  apiCall.then(data => {
    questions = data.results
  })
}

// TODO deal with adding caps on questions
function gameStarts (socket) {
  if (questions.length === 0) {
    socket.emit('gameEnd')
  } else {
    socket.emit('question', questions[0])
    questions.shift()
  }
}

// function for adding all users points
function getWinner (users) {
  // Getting the scores from each user object
  const scores = users.map(user => user.score)

  // getting the highest score
  const max = Math.max(...scores)

  // index of the winners
  const res = []

  // getting index of highest scores in scores array
  scores.forEach((item, index) => (item === max ? res.push(index) : null))

  const winners = res.map(index => users[index])

  // now that the winning index is in res, we can get the winner by index
  // return users[res[0]]
  return winners
}

module.exports = {
  preGame,
  gameStarts,
  getWinner
}
