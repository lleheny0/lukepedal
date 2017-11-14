import {
  TOGGLE_NOTE
} from '../actions/actions'

const initialGrid = []

for (let i = 0; i < 5; i++) {
  initialGrid[i] = []
  for (let j = 0; j < 8; j++) {
    let rand = Math.random() * 2
    if (rand < 1)
      initialGrid[i][j] = false
    else
      initialGrid[i][j] = true
  }
}

export const gridReducer = (state = initialGrid, action) => {
  if (action.type === TOGGLE_NOTE) {

    return {
      ...state,
      [action.location]: !state[action.location]
    }
  } else {
    return state
  }
}
