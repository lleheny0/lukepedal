import "./App.css"
import { Footer } from "./features/footer/Footer"
import { Header } from "./features/header/Header"
import { Sequencer } from "./features/sequencer/Sequencer"

export const App = () => (
  <div className="w-full h-screen bg-gray-900 text-white flex flex-col items-center">
    <Header />
    <Sequencer />
    <Footer />
  </div>
)
