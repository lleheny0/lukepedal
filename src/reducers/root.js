import {
  playbackReducer,
  tempoReducer,
  viewReducer,
  melodyGridReducer,
  chordGridReducer,
  drumGridReducer
} from './tone'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  playing: playbackReducer,
  tempo: tempoReducer,
  view: viewReducer,
  melodyGrid: melodyGridReducer,
  chordGrid: chordGridReducer,
  drumGrid: drumGridReducer
})

export default reducer
