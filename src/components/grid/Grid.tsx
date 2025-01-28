import * as stylex from "@stylexjs/stylex"

import { GridItem, ItemType } from "./GridItem"
import { useCallback, useEffect, useState } from "react"
import { PopUpModal } from "../UI/PopUpModal"
import { GameOptions } from "./GameOptions"
import { colors } from "../../tokens.stylex"

export type GridArrType = Array<Array<ItemType>>

const generateArrayOfArr = (num: number) => {
  const arr = new Array<Array<ItemType>>()
  for (let i = 0; i < num; i++) {
    arr.push([])
    for (let x = 0; x < num; x++) {
      const item: ItemType = {
        x: x,
        y: i,
        mine: false,
        nearByMine: 0,
        mask: true,
        queue: false,
        flag: false,
      }
      arr[i].push(item)
    }
  }
  return arr
}

const randomlyChangeMines = (
  grid: Array<Array<ItemType>>,
  numberOfChanges: number,
  gridSize: number
) => {
  for (let changeCount = 0; changeCount < numberOfChanges; changeCount++) {
    // Randomly select a row and column
    const randomRow = Math.floor(Math.random() * gridSize)
    const randomCol = Math.floor(Math.random() * gridSize)

    // Toggle the mine value at the randomly selected position
    if (!grid[randomRow][randomCol].mine) {
      grid[randomRow][randomCol].mine = !grid[randomRow][randomCol].mine
    } else {
      //try again
      changeCount = changeCount - 1
    }
  }
}

const calcuateNearbyMines = (
  x: number,
  y: number,
  arr: Array<Array<ItemType>>,
  gridSize: number
) => {
  for (let i = 0; i < 3; i++) {
    const yVal = y + i - 1
    for (let i2 = 0; i2 < 3; i2++) {
      const xVal = x + i2 - 1
      if (xVal >= 0 && yVal >= 0 && xVal < gridSize && yVal < gridSize) {
        if (arr[xVal][yVal].mine == true) {
          arr[x][y].nearByMine = arr[x][y].nearByMine + 1
        }
      }
    }
  }
  return false
}

