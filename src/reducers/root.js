import {
  playbackReducer,
  tempoReducer,
  loopReducer,
  synthReducer
} from './tone'
import {
  gridReducer
} from './grid'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  loop: loopReducer,
  synth: synthReducer,
  grid: gridReducer
})

export default reducer
