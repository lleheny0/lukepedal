import {
  playbackReducer,
  tempoReducer,
  viewReducer,
  melodyGridReducer,
  bassGridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  view: viewReducer,
  melodyGrid: melodyGridReducer,
  bassGrid: bassGridReducer
})

export default reducer
