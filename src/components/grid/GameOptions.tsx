import { useState } from "react"

import * as stylex from "@stylexjs/stylex"
// import { ClearPopUpModel } from "./components/UI/ClearPopUpModel"
import { RiArrowDownSLine } from "react-icons/ri"
import { ClearPopUpModel } from "../UI/ClearPopUpModel"
import { colors } from "../../tokens.stylex"

type GameOptionsProps = {
  setGridSize: (gridSize: number) => void
  setMineSize: (mineSize: number) => void
}
export const GameOptions = ({ setGridSize, setMineSize }: GameOptionsProps) => {
  const [gameSize, setGameSize] = useState("small")
  const [gameDifficulty, setGameDifficulty] = useState("easy")
  const [dropDownMenuGameSize, setDropDownMenuGameSize] = useState(false)
  const [dropDownMenuGameDifficulty, setDropDownMenuGameDifficulty] =
    useState(false)

  const gameSizeHandler = (val: string) => {
    setGameSize(val)
    if (val === "small") {
      setGridSize(5)
      const mineSize = calculateMineSize(gameDifficulty, 5)
      console.log("MINE SIZE: ", mineSize)
      setMineSize(mineSize)
    }
    if (val === "medium") {
      setGridSize(9)
      const mineSize = calculateMineSize(gameDifficulty, 9)
      console.log("MINE SIZE: ", mineSize)
      setMineSize(mineSize)
    }
    if (val === "large") {
      setGridSize(16)
      const mineSize = calculateMineSize(gameDifficulty, 16)
      console.log("MINE SIZE: ", mineSize)
      setMineSize(mineSize)
    }
    //when grid szie chagnes, mine should change too
    // gameDifficultyHandler(gameDifficulty)
    setDropDownMenuGameSize(false)
  }

  const gameDifficultyHandler = (val: string) => {
    console.log("Grid Size: ", gameSize, "Game : ", val)
    setDropDownMenuGameDifficulty(false)
    setGameDifficulty(val)
    const mineSize = calculateMineSize(val)
    console.log("MINE SIZE: ", mineSize)
    setMineSize(mineSize)
  }

  const calculateGridSize = () => {
    if (gameSize === "small") {
      return 5
    }
    if (gameSize === "medium") {
      return 9
    }
    if (gameSize === "large") {
      return 16
    }
    return 1
  }

  const calculateMineSize = (
    gameDifficultyValue: string,
    gridSizeVal?: number
  ) => {
    const gridSize = gridSizeVal ? gridSizeVal : calculateGridSize()

    if (gameDifficultyValue === "easy") {
      const mine = Math.round(gridSize * gridSize * 0.1)
      console.log("Calc mine: ", gameDifficulty, "Mine: ", mine)
      return mine
    }
    if (gameDifficultyValue === "medium") {
      const mine = Math.round(gridSize * gridSize * 0.15)
      console.log("Calc mine: ", gameDifficulty, "Mine: ", mine)
      return mine
    }
    if (gameDifficultyValue === "difficult") {
      const mine = Math.round(gridSize * gridSize * 0.2)
      console.log("Calc mine: ", gameDifficulty, "Mine: ", mine)
      return mine
    }
    return 1
  }
  return (
    <div>
      <div {...stylex.props(styles.gameDropDownMenuContainer)}>
        <div>
          <div
            {...stylex.props(styles.selection)}
            onClick={() => {
              setDropDownMenuGameSize(true)
            }}
          >
            <div>{gameSize}</div>
            <RiArrowDownSLine style={{ alignSelf: "center" }} />
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
                  {...stylex.props(styles.dropDownButton)}
                  onClickCapture={() => {
                    gameSizeHandler("small")
                  }}
                >
                  small
                </div>
                <div
                  {...stylex.props(styles.dropDownButton)}
                  onClickCapture={() => {
                    gameSizeHandler("medium")
                  }}
                >
                  medium
                </div>
                <div
                  {...stylex.props(styles.dropDownButton)}
                  onClickCapture={() => {
                    gameSizeHandler("large")
                  }}
                >
                  large
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            {...stylex.props(styles.selection)}
            onClick={() => {
              setDropDownMenuGameDifficulty(true)
            }}
          >
            <div> {gameDifficulty}</div>
            <RiArrowDownSLine style={{ alignSelf: "center" }} />
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
                  {...stylex.props(styles.dropDownButton)}
                  onClick={() => {
                    gameDifficultyHandler("easy")
                  }}
                >
                  easy
                </div>
                <div
                  {...stylex.props(styles.dropDownButton)}
                  onClick={() => {
                    gameDifficultyHandler("medium")
                  }}
                >
                  medium
                </div>
                <div
                  {...stylex.props(styles.dropDownButton)}
                  onClick={() => {
                    gameDifficultyHandler("difficult")
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
  )
}

const styles = stylex.create({
  gameDropDownMenuContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    alignItems: "flex-start",
  },
  dropDownMenu: {
    position: "absolute",
    zIndex: 2,
    marginTop: ".2rem",
    border: ".1rem solid black",
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    width: "8rem",
  },
  dropDownButton: {
    padding: ".5rem",
    backgroundColor: {
      default: `${colors.gray2}`,
      ":hover": `${colors.gray1}`,
    },
    cursor: "pointer",
  },
  selection: {
    border: `4px solid ${colors.gray4}`,
    width: "8rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: ".5rem",
  },
})
