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
              let className = 'grid-button '
              column.on ? className += 'on ' : className += 'off '
              column.activeColumn ? className += 'active ' : className += ''
              columnIndex % 4 === 0 ? className += 'beat' : className += ''
              return (
                <td key={columnIndex}>
                  <button
                    key={`${rowIndex}-${columnIndex}`}
                    className={className}
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
        <table>
          <tbody>
            { table }
          </tbody>
        </table>
        { clearButton }
      </div>
    )
  }
}

export default StepGrid
