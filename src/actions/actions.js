export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK'
export const ADJUST_TEMPO = 'ADJUST_TEMPO'
export const TOGGLE_MELODY_NOTE = 'TOGGLE_MELODY_NOTE'
export const CLEAR_MELODY_GRID = 'CLEAR_MELODY_GRID'

export const togglePlayback = () => {
  return { type: TOGGLE_PLAYBACK }
}

export const adjustTempo = (tempo) => {
  return { type: ADJUST_TEMPO, tempo }
}

export const toggleMelodyNote = (row, column) => {
  return { type: TOGGLE_MELODY_NOTE, row, column }
}

export const clearMelodyGrid = () => {
  return { type: CLEAR_MELODY_GRID }
}
