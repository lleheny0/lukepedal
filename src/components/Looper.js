import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  togglePlayback,
  adjustTempo,
  changeView,
  toggleMelodyNote,
  clearMelodyGrid,
  highlightMelodyColumn,
  toggleBassNote,
  clearBassGrid,
  highlightBassColumn,
  toggleDrumNote,
  clearDrumGrid,
  highlightDrumColumn
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
      this.props.highlightMelodyColumn(position%16)
      this.props.highlightBassColumn(Math.floor(position/16))
      this.props.highlightDrumColumn(position%16)
    }, '0:0:1')
  }

  convertTo

  render() {
    let {
      playing,
      tempo,
      view,
      melodyGrid,
      bassGrid,
      drumGrid,
      togglePlayback,
      adjustTempo,
      changeView,
      toggleMelodyNote,
      clearMelodyGrid,
      toggleBassNote,
      clearBassGrid,
      toggleDrumNote,
      clearDrumGrid
    } = this.props

    let visibleGrid, visibleControls

    switch (view) {
      case 'melody':
        visibleGrid = <StepGrid
          grid={melodyGrid}
          toggleNote={toggleMelodyNote}
          className='melody-grid grid'
        />
        visibleControls =
        <span className='controls'>
          <button
            className='clear-button'
            onClick={ () => { clearMelodyGrid() } }>
            ✘
          </button>
        </span>
        break
      case 'bass':
        visibleGrid = <StepGrid
          grid={bassGrid}
          toggleNote={toggleBassNote}
          className='bass-grid grid'
          clear={clearBassGrid}
        />
        visibleControls =
        <span className='controls'>
          <button
            className='clear-button'
            onClick={ () => { clearBassGrid() } }>
            ✘
          </button>
        </span>
        break
      case 'drums':
        visibleGrid = <StepGrid
          grid={drumGrid}
          toggleNote={toggleDrumNote}
          className='drum-grid grid'
          clear={clearDrumGrid}
        />
        visibleControls =
        <span className='controls'>
          <button
            className='clear-button'
            onClick={ () => { clearDrumGrid() } }>
            ✘
          </button>
        </span>
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
          <span className='view-switcher'>
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
          </span>
          <span className='title'>
            { '☻ sequencer' }
          </span>
        </div>

        <div className='grid-container'>
          { visibleGrid }
          { visibleControls }
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
    bassGrid: state.bassGrid,
    drumGrid: state.drumGrid,
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
    highlightMelodyColumn,
    toggleBassNote,
    clearBassGrid,
    highlightBassColumn,
    toggleDrumNote,
    clearDrumGrid,
    highlightDrumColumn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Looper)
