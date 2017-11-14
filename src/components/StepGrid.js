import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleNote } from '../actions/actions'


class StepGrid extends Component {

  render() {
    let { grid } = this.props

    let table = grid.map((row, rowIndex) => {
      return (
        <tr key={rowIndex}>
          {
            row.map((column, columnIndex) => {
              return (
                <td key={columnIndex}>
                  <button className={column.on ? 'grid-button on' : 'grid-button off'}>
                  </button>
                </td>
              )
            })
          }
        </tr>
      )
    })

    return (
      <div className='grid'>
        <table>
          <tbody>
            { table }
          </tbody>
        </table>
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
