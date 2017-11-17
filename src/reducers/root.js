import {
  playbackReducer,
  tempoReducer,
  melodyGridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  melodyGrid: melodyGridReducer
})

export default reducer
