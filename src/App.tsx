import { Grid } from "./components/grid/Grid"
import { useState } from "react"
import * as stylex from "@stylexjs/stylex"
import { colors } from "./tokens.stylex"
// import { ClearPopUpModel } from "./components/UI/ClearPopUpModel"
// import { RiArrowDownSLine } from "react-icons/ri"

function App() {
  console.log("colors;", colors.white)
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
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.white,
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
  },
  gameInfoContainer: {
    marginTop: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  gameWinLostContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  gridContainer: {
    height: "100%",
    width: "100%",
    flexGrow: "1",
  },
  gameNum: {
    fontSize: "2rem",
  },
})
