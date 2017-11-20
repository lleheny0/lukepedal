export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK'
export const ADJUST_TEMPO = 'ADJUST_TEMPO'
export const CHANGE_VIEW = 'CHANGE_VIEW'
export const TOGGLE_MELODY_NOTE = 'TOGGLE_MELODY_NOTE'
export const CLEAR_MELODY_GRID = 'CLEAR_MELODY_GRID'
export const HIGHLIGHT_MELODY_COLUMN = 'HIGHLIGHT_MELODY_COLUMN'
export const TOGGLE_BASS_NOTE = 'TOGGLE_BASS_NOTE'
export const CLEAR_BASS_GRID = 'CLEAR_BASS_GRID'
export const HIGHLIGHT_BASS_COLUMN = 'HIGHLIGHT_BASS_COLUMN'

export const togglePlayback = () => {
  return { type: TOGGLE_PLAYBACK }
}

export const adjustTempo = (tempo) => {
  return { type: ADJUST_TEMPO, tempo }
}

export const changeView = (view) => {
  return { type: CHANGE_VIEW, view }
}

export const toggleMelodyNote = (row, column) => {
  return { type: TOGGLE_MELODY_NOTE, row, column }
}

export const clearMelodyGrid = () => {
  return { type: CLEAR_MELODY_GRID }
}

export const highlightMelodyColumn = (column) => {
  return { type: HIGHLIGHT_MELODY_COLUMN, column }
}

export const toggleBassNote = (row, column) => {
  return { type: TOGGLE_BASS_NOTE, row, column }
}

export const clearBassGrid = () => {
  return { type: CLEAR_BASS_GRID }
}

export const highlightBassColumn = (column) => {
  return { type: HIGHLIGHT_BASS_COLUMN, column }
}
