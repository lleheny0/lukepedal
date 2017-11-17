import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { togglePlayback, adjustTempo } from '../actions/actions'
import StepGrid from './StepGrid'


class Looper extends Component {

  handleChange(event) {
    this.setState({tempo: event.target.value})
  }

  render() {
    let { playing, tempo, togglePlayback, adjustTempo } = this.props

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
        <div>
          <StepGrid />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    playing: state.playing,
    tempo: state.tempo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({togglePlayback, adjustTempo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Looper)
