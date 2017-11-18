import {
  TOGGLE_PLAYBACK,
  ADJUST_TEMPO,
  TOGGLE_MELODY_NOTE,
  CLEAR_MELODY_GRID,
  HIGHLIGHT_MELODY_COLUMN
} from '../actions/actions'
import Tone from 'tone'

const loopLength = 32

Tone.Transport.loop = true
Tone.Transport.loopStart = '0'
Tone.Transport.loopEnd = `0:0:${loopLength}`
Tone.Transport.start('1s')

const synths = []
const reverb = new Tone.Freeverb(0.75).toMaster()
for(let i = 0; i < 7; i++) {
  synths.push(new Tone.Synth().toMaster().connect(reverb))
}

const initialMelodyGrid = []

for (let i = 0; i < 7; i++) {
  initialMelodyGrid[i] = []
  for (let j = 0; j < loopLength; j++) {
    initialMelodyGrid[i][j] = {
      on: false,
      event: null,
      activeColumn: false
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

export const tempoReducer = (state = 90, action) => {
  if (action.type === ADJUST_TEMPO) {
    Tone.Transport.bpm.value = action.tempo
    return action.tempo
  } else {
    return state
  }
}

export const melodyGridReducer = (state = initialMelodyGrid, action) => {
  switch (action.type) {
    case TOGGLE_MELODY_NOTE:
      return state.map((row, rowIndex) => {
        if (rowIndex === action.row) {
          return row.map((column, columnIndex) => {
            if (columnIndex === action.column) {
              let event = null
              if (!column.on) {
                event = Tone.Transport.schedule((time) => {
                  synths[action.row].triggerAttackRelease(pitches[action.row], '16n')
                }, `0:0:${action.column}`)
                return Object.assign({}, column, {
                  on: true,
                  event: event
                })
              } else {
                Tone.Transport.clear(column.event)
                return Object.assign({}, column, {
                  on: false,
                  event: null
                })
              }
            } else {
              return column
            }
          })
        } else {
          return row
        }
      })
    case CLEAR_MELODY_GRID:
      state.forEach((row) => {
        row.forEach((column) => {
          if(column.event !== null) {
            Tone.Transport.clear(column.event)
          }
        })
      })
      return initialMelodyGrid
    case HIGHLIGHT_MELODY_COLUMN:
      return state.map((row) => {
        return row.map((column, columnIndex) => {
          if(action.column === columnIndex) {
            return Object.assign({}, column, {
              activeColumn: true
            })
          } else {
            return Object.assign({}, column, {
              ...column,
              activeColumn: false
            })
          }
        })
      })
    case TOGGLE_PLAYBACK:
    return state.map((row) => {
      return row.map((column, columnIndex) => {
        return Object.assign({}, column, {
          activeColumn: false
        })
      })
    })
    default:
      return state
  }
}
