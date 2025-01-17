import { Grid } from "./components/grid/Grid"
import { useState } from "react"
import * as stylex from "@stylexjs/stylex"
// import { ClearPopUpModel } from "./components/UI/ClearPopUpModel"
// import { RiArrowDownSLine } from "react-icons/ri"

function App() {
  const [games, setGames] = useState({ win: 0, lost: 0 })
  // const [gameSize, setGameSize] = useState("small")
  // const [gameDifficulty, setGameDifficulty] = useState("easy")
  // const [dropDownMenuGameSize, setDropDownMenuGameSize] = useState(false)
  // const [dropDownMenuGameDifficulty, setDropDownMenuGameDifficulty] =
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

  // const calculateGridSize = () => {
  //   console.log("Cal grid size", gameSize)
  //   if (gameSize === "small") {
  //     return 9
  //   }
  //   if (gameSize === "medium") {
  //     return 16
  //   }
  //   if (gameSize === "large") {
  //     return 30
  //   }
  //   return 1
  // }

  // const calculateMineSize = () => {
  //   const gridSize = calculateGridSize()
  //   if (gameDifficulty === "easy") {
  //     return Math.round(gridSize * gridSize * 0.1)
  //   }
  //   if (gameDifficulty === "medium") {
  //     return Math.round(gridSize * gridSize * 0.15)
  //   }
  //   if (gameDifficulty === "difficult") {
  //     return Math.round(gridSize * gridSize * 0.2)
  //   }
  //   return 1
  // }

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.gameContainer)}>
        <div>
          <div {...stylex.props(styles.logo)}> Minesweeper</div>

          <div {...stylex.props(styles.gameInfoContainer)}>
            <div {...stylex.props(styles.gameWinLostContainer)}>
              <div> WIN</div>
              <div {...stylex.props(styles.gameNum)}>{games.win}</div>
              <div> LOST</div>
              <div {...stylex.props(styles.gameNum)}>{games.lost}</div>
            </div>
          </div>
        </div>
        <div {...stylex.props(styles.gridContainer)}>
          <Grid win={win} lost={lost} />
        </div>
      </div>
    </div>
  )
}

export default App

const styles = stylex.create({
  page: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",

    "@media (max-width: 576px)": {
      width: "100%",
    },

    "@media (min-width: 577px) ": {
      width: "35rem",
    },
  },
  logo: {
    width: "100%",
    fontSize: "2rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
    // "@media (min-height: 900px)": {
    //   marginTop: "2rem",
    // },
  },
  gameInfoContainer: {
    marginTop: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  gameDropDownMenuContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    alignItems: "flex-start",
    // justifyContent: "flex-end",
    // backgroundColor: "lightyellow",
  },
  dropDownMenu: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
    width: "7rem",
  },
  selection: {
    border: ".1rem solid black",
    // backgroundColor: "white",
    width: "7rem",
    padding: ".5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  gameWinLostContainer: {
    // backgroundColor: "pink",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // alignContent: "flex-end",
    // justifyContent: "flex-end",
    // justifyItems: "flex-end",
    alignItems: "flex-end",
  },

  gridContainer: {
    // backgroundColor: "white",
    height: "100%",
    width: "100%",
    flexGrow: "1",
  },
  gameNum: {
    fontSize: "2rem",
  },
})
