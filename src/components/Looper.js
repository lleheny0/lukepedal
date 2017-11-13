import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tone from 'tone'
import togglePlayback from '../actions/actions'


class Looper extends Component {

  render() {
    let { playing, togglePlayback } = this.props
    console.log(this.props)
    return (
      <div className='looper'>
        <div className='step-counter'>
          {Tone.Transport.position}
        </div>
        <button
          className='playback-toggle'
          onClick={ () => togglePlayback() }>
          { playing ? 'Stop' : 'Play' }
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    playing: state.playback.playing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({togglePlayback}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Looper)
