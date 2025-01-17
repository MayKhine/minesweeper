import { Grid } from "./components/grid/Grid"
import { useState } from "react"
import * as stylex from "@stylexjs/stylex"
function App() {
  const [games, setGames] = useState({ win: 0, lost: 0 })
  const [gameSize, setGameSize] = useState("small")
  const [gameDifficulty, setGameDifficulty] = useState("easy")
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
  const handleGameSizeSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameSize(e.target.value)
  }

  const handleGameDifficultySelection = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGameDifficulty(e.target.value)
  }

  const calculateGridSize = () => {
    console.log("Cal grid size", gameSize)
    if (gameSize === "small") {
      return 9
    }
    if (gameSize === "medium") {
      return 16
    }
    if (gameSize === "large") {
      return 30
    }
    return 1
  }

  const calculateMineSize = () => {
    const gridSize = calculateGridSize()
    if (gameDifficulty === "easy") {
      return Math.round(gridSize * gridSize * 0.1)
    }
    if (gameDifficulty === "medium") {
      return Math.round(gridSize * gridSize * 0.15)
    }
    if (gameDifficulty === "difficult") {
      return Math.round(gridSize * gridSize * 0.2)
    }
    return 1
  }

  return (
    <div {...stylex.props(styles.base)}>
      <div>
        <div {...stylex.props(styles.logo)}> Minesweeper</div>

        <div {...stylex.props(styles.gameInfoContainer)}>
          <div>
            Game Win: {games.win} , Game Lost: {games.lost}
          </div>
          <div>
            <form>
              <label>
                <input
                  type="radio"
                  name="gameSize"
                  value="small"
                  checked={gameSize === "small"}
                  onChange={handleGameSizeSelection}
                />
                Small
              </label>
              <label>
                <input
                  type="radio"
                  name="gameSize"
                  value="medium"
                  checked={gameSize === "medium"}
                  onChange={handleGameSizeSelection}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="gameSize"
                  value="large"
                  checked={gameSize === "large"}
                  onChange={handleGameSizeSelection}
                />
                Large
              </label>
            </form>
          </div>
          <div>
            <form>
              <label>
                <input
                  type="radio"
                  name="gameDifficulty"
                  value="easy"
                  checked={gameDifficulty === "easy"}
                  onChange={handleGameDifficultySelection}
                />
                Easy
              </label>
              <label>
                <input
                  type="radio"
                  name="gameDifficulty"
                  value="medium"
                  checked={gameDifficulty === "medium"}
                  onChange={handleGameDifficultySelection}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="gameDifficulty"
                  value="difficult"
                  checked={gameDifficulty === "difficult"}
                  onChange={handleGameDifficultySelection}
                />
                Difficulty
              </label>
            </form>
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.gridContainer)}>
        <Grid
          win={win}
          lost={lost}
          gridSize={calculateGridSize()}
          mineSize={calculateMineSize()}
        />
      </div>
    </div>
  )
}

export default App

const styles = stylex.create({
  base: {
    minHeight: "100vh",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "green",
  },
  logo: {
    // backgroundColor: "pink",
    width: "100%",
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
  },
  gameInfoContainer: {
    width: "100%",
    display: "flex",
    // height: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "10rem",
    // backgroundColor: "pink",
  },
  gridContainer: {
    backgroundColor: "pink",
    height: "100%",
    width: "100%",
    flexGrow: "1",
    // justifyItems: "center",
    // alignContent: "center",
  },
})
