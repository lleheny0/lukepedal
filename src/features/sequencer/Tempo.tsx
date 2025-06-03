import { useState, useRef, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectTempo, setTempo } from "./sequencerSlice"

export const TempoBox = () => {
  const dispatch = useAppDispatch()
  const [tempoState, setTempoState] = useState(useAppSelector(selectTempo))
  const [isLocked, setIsLocked] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    if (boxRef.current) void boxRef.current.requestPointerLock()
  }

  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(document.pointerLockElement === boxRef.current)
    }
    document.addEventListener("pointerlockchange", handleLockChange)
    return () => {
      document.removeEventListener("pointerlockchange", handleLockChange)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked) return
      const delta =
        Math.abs(e.movementY) > 5 ? (e.movementY > 0 ? 5 : -5) : e.movementY
      setTempoState(prev => Math.max(40, Math.min(prev - delta * 0.5, 300)))
    }

    const handleMouseUp = () => {
      document.exitPointerLock()
      dispatch(() => {
        setTempo(tempoState)
      })
    }

    if (isLocked) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isLocked, dispatch, tempoState])

  return (
    <div
      ref={boxRef}
      className={`
        select-none
        p-2
        w-27
        text-center
        bg-gray-700
        text-white
        rounded-lg
        hover:bg-gray-600
        active:bg-gray-500
        ${isLocked ? "cursor-none" : "cursor-ns-resize"}
      `}
      onMouseDown={handleMouseDown}
    >
      {Math.round(tempoState).toString().padStart(3, "0")} BPM
    </div>
  )
}
