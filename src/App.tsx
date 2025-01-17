import { Grid } from "./components/grid/Grid"
import { useState } from "react"
import * as stylex from "@stylexjs/stylex"
import { ClearPopUpModel } from "./components/UI/ClearPopUpModel"
function App() {
  const [games, setGames] = useState({ win: 0, lost: 0 })
  const [gameSize, setGameSize] = useState("small")
  const [gameDifficulty, setGameDifficulty] = useState("easy")
  const [dropDownMenuGameSize, setDropDownMenuGameSize] = useState(false)
  const [dropDownMenuGameDifficulty, setDropDownMenuGameDifficulty] =
    useState(false)

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

          <div {...stylex.props(styles.gameDropDownMenuContainer)}>
            <div>
              <div>Game Size</div>
              <div
                {...stylex.props(styles.selection)}
                onClick={() => {
                  setDropDownMenuGameSize(true)
                }}
              >
                {gameSize}
              </div>
              {dropDownMenuGameSize && (
                <div>
                  <ClearPopUpModel
                    closePopUp={() => {
                      setDropDownMenuGameSize(false)
                    }}
                  />
                  <div {...stylex.props(styles.dropDownMenu)}>
                    <div
                      onClick={() => {
                        setGameSize("small")
                        setDropDownMenuGameSize(false)
                      }}
                    >
                      small
                    </div>
                    <div
                      onClick={() => {
                        setGameSize("medium")
                        setDropDownMenuGameSize(false)
                      }}
                    >
                      med
                    </div>
                    <div
                      onClick={() => {
                        setGameSize("large")
                        setDropDownMenuGameSize(false)
                      }}
                    >
                      large
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div>Game Difficulty</div>
              <div
                {...stylex.props(styles.selection)}
                onClick={() => {
                  setDropDownMenuGameDifficulty(true)
                }}
              >
                {gameDifficulty}
              </div>
              {dropDownMenuGameDifficulty && (
                <div>
                  <ClearPopUpModel
                    closePopUp={() => {
                      setDropDownMenuGameDifficulty(false)
                    }}
                  />
                  <div {...stylex.props(styles.dropDownMenu)}>
                    <div
                      onClick={() => {
                        setGameDifficulty("easy")
                        setDropDownMenuGameDifficulty(false)
                      }}
                    >
                      easy
                    </div>
                    <div
                      onClick={() => {
                        setGameDifficulty("medium")
                        setDropDownMenuGameDifficulty(false)
                      }}
                    >
                      med
                    </div>
                    <div
                      onClick={() => {
                        setGameDifficulty("difficult")
                        setDropDownMenuGameDifficulty(false)
                      }}
                    >
                      difficult
                    </div>
                  </div>
                </div>
              )}
            </div>
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
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
  },
  gridContainer: {
    backgroundColor: "pink",
    height: "100%",
    width: "100%",
    flexGrow: "1",
  },
  dropDownMenu: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
    width: "10rem",
  },
  gameDropDownMenuContainer: {
    display: "flex",
    backgroundColor: "gray",
    gap: "2rem",
  },
  selection: {
    border: "1px solid white",
    backgroundColor: "lightgray",
    width: "9rem",
    padding: ".5rem",
  },
})
