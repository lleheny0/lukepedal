type NoteProps = {
  pitch: number
  step: number
  isActive: boolean
  handleToggle: () => void
  onMouseEnter: () => void
}

export const Note = ({
  pitch,
  step,
  isActive,
  handleToggle,
  onMouseEnter,
}: NoteProps) => {
  const conditionalStyles = isActive
    ? "bg-blue-500 hover:bg-blue-400 shadow-[0px_0px_0.5rem_rgba(0,128,255,1)]"
    : "bg-gray-700 hover:bg-gray-600 "

  return (
    <div
      key={`${String(pitch)}-${String(step)}`}
      className={`
        rounded-lg
        h-16
        flex
        items-center
        justify-center
        cursor-pointer
        transition-colors
        ${conditionalStyles}
      `}
      onMouseDown={handleToggle}
      onMouseEnter={onMouseEnter}
    />
  )
}
