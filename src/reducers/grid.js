import {
  TOGGLE_NOTE
} from '../actions/actions'

const initialGrid = []

for (let i = 0; i < 6; i++) {
  initialGrid[i] = []
  for (let j = 0; j < 16; j++) {
    initialGrid[i][j] = false
  }
}

export const gridReducer = (state = initialGrid, action) => {
  if (action.type === TOGGLE_NOTE) {
    return state.map((row, rowIndex) => {
      if (rowIndex === action.row) {
        return row.map((column, columnIndex) => {
          if (columnIndex === action.column) {
            return !column
          } else {
            return column
          }
        })
      } else {
        return row
      }
    })
  } else {
    return state
  }
}
