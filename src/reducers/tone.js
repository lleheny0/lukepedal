import {
  TOGGLE_PLAYBACK,
  ADJUST_TEMPO,
  CHANGE_VIEW,
  TOGGLE_MELODY_NOTE,
  CLEAR_MELODY_GRID,
  HIGHLIGHT_MELODY_COLUMN,
  TOGGLE_BASS_NOTE,
  CLEAR_BASS_GRID,
  HIGHLIGHT_BASS_COLUMN,
  TOGGLE_DRUM_NOTE,
  CLEAR_DRUM_GRID,
  HIGHLIGHT_DRUM_COLUMN
} from '../actions/actions'
import Tone from 'tone'

const loopLength = 128
const initialTempo = 90

Tone.Transport.loop = true
Tone.Transport.loopStart = '0'
Tone.Transport.loopEnd = `0:0:${loopLength}`
Tone.Transport.bpm.value = initialTempo
Tone.Transport.start('1s')

const melodyPitches = [
  'C5',
  'B4',
  'A4',
  'G4',
  'E4',
  'D4',
  'C4',
]

const melodySynths = []
for (let i = 0; i < melodyPitches.length; i++) {
  melodySynths.push(new Tone.Synth({oscillator: {type: 'sine'}}).toMaster())
}

const initialMelodyGrid = []
for (let i = 0; i < melodyPitches.length; i++) {
  initialMelodyGrid[i] = []
  for (let j = 0; j < 16; j++) {
    initialMelodyGrid[i][j] = {
      on: false,
      event: null,
      activeColumn: false
    }
  }
}

const bassPitches = [
  'A2',
  'G2',
  'F2',
  'E2',
  'D2',
  'C2',
]

const bassSynths = []
for (let i = 0; i < bassPitches.length; i++) {
  bassSynths.push(new Tone.Synth().toMaster())
}

const initialBassGrid = []
for (let i = 0; i < bassPitches.length; i++) {
  initialBassGrid[i] = []
  for (let j = 0; j < 8; j++) {
    initialBassGrid[i][j] = {
      on: false,
      event: null,
      activeColumn: false
    }
  }
}

const bitCrusher = new Tone.BitCrusher(4).toMaster()
const pitchShift = new Tone.PitchShift(-48).toMaster()

const hatSynth = new Tone.NoiseSynth({
  volume: -6,
  envelope: {
    decay: 0.005
  }
}).toMaster()
const snareSynth = new Tone.NoiseSynth({
  volume: -6,
  noise: {
    type: 'white'
  },
  envelope: {
    decay: 0.1
  }
}).toMaster()
const kickSynth = new Tone.MembraneSynth({
  volume: 3,
  envelope: {
    decay: 2
  }
}).toMaster()

const initialDrumGrid = []
for (let i = 0; i < 3; i++) {
  initialDrumGrid[i] = []
  for (let j = 0; j < 16; j++) {
    initialDrumGrid[i][j] = {
      on: false,
      event: null,
      activeColumn: false
    }
  }
}

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

export const tempoReducer = (state = initialTempo, action) => {
  if (action.type === ADJUST_TEMPO) {
    Tone.Transport.bpm.value = action.tempo
    return action.tempo
  } else {
    return state
  }
}

export const viewReducer = (state = 'melody', action) => {
  if (action.type === CHANGE_VIEW) {
    return action.view
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
              let event
              if (!column.on) {
                event = Tone.Transport.scheduleRepeat((time) => {
                  melodySynths[action.row].triggerAttackRelease(melodyPitches[action.row], '16n')
                }, '1m', `0:0:${action.column}`)
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
          if (column.event) {
            Tone.Transport.clear(column.event)
          }
        })
      })
      return initialMelodyGrid
    case HIGHLIGHT_MELODY_COLUMN:
      return state.map((row) => {
        return row.map((column, columnIndex) => {
          if (action.column === columnIndex) {
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

export const bassGridReducer = (state = initialBassGrid, action) => {
  switch (action.type) {
    case TOGGLE_BASS_NOTE:
      return state.map((row, rowIndex) => {
        if (rowIndex === action.row) {
          return row.map((column, columnIndex) => {
            if (columnIndex === action.column) {
              let newColumn, event
              if (!column.on) {
                event = Tone.Transport.schedule((time) => {
                  bassSynths[action.row].triggerAttackRelease(bassPitches[action.row], '1n')
                }, `0:0:${action.column*16}`)
                newColumn = Object.assign({}, column, {
                  on: true,
                  event: event
                })
              } else {
                Tone.Transport.clear(column.event)
                newColumn = Object.assign({}, column, {
                  on: false,
                  event: null
                })
              }
              return newColumn
            } else {
              return column
            }
          })
        } else {
          return row.map((column, columnIndex) => {
            if (action.column === columnIndex) {
              if (column.on) {
                Tone.Transport.clear(column.event)
                return Object.assign({}, column, {
                  on: false,
                  event: null
                })
              } else {
                return column
              }
            } else {
              return column
            }
          })
        }
      })
    case CLEAR_BASS_GRID:
      state.forEach((row) => {
        row.forEach((column) => {
          if (column.event) {
            Tone.Transport.clear(column.event)
          }
        })
      })
      return initialBassGrid
    case HIGHLIGHT_BASS_COLUMN:
      return state.map((row) => {
        return row.map((column, columnIndex) => {
          if (action.column === columnIndex) {
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

export const drumGridReducer = (state = initialDrumGrid, action) => {
  switch (action.type) {
    case TOGGLE_DRUM_NOTE:
      return state.map((row, rowIndex) => {
        if (rowIndex === action.row) {
          return row.map((column, columnIndex) => {
            if (columnIndex === action.column) {
              let event
              let callback
              switch (action.row) {
                case 0:
                  callback = (time) => {
                    hatSynth.triggerAttackRelease('16n')
                  }
                  break
                case 1:
                  callback = (time) => {
                    snareSynth.triggerAttackRelease('16n')
                  }
                  break
                case 2:
                  callback = (time) => {
                    kickSynth.triggerAttackRelease('C0', '16n')
                  }
                  break
                default:
                  break
              }
              if (!column.on) {
                event = Tone.Transport.scheduleRepeat(callback, '1m', `0:0:${action.column}`)
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
    case CLEAR_DRUM_GRID:
      state.forEach((row) => {
        row.forEach((column) => {
          if (column.event) {
            Tone.Transport.clear(column.event)
          }
        })
      })
      return initialDrumGrid
    case HIGHLIGHT_DRUM_COLUMN:
      return state.map((row) => {
        return row.map((column, columnIndex) => {
          if (action.column === columnIndex) {
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
