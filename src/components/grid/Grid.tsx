import * as stylex from "@stylexjs/stylex"

import { GridItem, ItemType } from "./GridItem"
import { useState } from "react"

export const Grid = () => {
  const [game, setGame] = useState(true)

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
    // for (let i = 0; i < 3; i++) {
    //   const xVal = x + i - 1
    //   console.log("Current X Val: ", xVal)
    //   for (let i2 = 0; i2 < 3; i2++) {
    //     const yVal = y + i2 - 1
    //     console.log("Current Y Val: ", yVal)
    //     // console.log(x, y, xVal, yVal, checkIfItemValid(xVal, yVal))
    //     if (xVal >= 0 && yVal >= 0 && xVal < gridSize && yVal < gridSize) {
    //       if (arr[yVal][xVal].mine == true) {
    //         arr[y][x].nearByMine = arr[y][x].nearByMine + 1
    //       }
    //     }
    //   }
    // }

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

  // Allow the player to reveal tiles and mark potential mines.
  const girdItemClickHandler = (x, y, mine, arr: Array<Array<ItemType>>) => {
    //if click on mine, then game over
    if (mine) {
      setGame(false)
    }

    // unmask the ones with near by mines
    console.log("Clicked on : ", x, y)

    //make a copy of current grid arr
    const tempArr = gridArr

    for (let left = x; left >= 0; left--) {
      // if (tempArr[y][left].nearByMine > 0) {
      //   console.log("Found near by mine left check", left, y)
      //   tempArr[y][left].mask = false
      //   break
      // } else {
      //   tempArr[y][left].mask = false
      // }

      for (let up = y; up >= 0; up--) {
        if (tempArr[up][left].nearByMine > 0) {
          console.log("Found near by mine Up check", x, up)
          tempArr[up][left].mask = false
          break
        } else {
          tempArr[up][left].mask = false
        }
      }
      for (let down = y + 1; down < gridSize; down++) {
        if (tempArr[down][left].nearByMine > 0) {
          tempArr[down][left].mask = false
          break
        } else {
          tempArr[down][left].mask = false
        }
      }
    }

    for (let right = x + 1; right < gridSize; right++) {
      // if (tempArr[y][right].nearByMine > 0) {
      //   tempArr[y][right].mask = false
      //   break
      // } else {
      //   tempArr[y][right].mask = false
      // }

      for (let up = y; up >= 0; up--) {
        if (tempArr[up][right].nearByMine > 0) {
          console.log("Found near by mine Up check", x, up)
          tempArr[up][right].mask = false
          break
        } else {
          tempArr[up][right].mask = false
        }
      }
      for (let down = y + 1; down < gridSize; down++) {
        if (tempArr[down][right].nearByMine > 0) {
          tempArr[down][right].mask = false
          break
        } else {
          tempArr[down][right].mask = false
        }
      }
    }

    // for (let up = y - 1; up >= 0; up--) {
    //   if (tempArr[up][x].nearByMine > 0) {
    //     console.log("Found near by mine Up check", x, up)
    //     tempArr[up][x].mask = false
    //     break
    //   } else {
    //     tempArr[up][x].mask = false
    //   }
    // }

    // for (let down = y + 1; down < gridSize; down++) {
    //   if (tempArr[down][x].nearByMine > 0) {
    //     tempArr[down][x].mask = false
    //     break
    //   } else {
    //     tempArr[down][x].mask = false
    //   }
    // }

    // const newArr = gridArr
    // console.log("New Arr: ", newArr)
    // newArr[y][left].mask = false
    // console.log("New Arr with mark update: ", newArr)

    setGridArr([...tempArr])
  }

  const gridSize = 10
  const arr = generateArrayOfArr(gridSize)
  // console.log("What is arr: ", arr)
  randomlyChangeMines(arr, 5)
  arr.map((xArr) => {
    xArr.map((item: ItemType) => {
      calcuateNearbyMines(item.x, item.y, arr)
    })
  })

  const [gridArr, setGridArr] = useState(arr)
  console.log("What is grid Arr  , ", gridArr)

  return (
    <div {...stylex.props(gridStyles.base)}>
      {!game && <div>Game Over</div>}
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
