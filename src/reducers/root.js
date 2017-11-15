import {
  playbackReducer,
  tempoReducer,
  loopReducer,
  synthReducer,
  gridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  loop: loopReducer,
  synth: synthReducer,
  grid: gridReducer
})

export default reducer
