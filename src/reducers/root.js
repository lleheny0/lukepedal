import {
  playbackReducer,
  tempoReducer,
  gridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  grid: gridReducer
})

export default reducer
