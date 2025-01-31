import { Sun } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Graph } from "./Graph";

function App() {
  return (
    <div className="w-full h-screen bg-blue-500 gap-2 flex flex-col items-center text-white">
      <h2 className="text-2xl font-bold mt-5">Philadelphia</h2>
      <Sun className="w-16 h-16 mt-5" />
      <h1 className="text-[130px] pl-5 -mt-10">46°</h1>
      <div className="flex items-center justify-center w-2/3 gap-4 -mt-6 mb-20">
        <p>37°</p>
        <Slider defaultValue={[66]} max={100} step={1} className="w-2/3" />
        <p>51°</p>
      </div>
      <Graph />
    </div>
  )
}

export default App
