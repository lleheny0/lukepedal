import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { selectVolume, setVolume } from "../sequencerSlice"

export const Volume = () => {
  const dispatch = useAppDispatch()
  const volume = useAppSelector(selectVolume)

  return (
    <div
      className={`
        select-none
        p-2
        w-18
        text-center
        bg-gray-700
        text-white
        rounded-lg
        hover:bg-gray-600
        active:bg-gray-500
        cursor-pointer
      `}
      onClick={() => {
        dispatch(setVolume())
      }}
    >
      {volume}%
    </div>
  )
}
