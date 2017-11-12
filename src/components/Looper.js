import React, { Component } from 'react'
import Tone from 'tone'

class Looper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
  }

  componentDidMount() {
  }

  handlePlaybackToggle() {
    Tone.Transport.start();
  }

  render() {
    var synth = new Tone.Synth().toMaster();
    var loop = new Tone.Loop(function(time){
      synth.triggerAttackRelease("C3", "8n", time);
    }, "4n");
    loop.start("1m").stop("3m");
    let { playing } = this.state
    return (
      <div className='looper'>
        <div className='step-counter'>
          {Tone.Transport.position}
        </div>
        <button
          className='playback-toggle'
          onClick={() => this.handlePlaybackToggle()}>
          { playing ? 'Stop' : 'Play' }
        </button>
      </div>
    )
  }
}

export default Looper

// pattern
// current step in pattern
// whether looper is playing

// AudioContext > setInterval
