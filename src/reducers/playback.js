import TOGGLE_PLAYBACK from '../actions/actions'

const initialState = {
  playing: false
}

export default function (state = initialState, action) {
  if (action.type === TOGGLE_PLAYBACK) {
    console.log(state)
    return [...state, { playback: { playing: !state.playback.playing } }]
  } else {
    return state
  }
}
