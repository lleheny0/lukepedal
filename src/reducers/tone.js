import {
  TOGGLE_PLAYBACK,
  ADJUST_TEMPO
} from '../actions/actions'
import Tone from 'tone'

const synth = new Tone.Synth().toMaster()
const loop = new Tone.Loop(function(time) {
	synth.triggerAttackRelease("C4", "8n", time)
}, "4n")
loop.start("0m").stop("2m")

const transport = Tone.Transport

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
    console.log(Tone.Transport.bpm.value)
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
