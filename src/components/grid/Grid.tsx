import * as stylex from "@stylexjs/stylex"

import { GridItem, ItemType } from "./GridItem"
import { useState } from "react"

export const Grid = () => {
  const gridSize = 10
  const [game, setGame] = useState(true)

  const generateArrayOfArr = (num: number) => {
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push([])
      for (let x = 0; x < num; x++) {
        const item: ItemType = {
          y: i,
          x: x,
          mine: false,
          nearByMine: 0,
          mask: true,
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

  // calculate {x, y}
  // x-1,y-1
  // x-1,y
  // x-1,y+1

  // x,y-1
  // x,y
  // x,y+1

  // x+1, y-1
  // x+1,y
  // x+1,y+1

  const calcuateNearbyMines = (
    x: number,
    y: number,
    arr: Array<Array<ItemType>>
  ) => {
    for (let i = 0; i < 3; i++) {
      const xVal = x + i - 1
      console.log("Current X Val: ", xVal)
      for (let i2 = 0; i2 < 3; i2++) {
        const yVal = y + i2 - 1
        console.log("Current Y Val: ", yVal)
        // console.log(x, y, xVal, yVal, checkIfItemValid(xVal, yVal))

        if (xVal >= 0 && yVal >= 0 && xVal < gridSize && yVal < gridSize) {
          if (arr[yVal][xVal].mine == true) {
            arr[y][x].nearByMine = arr[y][x].nearByMine + 1
          }
        }
      }
    }
    return false
  }

  // Allow the player to reveal tiles and mark potential mines.
  const girdItemClickHandler = (x, y, mine) => {
    //if click on mine, then game over
    if (mine) {
      setGame(false)
    }

    // unmask the ones with near by mines
  }

  const arr = generateArrayOfArr(gridSize)

  // console.log("What is arr: ", arr)
  randomlyChangeMines(arr, 10)

  // y: i,
  // x: x,
  // mine: false,
  // nearByMine: 0,
  // mask: true,

  // console.log("what is after rnadom changes: ", arr)

  return (
    <div {...stylex.props(gridStyles.base)}>
      {!game && <div>Game Over</div>}
      {arr.map((eachArr, key) => {
        return (
          <div {...stylex.props(gridStyles.xArr)} key={key}>
            {eachArr.map((item: ItemType, key) => {
              // const nearByMineResult = calcuateNearbyMines(item.x, item.y, arr)
              calcuateNearbyMines(item.x, item.y, arr)
              // console.log(
              //   "Near By Mine Result x y ",
              //   item.x,
              //   item.y,
              //   nearByMineResult
              // )
              return (
                <GridItem
                  item={item}
                  key={key}
                  // gameOverHandler={gameOverHandler}
                  girdItemClickHandler={girdItemClickHandler}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const gridStyles = stylex.create({
  base: { backgroundColor: "lightgray" },
  xArr: { display: "flex", flexDirection: "row" },
})
