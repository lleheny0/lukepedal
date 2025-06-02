import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

type NoteType = {
  isActive: boolean
}

type SequencerType = {
  grid: NoteType[][]
  tempo: number
  volume: number
  isPlaying: boolean
}

type NoteUpdateType = {
  pitch: number
  step: number
}

const initialState: SequencerType = {
  grid: Array.from({ length: 8 }, (_, pitch) =>
    Array.from({ length: 16 }, (_, step) => ({
      isActive: false,
      pitch,
      step,
    })),
  ),
  tempo: 120,
  volume: 100,
  isPlaying: false,
}

export const sequencerSlice = createAppSlice({
  name: "sequencer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    togglePlayback: create.reducer(state => {
      state.isPlaying = !state.isPlaying
    }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    toggleNote: create.reducer(
      (state, action: PayloadAction<NoteUpdateType>) => {
        console.log(action.payload)
        state.grid[action.payload.pitch][action.payload.step].isActive =
          !state.grid[action.payload.pitch][action.payload.step].isActive
      },
    ),
  }),
  selectors: {
    selectGrid: state => state.grid,
    selectIsPlaying: state => state.isPlaying,
  },
})

export const { togglePlayback, toggleNote } = sequencerSlice.actions
export const { selectGrid, selectIsPlaying } = sequencerSlice.selectors
