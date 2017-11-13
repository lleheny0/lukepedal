import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'
import togglePlayback from '../actions/actions'


class Looper extends Component {

  componentDidMount() {
  }

  togglePlayback() {
    this.props.togglePlayback();
  }

  render() {
    let { playing } = this.props
    console.log(this.props)
    return (
      <div className='looper'>
        <div className='step-counter'>
          {Tone.Transport.position}
        </div>
        <button
          className='playback-toggle'
          onClick={ togglePlayback }>
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

const mapDispatchToProps = {
  togglePlayback
}

export default connect(mapStateToProps, mapDispatchToProps)(Looper)
