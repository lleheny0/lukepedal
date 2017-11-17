import {
  TOGGLE_PLAYBACK,
  ADJUST_TEMPO,
  TOGGLE_NOTE
} from '../actions/actions'
import Tone from 'tone'

Tone.Transport.loop = true
Tone.Transport.loopStart = '0'
Tone.Transport.loopEnd = '1m'
Tone.Transport.start()

const synths = []
for(let i = 0; i < 7; i++) {
  synths.push(new Tone.Synth().toMaster())
}

const initialGrid = []

for (let i = 0; i < 7; i++) {
  initialGrid[i] = []
  for (let j = 0; j < 16; j++) {
    initialGrid[i][j] = {
      on: false,
      event: null
    }
  }
}

const pitches = [
  'C5',
  'B4',
  'A4',
  'G4',
  'E4',
  'D4',
  'C4',
]

export const playbackReducer = (state = true, action) => {
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

export const gridReducer = (state = initialGrid, action) => {
  if (action.type === TOGGLE_NOTE) {
    return state.map((row, rowIndex) => {
      if (rowIndex === action.row) {
        return row.map((column, columnIndex) => {
          if (columnIndex === action.column) {
            let event = null
            if (!column.on) {
              event = Tone.Transport.schedule((time) => {
                synths[action.row].triggerAttackRelease(pitches[action.row], '16n')
              }, `0:0:${action.column}`)
              return {
                ...state,
                on: true,
                event: event
              }
            } else {
              Tone.Transport.clear(column.event)
              return {
                ...state,
                event: null
              }
            }
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
