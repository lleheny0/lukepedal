export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK'
export const ADJUST_TEMPO = 'ADJUST_TEMPO'
export const CHANGE_VIEW = 'CHANGE_VIEW'
export const TOGGLE_MELODY_NOTE = 'TOGGLE_MELODY_NOTE'
export const CLEAR_MELODY_GRID = 'CLEAR_MELODY_GRID'
export const HIGHLIGHT_MELODY_COLUMN = 'HIGHLIGHT_MELODY_COLUMN'
export const TOGGLE_CHORD = 'TOGGLE_CHORD'
export const CLEAR_CHORD_GRID = 'CLEAR_CHORD_GRID'
export const HIGHLIGHT_CHORD = 'HIGHLIGHT_CHORD'
export const TOGGLE_DRUM_NOTE = 'TOGGLE_DRUM_NOTE'
export const CLEAR_DRUM_GRID = 'CLEAR_DRUM_GRID'
export const HIGHLIGHT_DRUM_COLUMN = 'HIGHLIGHT_DRUM_COLUMN'

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

export const toggleChord = (row, column) => {
  return { type: TOGGLE_CHORD, row, column }
}

export const clearChordGrid = () => {
  return { type: CLEAR_CHORD_GRID }
}

export const highlightChord = (column) => {
  return { type: HIGHLIGHT_CHORD, column }
}

export const toggleDrumNote = (row, column) => {
  return { type: TOGGLE_DRUM_NOTE, row, column }
}

export const clearDrumGrid = () => {
  return { type: CLEAR_DRUM_GRID }
}

export const highlightDrumColumn = (column) => {
  return { type: HIGHLIGHT_DRUM_COLUMN, column }
}
