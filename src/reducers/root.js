import {
  playbackReducer,
  tempoReducer,
  viewReducer,
  melodyGridReducer,
  bassGridReducer,
  drumGridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  view: viewReducer,
  melodyGrid: melodyGridReducer,
  bassGrid: bassGridReducer,
  drumGrid: drumGridReducer
})

export default reducer
