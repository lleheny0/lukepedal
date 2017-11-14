import {
  TOGGLE_NOTE
} from '../actions/actions'

const initialGrid = []

for (let i = 0; i < 8; i++) {
  initialGrid[i] = []
  for (let j = 0; j < 5; j++) {
    initialGrid[i][j] = false;
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
