import { PlayPause } from "./PlayPause"
import { TempoBox } from "./Tempo"
import { Volume } from "./Volume"

export const Controls = () => {
  return (
    <div className="flex items-center gap-2 w-full">
      <PlayPause />
      <TempoBox />
      <Volume />
    </div>
  )
}
