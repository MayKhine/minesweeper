import { Grid } from "./components/grid/Grid"
import { Game } from "./components/Game"
import { useState } from "react"
function App() {
  const [games, setGames] = useState({ win: 0, lost: 0 })
  return (
    <div>
      Minesweeper
      <Game games={games} setGames={setGames} />
      <Grid />
    </div>
  )
}

export default App
