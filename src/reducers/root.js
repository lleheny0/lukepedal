import {
  playbackReducer,
  tempoReducer,
  loopReducer,
  synthReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  loop: loopReducer,
  synth: synthReducer
})

export default reducer
