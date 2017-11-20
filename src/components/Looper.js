import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  togglePlayback,
  adjustTempo,
  changeView,
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
      view,
      melodyGrid,
      togglePlayback,
      adjustTempo,
      changeView,
      toggleMelodyNote,
      clearMelodyGrid
    } = this.props

    let visibleGrid

    switch (view) {
      case 'melody':
        visibleGrid = <StepGrid
          grid={melodyGrid}
          toggleNote={toggleMelodyNote}
          className='melody-grid grid'
          clear={clearMelodyGrid}
        />
        break
      default:
        visibleGrid = <div />
    }

    return (
      <div className='looper'>
        <div className='header'>
          <span className='playback-toggle'>
            <button
              className={ playing ? 'on' : 'off'}
              onClick={ () => togglePlayback() }>
              { playing ? '►' : '❙❙' }
            </button>
          </span>
          <span className='tempo-info'>
            <span>
              { `tempo: ${tempo}` }
            </span>
            <input
              type='range'
              min='30'
              max='180'
              className='tempo-slider'
              value={tempo}
              onChange={ (event) => { adjustTempo(event.target.value) } }
            />
          </span>
          <span className='title'>
            { '☻ sequencer' }
          </span>
        </div>
        <div className='view-switcher'>
          <button
            className='view-button melody-view-button'
            onClick={ () => changeView('melody') }
          />
          <button
            className='view-button bass-view-button'
            onClick={ () => changeView('bass') }
          />
          <button
            className='view-button drums-view-button'
            onClick={ () => changeView('drums') }
          />
        </div>
        <div className='melody-grid-container'>
          { visibleGrid }
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
    view: state.view
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    togglePlayback,
    adjustTempo,
    changeView,
    toggleMelodyNote,
    clearMelodyGrid,
    highlightMelodyColumn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Looper)
