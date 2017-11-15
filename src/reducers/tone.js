import {
  TOGGLE_PLAYBACK,
  ADJUST_TEMPO,
  TOGGLE_NOTE
} from '../actions/actions'
import Tone from 'tone'

const synth = new Tone.Synth().toMaster()
const loop = new Tone.Loop(function(time) {
	synth.triggerAttackRelease("C4", "8n", time)
}, "8n")
loop.start("0m")

export const playbackReducer = (state = false, action) => {
  if (action.type === TOGGLE_PLAYBACK) {
    if (state) {
      Tone.Transport.stop()
      return false
    } else {
      Tone.Transport.start()
      return true
    }
  } else {
    return state
  }
}

export const tempoReducer = (state = 120, action) => {
  if (action.type === ADJUST_TEMPO) {
    Tone.Transport.bpm.value = action.tempo
    return action.tempo
  } else {
    return state
  }
}

export const loopReducer = (state = loop, action) => {
  return state
}

export const synthReducer = (state = synth, action) => {
  return state
}

const initialGrid = []

for (let i = 0; i < 6; i++) {
  initialGrid[i] = []
  for (let j = 0; j < 16; j++) {
    initialGrid[i][j] = false
  }
}

export const gridReducer = (state = initialGrid, action) => {
  if (action.type === TOGGLE_NOTE) {
    return state.map((row, rowIndex) => {
      if (rowIndex === action.row) {
        return row.map((column, columnIndex) => {
          if (columnIndex === action.column) {
            return !column
          } else {
            return column
          }
        })
      } else {
        return row
      }
    })
  } else {
    return state
  }
}
