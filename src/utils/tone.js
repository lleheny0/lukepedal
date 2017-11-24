import Tone from 'tone'

export const loopLength = 128
export const initialTempo = 90

export const melodyPitches = [ 'C5', 'B4', 'A4', 'G4', 'E4', 'D4', 'C4' ]

export const bassPitches = [ 'A2', 'G2', 'F2', 'E2', 'D2', 'C2' ]

const melodySynths = []
for (let i = 0; i < melodyPitches.length; i++) {
  melodySynths.push(new Tone.Synth({
    oscillator: {type: 'sine'},
    volume: -15
  }).toMaster())
}

const bassSynths = []
for (let i = 0; i < bassPitches.length; i++) {
  bassSynths.push(new Tone.Synth({
    oscillator: {type: 'sine'},
    volume: -9
  }).toMaster())
}

const hatSynth1 = new Tone.NoiseSynth({
  volume: -24,
  envelope: {
    decay: 0.05
  }
}).toMaster()

const hatSynth2 = new Tone.NoiseSynth({
  volume: -24,
  envelope: {
    decay: '8n'
  }
}).toMaster()
hatSynth2.set("noise.type", "white");

const snareSynth1 = new Tone.NoiseSynth({
  volume: -6,
  envelope: {
    decay: 0.1
  }
}).toMaster()
snareSynth1.set("noise.type", "pink");

const snareSynth2 = new Tone.NoiseSynth({
  volume: 0,
  envelope: {
    decay: 0.2
  }
}).toMaster()
snareSynth2.set("noise.type", "brown");

const kickSynth = new Tone.MembraneSynth({
  volume: -3
}).toMaster()

export {
  melodySynths,
  bassSynths,
  hatSynth1,
  hatSynth2,
  snareSynth1,
  snareSynth2,
  kickSynth
}

export const init = () => {
  Tone.context.latencyHint = 0.00001
  Tone.Transport.loop = true
  Tone.Transport.loopStart = '0'
  Tone.Transport.loopEnd = `0:0:${loopLength}`
  Tone.Transport.bpm.value = initialTempo
  Tone.Transport.start('+8n')
}
