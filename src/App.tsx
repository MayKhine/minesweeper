import { Grid } from "./components/grid/Grid"
import { Game } from "./components/Game"
import { useState } from "react"
function App() {
  const [games, setGames] = useState([])
  return (
    <div>
      Minesweeper
      <Game games={games} setGames={setGames} />
      <Grid />
    </div>
  )
}

export default App