type GridProps = {
  win: () => void
  lost: () => void
  flagClick: boolean
}
export const Grid = ({ win, lost, flagClick }: GridProps) => {
  const [gridSize, setGridSize] = useState(5)
  const [mineSize, setMineSize] = useState(5)

  const [game, setGame] = useState("on")
  const [, setRevealNodesCount] = useState<number>(0)
  const [showMines, setShowMines] = useState(false)
  const [timerSec, setTimerSec] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [flagSize, setFlagSize] = useState(0)
  const [lastBombClick, setLastBombClick] = useState<Array<number>>([
    -999999, -999999,
  ])
  useEffect(() => {
    let timer: number

    if (isRunning) {
      timer = setInterval(() => {
        setTimerSec((prevTime) => prevTime + 1)
      }, 10) //1000
    }
    return () => clearInterval(timer) //clean up the timer interval
  }, [isRunning])

  const formatTime = (timeInCentiseconds: number) => {
    const centiseconds = timeInCentiseconds % 100
    const seconds = Math.floor((timeInCentiseconds / 100) % 60)
    const minutes = Math.floor((timeInCentiseconds / (100 * 60)) % 60)
    const hours = Math.floor(timeInCentiseconds / (100 * 60 * 60))
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds
      .toString()
      .padStart(2, "0")}`
  }

  const getNeighbourNodes = (x: number, y: number) => {
    const result = []
    //x
    if (x - 1 >= 0) {
      const tempX = x - 1
      result.push({ y, x: tempX })
    }
    if (x + 1 < gridSize) {
      const tempX = x + 1
      result.push({ y, x: tempX })
    }

    //y
    if (y - 1 >= 0) {
      const tempY = y - 1
      result.push({ y: tempY, x })
    }

    if (y + 1 < gridSize) {
      const tempY = y + 1
      result.push({ y: tempY, x })
    }

    //left Top dia
    if (x - 1 >= 0 && y - 1 >= 0) {
      const tempX = x - 1
      const tempY = y - 1
      result.push({ y: tempY, x: tempX })
    }

    //left bottom
    if (x - 1 >= 0 && y + 1 < gridSize) {
      const tempX = x - 1
      const tempY = y + 1
      result.push({ y: tempY, x: tempX })
    }

    //right Top dia
    if (x + 1 < gridSize && y - 1 >= 0) {
      const tempX = x + 1
      const tempY = y - 1
      result.push({ y: tempY, x: tempX })
    }

    //left bottom
    if (x + 1 < gridSize && y + 1 < gridSize) {
      const tempX = x + 1
      const tempY = y + 1
      result.push({ y: tempY, x: tempX })
    }

    // console.log("what is current x y : ", x, y)
    return result
  }

  const showAllBombs = (arr: Array<Array<ItemType>>) => {
    for (let i = 0; i < arr.length; i++) {
      for (let x = 0; x < arr[i].length; x++) {
        // console.log("What is this: ", arr[i][x])
        if (arr[i][x].mine) {
          arr[i][x].mask = false
        }
      }
    }
  }

  const toggleFlag = (x: number, y: number, arr: GridArrType) => {
    // increase the flag size
    setFlagSize((prevVal) => {
      const newVal = prevVal + 1
      return newVal
    })
    const tempArr = arr
    tempArr[y][x].flag = !tempArr[y][x].flag

    setGridArr([...tempArr])
  }

  const girdItemClickHandler = (
    x: number,
    y: number,
    mine: boolean,
    arr: Array<Array<ItemType>>
  ) => {
    const tempArr = arr

    if (mine) {
      showAllBombs(arr)
      setGame("over")
      setShowMines(true)
      setIsRunning(false)
      setLastBombClick([x, y])
      return
    }

    //create a queue to visit on where the click happens
    const queueToVist = []
    queueToVist.push({ y, x })
    tempArr[y][x].queue = true

    while (queueToVist.length > 0) {
      // pop the one that is clicked
      const currentNode = queueToVist.pop()

      setRevealNodesCount((prevCount) => {
        //if the first click, start the timer
        if (prevCount == 0) {
          setIsRunning(true)
        }

        const newCount = prevCount + 1

        // Action to be performed immediately after state update
        if (newCount + mineSize == gridSize * gridSize) {
          setGame("win")
          setRevealNodesCount(0)
          showAllBombs(arr)
          setIsRunning(false)
        }
        return newCount
      })

      if (currentNode) {
        tempArr[currentNode.y][currentNode.x].mask = false
        if (tempArr[currentNode.y][currentNode.x].nearByMine == 0) {
          ///get neighbournodes of current node into queue
          const curNodeNeighbourArr = getNeighbourNodes(
            currentNode.x,
            currentNode.y
          )

          for (let i = 0; i < curNodeNeighbourArr.length; i++) {
            const tempY = curNodeNeighbourArr[i].y
            const tempX = curNodeNeighbourArr[i].x
            if (
              tempArr[tempY][tempX].mine == false &&
              tempArr[tempY][tempX].mask == true &&
              tempArr[tempY][tempX].queue == false
            ) {
              //add add it to queue
              queueToVist.push({ y: tempY, x: tempX })
              //update the queue check
              tempArr[tempY][tempX].queue = true
            } else {
              continue
            }
          }
        }
      }
    }

    setGridArr([...tempArr])
  }

  const [gridArr, setGridArr] = useState<Array<Array<ItemType>>>([])

  const startNewGame = useCallback(() => {
    setShowMines(false)
    setTimerSec(0)
    setFlagSize(0)
    setLastBombClick([-999999, -999999])

    const arr = generateArrayOfArr(gridSize)
    randomlyChangeMines(arr, mineSize, gridSize)
    arr.map((xArr) => {
      xArr.map((item: ItemType) => {
        calcuateNearbyMines(item.x, item.y, arr, gridSize)
      })
    })

    setGridArr([...arr])
  }, [setGridArr, gridSize, mineSize])

  useEffect(() => {
    startNewGame()
  }, [startNewGame, gridSize, mineSize])

  useEffect(() => {
    if (game === "win") {
      win()
    }
    if (game === "over") {
      lost()
    }
  }, [game])

  return (
    <div
      {...stylex.props(styles.base)}
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      {game == "over" && (
        <PopUpModal
          text="GAME OVER"
          buttonText="Try Again"
          // gameStatus={game}
          tryAgain={() => {
            startNewGame()
            setRevealNodesCount(0)
          }}
          removePopUp={() => {
            setGame("on")
          }}
        />
      )}
      {game == "win" && (
        <PopUpModal
          text="YOU WIN"
          buttonText="One More Game"
          tryAgain={() => {
            startNewGame()
          }}
          removePopUp={() => {
            setGame("on")
          }}
        />
      )}

      <div {...stylex.props(styles.curGameInfoContainer)}>
        {/* <div>
          <div
            onClick={() => {
              setFlagClick()
              console.log("Flag click", flagClick)
            }}
          >
            Flag Click
          </div>
        </div> */}
        <div>
          <GameOptions
            setGridSize={(gridSize: number) => {
              setGridSize(gridSize)
              setIsRunning(false)
            }}
            setMineSize={(mineSize: number) => {
              setMineSize(mineSize)
              setIsRunning(false)
            }}
          />
        </div>
        <div {...stylex.props(styles.gameStatusContainer)}>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <div>MINES {mineSize}</div> <div>|</div>{" "}
            <div> FLAGS {flagSize}</div>
          </div>
          <div {...stylex.props(styles.timer)}> {formatTime(timerSec)}</div>
        </div>
      </div>

      <div {...stylex.props(styles.gridContainer)}>
        {gridArr.map((eachArr, key) => {
          return (
            <div {...stylex.props(styles.xArr)} key={key}>
              {eachArr.map((item: ItemType, key) => {
                return (
                  <GridItem
                    item={item}
                    key={key}
                    girdItemClickHandler={girdItemClickHandler}
                    arr={gridArr}
                    toggleFlag={toggleFlag}
                    game={game}
                    showMines={showMines}
                    gridSize={gridSize}
                    lastBombClick={lastBombClick}
                    flagClick={flagClick}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    width: "100%",
    height: "100%",
  },
  timer: {
    fontSize: "2rem",
  },
  curGameInfoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "2rem",
    // backgroundColor: "pink",
  },
  gameStatusContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "red",
    marginBottom: "-.5rem",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    width: "100%",
    border: `4px solid ${colors.gray4}`,
  },
  xArr: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    margin: "0",
  },
})
