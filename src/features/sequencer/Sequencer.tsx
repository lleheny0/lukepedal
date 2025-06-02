import { useState } from "react"
import { Controls } from "./Controls"
import { Note } from "./Note"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectGrid, toggleNote } from "./sequencerSlice"

export const Sequencer = () => {
  const dispatch = useAppDispatch()
  const grid = useAppSelector(selectGrid)
  const pitches = grid.length
  const steps = grid[0]?.length || 0
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="flex flex-col justify-between items-center gap-4 m-16 w-256 bg-gray-800 rounded-xl shadow-[0_1rem_0_0_rgba(255,255,255,0.025)] p-4 select-none">
      <Controls />
      <div
        className="grid grid-cols-16 gap-2 w-full h-full"
        onMouseDown={() => {
          setIsDragging(true)
        }}
        onMouseUp={() => {
          setIsDragging(false)
        }}
        onMouseLeave={() => {
          setIsDragging(false)
        }}
      >
        {Array.from({ length: pitches }).map((_, pitch) =>
          Array.from({ length: steps }).map((_, step) => (
            <Note
              key={`${String(pitch)}-${String(step)}`}
              pitch={pitch}
              step={step}
              isActive={grid[pitch][step].isActive}
              handleToggle={() => dispatch(toggleNote({ pitch, step }))}
              onMouseEnter={() => {
                if (isDragging) dispatch(toggleNote({ pitch, step }))
              }}
            />
          )),
        )}
      </div>
    </div>
  )
}
