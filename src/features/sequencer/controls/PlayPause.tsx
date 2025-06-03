import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { selectPlayback, togglePlayback } from "../sequencerSlice"

export const PlayPause = () => {
  const dispatch = useAppDispatch()
  const isPlaying = useAppSelector(selectPlayback)

  return (
    <div
      className={`
        select-none
        p-2
        w-20
        text-center
        bg-gray-700
        text-white
        rounded-lg
        hover:bg-gray-600
        active:bg-gray-500
        cursor-pointer
      `}
      onClick={() => {
        dispatch(togglePlayback())
      }}
    >
      {isPlaying ? "Pause" : "Play"}
    </div>
  )
}
