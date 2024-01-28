import * as stylex from "@stylexjs/stylex"

import { GridItem, ItemType } from "./GridItem"
import { useState } from "react"

export type GridArrType = Array<Array<ItemType>>
export const Grid = () => {
  const [game, setGame] = useState("on")
  const [revealNodesCount, setRevealNodesCount] = useState(0)
  // const [revealNum, setRevealNum] = useState(0)
  const generateArrayOfArr = (num: number) => {
    const arr = []
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
        }
        arr[i].push(item)
      }
    }
    return arr
  }

  const randomlyChangeMines = (
    grid: Array<Array<ItemType>>,
    numberOfChanges: number
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
    arr: Array<Array<ItemType>>
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

  const checkWinState = () => {
    // if (revealNum + mineSize == gridSize) {
    //   setGame("win")
    // }
  }

  const girdItemClickHandler = (
    x: number,
    y: number,
    mine: boolean,
    arr: Array<Array<ItemType>>
  ) => {
    if (mine) {
      setGame("over")
    }

    const tempArr = arr
    //create a queue to visit
    const queueToVist = []
    queueToVist.push({ y, x })
    tempArr[y][x].queue = true

    while (queueToVist.length > 0) {
      const currentNode = queueToVist.pop()
      // setRevealNum(revealNum + 1)
      // const tempRevealNodesCount = revealNodesCount + 1
      // setRevealNodesCount((revealNodesCount) => revealNodesCount + 1)
      setRevealNodesCount((prevCount) => {
        const newCount = prevCount + 1
        // Action to be performed immediately after state update
        console.log("State updated. New count:", newCount)
        if (newCount + mineSize == gridSize * gridSize) {
          console.log("new count: ", newCount, mineSize, gridSize)
          setGame("win")
          setRevealNodesCount(0)
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
            // console.log("CURRENT NODE: ", currentNode)
            // console.log("NEIGHT BOUR CEHCK : ", tempArr[tempY][tempX])
            if (
              tempArr[tempY][tempX].mine == false &&
              tempArr[tempY][tempX].mask == true &&
              tempArr[tempY][tempX].queue == false
            ) {
              // console.log("ADDED This nighbour to Queue ")
              //add add it to queue
              queueToVist.push({ y: tempY, x: tempX })
              //update the queue check
              tempArr[tempY][tempX].queue = true
            } else {
              // console.log("NOT ADDED")
              continue
            }
          }
        }
        // console.log("what is the current neightbours", queueToVist)
      }
    }

    setGridArr([...tempArr])
    // checkWinState()
    // checkWinState()
  }

  const toggleFlag = (x: number, y: number, arr: GridArrType) => {
    const tempArr = arr
    tempArr[y][x].flag = !tempArr[y][x].flag

    setGridArr([...tempArr])
  }

  const gridSize = 5
  const mineSize = 1
  const arr = generateArrayOfArr(gridSize)

  // const arr = [
  //   [
  //     { x: 0, y: 0, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 1, y: 0, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 2, y: 0, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 3, y: 0, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 4, y: 0, mine: false, nearByMine: 0, mask: true, queue: false },
  //   ],
  //   [
  //     { x: 0, y: 1, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 1, y: 1, mine: true, nearByMine: 0, mask: true, queue: false },
  //     { x: 2, y: 1, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 3, y: 1, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 4, y: 1, mine: false, nearByMine: 0, mask: true, queue: false },
  //   ],
  //   [
  //     { x: 0, y: 2, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 1, y: 2, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 2, y: 2, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 3, y: 2, mine: true, nearByMine: 0, mask: true, queue: false },
  //     { x: 4, y: 2, mine: false, nearByMine: 0, mask: true, queue: false },
  //   ],
  //   [
  //     { x: 0, y: 3, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 1, y: 3, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 2, y: 3, mine: false, nearByMine: 0, mask: true, queue: false }, //
  //     { x: 3, y: 3, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 4, y: 3, mine: false, nearByMine: 0, mask: true, queue: false },
  //   ],
  //   [
  //     { x: 0, y: 4, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 1, y: 4, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 2, y: 4, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 3, y: 4, mine: false, nearByMine: 0, mask: true, queue: false },
  //     { x: 4, y: 4, mine: false, nearByMine: 0, mask: true, queue: false },
  //   ],
  // ]

  randomlyChangeMines(arr, mineSize)
  arr.map((xArr) => {
    xArr.map((item: ItemType) => {
      calcuateNearbyMines(item.x, item.y, arr)
    })
  })

  const [gridArr, setGridArr] = useState(arr)
  // checkWinState()
  // console.log("Game state: ", game)
  return (
    <div
      {...stylex.props(gridStyles.base)}
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      {game == "over" && <div>Game Over</div>}
      {game == "win" && <div>WINNNN</div>}

      {/* {arr.map((eachArr, key) => { */}
      {gridArr.map((eachArr, key) => {
        return (
          <div {...stylex.props(gridStyles.xArr)} key={key}>
            {eachArr.map((item: ItemType, key) => {
              // calcuateNearbyMines(item.x, item.y, arr)
              return (
                <GridItem
                  item={item}
                  key={key}
                  girdItemClickHandler={girdItemClickHandler}
                  arr={gridArr}
                  toggleFlag={toggleFlag}
                />
              )
            })}
          </div>
        )
      })}
    </div>
    // <div> TEST</div>
  )
}

const gridStyles = stylex.create({
  base: { backgroundColor: "lightgray" },
  xArr: { display: "flex", flexDirection: "row" },
})
