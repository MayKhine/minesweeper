import { Grid } from "./components/grid/Grid"
import { useState } from "react"
function App() {
  const [games, setGames] = useState({ win: 0, lost: 0 })
  const win = () => {
    setGames((prevGames) => ({
      ...prevGames,
      win: prevGames.win + 1,
    }))
  }
  const lost = () => {
    setGames((prevGames) => ({
      ...prevGames,
      lost: prevGames.lost + 1,
    }))
  }
  return (
    <div>
      Minesweeper
      <div>
        Game Win: {games.win} , Game Lost: {games.lost}
      </div>
      <Grid win={win} lost={lost} />
    </div>
  )
}

export default App
