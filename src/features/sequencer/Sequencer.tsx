import { Controls } from "./controls/Controls"
import { Grid } from "./grid/Grid"

export const Sequencer = () => {
  return (
    <div
      className="
        flex
        flex-col
        justify-between
        items-center
        gap-4
        m-16
        w-256
        bg-gray-800
        rounded-xl
        shadow-[0_1.5rem_0_0_rgba(255,255,255,0.025)]
        p-4
        select-none"
    >
      <Controls />
      <Grid />
    </div>
  )
}
