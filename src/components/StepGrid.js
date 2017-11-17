import React, { Component } from 'react'

class StepGrid extends Component {

  render() {
    const { grid, toggleNote, className, clear } = this.props

    const clearButton = (
      <button
        className='clear-button'
        onClick={ () => { clear() } }>
        ✘
      </button>
    )

    const table = grid.map((row, rowIndex) => {
      return (
        <tr key={rowIndex}>
          {
            row.map((column, columnIndex) => {
              return (
                <td key={columnIndex}>
                  <button
                    key={`${rowIndex}-${columnIndex}`}
                    className={column.on ? 'grid-button on' : 'grid-button off'}
                    onClick={ () => { toggleNote(rowIndex, columnIndex) } }>
                  </button>
                </td>
              )
            })
          }
        </tr>
      )
    })

    return (
      <div className={className}>
      { clearButton }
        <table>
          <tbody>
            { table }
          </tbody>
        </table>
      </div>
    )
  }
}

export default StepGrid
