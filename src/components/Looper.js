import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  togglePlayback,
  adjustTempo,
  toggleMelodyNote,
  clearMelodyGrid,
  highlightMelodyColumn
} from '../actions/actions'
import StepGrid from './StepGrid'
import Tone from 'tone'

class Looper extends Component {

  constructor(props) {
    super(props)
    Tone.Transport.scheduleRepeat((time) => {
      let position = parseInt(Tone.Transport.position.split(':')[0]*16, 10) +
                     parseInt(Tone.Transport.position.split(':')[1]*4, 10) +
                     parseInt(Tone.Transport.position.split(':')[2], 10)
      this.props.highlightMelodyColumn(position)
    }, '0:0:1')
  }

  convertTo

  render() {
    let {
      playing,
      tempo,
      melodyGrid,
      togglePlayback,
      adjustTempo,
      toggleMelodyNote,
      clearMelodyGrid
    } = this.props

    return (
      <div className='looper'>
        <div className='playback-toggle'>
          <button
            className={ playing ? 'on' : 'off'}
            onClick={ () => togglePlayback() }>
            { playing ? '◼' : '►' }
          </button>
        </div>
        <div className='title'>
          { '☻ sequencer' }
        </div>
        <div className='tempo-info'>
          { `tempo: ${tempo}` }
        </div>
        <div>
          <input
            type='range'
            min='30'
            max='240'
            className='tempo-slider'
            value={tempo}
            onChange={ (event) => { adjustTempo(event.target.value) } }
          />
        </div>
        <div className='melody-grid-container'>
          <StepGrid
            grid={melodyGrid}
            toggleNote={toggleMelodyNote}
            className='melody-grid grid'
            clear={clearMelodyGrid}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    playing: state.playing,
    tempo: state.tempo,
    melodyGrid: state.melodyGrid,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    togglePlayback,
    adjustTempo,
    toggleMelodyNote,
    clearMelodyGrid,
    highlightMelodyColumn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Looper)
