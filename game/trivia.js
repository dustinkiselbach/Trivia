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

// TODO deal with adding caps on questions
function gameStarts (socket) {
  // Make call to api
  const apiCall = fetch()
  // deal with data
  apiCall.then(data => {
    if (data.results.length === 0) {
      socket.emit('message', formatMessage('bot', 'game finished'))
    } else {
      socket.emit('question', data.results[0])
      data.results.shift()
    }
  })
}

// TODO calculate winner
// function for adding all users points
function getWinner (users) {
  // Getting the scores from each user object
  const scores = users.map(user => user.score)
  console.log(users)

  // getting the highest score
  const max = Math.max(...scores)

  const res = []

  // getting index of highest scores in scores array
  scores.forEach((item, index) => (item === max ? res.push(index) : null))

  // now that the winning index is in res, we can get the winner by index
  return users[res[0]]
}

module.exports = {
  gameStarts,
  getWinner
}
