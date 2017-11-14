import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { togglePlayback, adjustTempo } from '../actions/actions'


class Looper extends Component {

  handleChange(event) {
    this.setState({tempo: event.target.value});
  }

  render() {
    let { playing, tempo, togglePlayback, adjustTempo } = this.props

    return (
      <div className='looper'>
        <div className='step-counter'>
          { 'placeholder' }
        </div>
        <div className='tempo-slider'>
          { 'tempo' }
          <input
            type='range'
            min='60'
            max='180'
            value={tempo}
            onChange={
              (event) => {
                adjustTempo(event.target.value)
              }
            }
          />
        </div>
        <button
          className='playback-toggle'
          onClick={ () => togglePlayback() }>
          { playing ? '◼' : '►' }
        </button>
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
