import { GET_ROOM, GET_USERNAME, GET_CATEGORIES } from '../types'

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
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}
