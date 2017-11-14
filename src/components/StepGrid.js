import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleNote } from '../actions/actions'


class StepGrid extends Component {

  // handleChange(event) {
  //   this.setState({tempo: event.target.value});
  // }

  render() {
    let { grid } = this.props

    let table

    return (
      <div className='grid'>
        { table }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    grid: state.grid
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleNote }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StepGrid)
