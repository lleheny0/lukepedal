export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK'
export const ADJUST_TEMPO = 'ADJUST_TEMPO'
export const TOGGLE_NOTE = 'TOGGLE_NOTE'

export const togglePlayback = () => {
  return { type: TOGGLE_PLAYBACK }
}

export const adjustTempo = (tempo) => {
  return { type: ADJUST_TEMPO, tempo }
}

export const toggleNote = (row, column) => {
  return { type: TOGGLE_NOTE, row, column }
}
