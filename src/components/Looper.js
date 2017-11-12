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
    Tone.Transport.start()
  }

  handlePlaybackToggle() {
  }

  render() {
    let { steps, currentStep, playing } = this.state
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
