import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectIsPlaying, togglePlayback } from "./sequencerSlice"
import { TempoBox } from "./Tempo"

export const Controls = () => {
  const dispatch = useAppDispatch()
  const isPlaying = useAppSelector(selectIsPlaying)

  return (
    <div className="flex justify-between items-center w-full">
      <button
        className="flex items-center cursor-pointer w-16"
        onClick={() => dispatch(togglePlayback())}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <TempoBox />
      <div className="flex items-center">
        Volume:
        <input type="range" className="mx-4 w-32" />
        <span>75%</span>
      </div>
    </div>
  )
}
