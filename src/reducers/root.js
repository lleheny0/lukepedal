import {
  playbackReducer,
  tempoReducer,
  viewReducer,
  melodyGridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  view: viewReducer,
  melodyGrid: melodyGridReducer
})

export default reducer
