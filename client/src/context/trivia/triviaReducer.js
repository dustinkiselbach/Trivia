import { GET_ROOM, GET_USERNAME, GET_CATEGORIES, GET_PARAMS } from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_ROOM:
      return {
        ...state,
        room: action.payload
      }
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    case GET_PARAMS:
      return {
        ...state,
        numberOfQuestions: action.payload.questions,
        difficulty: action.payload.difficulty
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}
