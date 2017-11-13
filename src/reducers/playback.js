import { TOGGLE_PLAYBACK } from '../actions/actions'

const initialState = {
  playing: false
}

export default (state = initialState, action) => {
  if (action.type === TOGGLE_PLAYBACK) {
    return {
      ...state,
      playing: !state.playing
    }
  } else {
    return state
  }
}
