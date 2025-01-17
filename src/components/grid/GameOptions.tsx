import { useState } from "react"

import * as stylex from "@stylexjs/stylex"
// import { ClearPopUpModel } from "./components/UI/ClearPopUpModel"
import { RiArrowDownSLine } from "react-icons/ri"
import { ClearPopUpModel } from "../UI/ClearPopUpModel"

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

  const calculateGridSize = () => {
    console.log("Cal grid size", gameSize)
    if (gameSize === "small") {
      return 3
    }
    if (gameSize === "medium") {
      return 5
    }
    if (gameSize === "large") {
      return 9
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
                  onClick={() => {
                    setGameSize("small")
                    setGridSize(3)
                    setDropDownMenuGameSize(false)
                  }}
                >
                  small
                </div>
                <div
                  onClick={() => {
                    setGameSize("medium")
                    setGridSize(5)
                    setDropDownMenuGameSize(false)
                  }}
                >
                  med
                </div>
                <div
                  onClick={() => {
                    setGameSize("large")
                    setGridSize(9)
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
                  onClick={() => {
                    setGameDifficulty("easy")
                    setMineSize(calculateMineSize())
                    setDropDownMenuGameDifficulty(false)
                  }}
                >
                  easy
                </div>
                <div
                  onClick={() => {
                    setGameDifficulty("medium")
                    setMineSize(calculateMineSize())

                    setDropDownMenuGameDifficulty(false)
                  }}
                >
                  med
                </div>
                <div
                  onClick={() => {
                    setGameDifficulty("difficult")
                    setMineSize(calculateMineSize())

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
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "column",
    width: "7rem",
  },
  selection: {
    border: ".1rem solid black",
    // backgroundColor: "white",
    width: "7.5rem",
    padding: ".5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
