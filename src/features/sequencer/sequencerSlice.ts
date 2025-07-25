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
  grid: Array.from({ length: 6 }, (_, pitch) =>
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
        state.grid[action.payload.pitch][action.payload.step].isActive =
          !state.grid[action.payload.pitch][action.payload.step].isActive
      },
    ),
    setTempo: create.reducer((state, action: PayloadAction<number>) => {
      state.tempo = action.payload
    }),
    setVolume: create.reducer(state => {
      state.volume = (state.volume + 25) % 125
    }),
  }),
  selectors: {
    selectGrid: state => state.grid,
    selectPlayback: state => state.isPlaying,
    selectTempo: state => state.tempo,
    selectVolume: state => state.volume,
  },
})

export const { togglePlayback, toggleNote, setTempo, setVolume } =
  sequencerSlice.actions
export const { selectGrid, selectPlayback, selectTempo, selectVolume } =
  sequencerSlice.selectors
