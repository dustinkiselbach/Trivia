import { GET_ROOM, GET_USERNAME } from '../types'

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
    default:
      return state
  }
}
