import * as stylex from "@stylexjs/stylex"

import { GridItem, ItemType } from "./GridItem"
import { useState } from "react"

export type GridArrType = Array<Array<ItemType>>
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

  // Allow the player to reveal tiles and mark potential mines.
  // const girdItemClickHandler = (
  //   x: number,
  //   y: number,
  //   mine: boolean,
  //   arr: Array<Array<ItemType>>
  // ) => {
  //   //if click on mine, then game over
  //   if (mine) {
  //     setGame(false)
  //   }

  //   // unmask the ones with near by mines
  //   console.log("Clicked on : ", x, y)

  //   //make a copy of current grid arr
  //   const tempArr = arr

  //   for (let left = x; left >= 0; left--) {
  //     for (let up = y; up >= 0; up--) {
  //       // if (tempArr[up][left].nearByMine > 0) {
  //       //   console.log("Found near by mine Up check", x, up)
  //       //   tempArr[up][left].mask = false
  //       //   break
  //       // } else {
  //       //   tempArr[up][left].mask = false
  //       // }
  //       if (tempArr[up][left].mine != true) {
  //         tempArr[up][left].mask = false
  //       }
  //     }
  //     for (let down = y + 1; down < gridSize; down++) {
  //       // if (tempArr[down][left].nearByMine > 0) {
  //       //   tempArr[down][left].mask = false
  //       //   break
  //       // } else {
  //       //   tempArr[down][left].mask = false
  //       // }
  //       if (tempArr[down][left].mine != true) {
  //         tempArr[down][left].mask = false
  //       }
  //     }
  //   }

  //   for (let right = x + 1; right < gridSize; right++) {
  //     for (let up = y; up >= 0; up--) {
  //       // if (tempArr[up][right].nearByMine > 0) {
  //       //   console.log("Found near by mine Up check", x, up)
  //       //   tempArr[up][right].mask = false
  //       //   break
  //       // } else {
  //       //   tempArr[up][right].mask = false
  //       // }
  //       if (tempArr[up][right].mine != true) {
  //         tempArr[up][right].mask = false
  //       }
  //     }
  //     for (let down = y + 1; down < gridSize; down++) {
  //       // if (tempArr[down][right].nearByMine > 0) {
  //       //   tempArr[down][right].mask = false
  //       //   break
  //       // } else {
  //       //   tempArr[down][right].mask = false
  //       // }
  //       if (tempArr[down][right].mine != true) {
  //         tempArr[down][right].mask = false
  //       }
  //     }
  //   }

  //   setGridArr([...tempArr])
  // }

  const getNearByNodes = (x: number, y: number, arr: GridArrType) => {
    // console.log("X , Y : ", x, y)
    if (x < 0 || y < 0) {
      return
    }
    // console.log("Mask check : ", arr[y][x])
    // if (arr[y][x].mine == true) {
    //   return
    // }

    // //if this one is already unmask and the one before is also already unmask then do nothing
    // if (arr[y][x].mask == false) {
    //   return
    // }

    for (let xIndex = 0; xIndex < 3; xIndex++) {
      const xValue: number = x + xIndex - 1 //check left
      for (let yIndex = 0; yIndex < 3; yIndex++) {
        const yValue: number = y + yIndex - 1 // check down

        if (
          xValue >= 0 &&
          xValue < gridSize &&
          yValue >= 0 &&
          yValue < gridSize &&
          xValue - 1 >= 0 &&
          yValue - 1 >= 0
        ) {
          if (
            arr[yValue][xValue].mine != true &&
            arr[yValue - 1][xValue - 1].nearByMine == 0
          ) {
            arr[yValue][xValue].mask = false
          }
        }

        if (
          xValue >= 0 &&
          xValue < gridSize &&
          yValue >= 0 &&
          yValue < gridSize
          // &&
          // xValue - 1 >= 0 &&
          // yValue - 1 >= 0
        ) {
          if (
            arr[yValue][xValue].mine != true
            // &&
            // arr[yValue - 1][xValue - 1].nearByMine == 0
          ) {
            arr[yValue][xValue].mask = false
          }
        }
      }
    }
  }

  // Allow the player to reveal tiles and mark potential mines.
  const girdItemClickHandler = (
    x: number,
    y: number,
    mine: boolean,
    arr: Array<Array<ItemType>>
  ) => {
    //if click on mine, then game over
    if (mine) {
      setGame(false)
    }

    // unmask the ones with near by mines

    //make a copy of current grid arr
    const tempArr = arr

    // for (let left = x; left >= 0; left--) {
    for (let up = y; up >= 0; up--) {
      //the current node doens't have mine
      //the one before current node is unmasked and it has no near by mies
      if (tempArr[up][x].nearByMine == 0) {
        console.log("CHECKING NO near by mine", arr[up][x])
        getNearByNodes(x, up, tempArr)
      } else if (tempArr[up][x].mask == true && tempArr[up][x].mine == false) {
        console.log("CHECKING ", arr[up][x])
        getNearByNodes(x, up, tempArr)
      } else {
        break
      }
    }
    // }

    //
    // getNearByNodes(x, y, tempArr)
    // setGridArr([...tempArr])

    // getNearByNodes(x, y - 1, tempArr)
    // setGridArr([...tempArr])

    // getNearByNodes(x, y - 2, tempArr)
    setGridArr([...tempArr])
  }

  // const gridSize = 10
  const gridSize = 5
  // const arr = generateArrayOfArr(gridSize)

  const arr = [
    [
      { x: 0, y: 0, mine: false, nearByMine: 0, mask: true },
      { x: 1, y: 0, mine: false, nearByMine: 0, mask: true },
      { x: 2, y: 0, mine: false, nearByMine: 0, mask: true },
      { x: 3, y: 0, mine: false, nearByMine: 0, mask: true },
      { x: 4, y: 0, mine: false, nearByMine: 0, mask: true },
    ],
    [
      { x: 0, y: 1, mine: false, nearByMine: 0, mask: true },
      { x: 1, y: 1, mine: true, nearByMine: 0, mask: true },
      { x: 2, y: 1, mine: false, nearByMine: 0, mask: true },
      { x: 3, y: 1, mine: false, nearByMine: 0, mask: true },
      { x: 4, y: 1, mine: false, nearByMine: 0, mask: true },
    ],
    [
      { x: 0, y: 2, mine: false, nearByMine: 0, mask: true },
      { x: 1, y: 2, mine: false, nearByMine: 0, mask: true },
      { x: 2, y: 2, mine: false, nearByMine: 0, mask: true },
      { x: 3, y: 2, mine: true, nearByMine: 0, mask: true },
      { x: 4, y: 2, mine: false, nearByMine: 0, mask: true },
    ],
    [
      { x: 0, y: 3, mine: false, nearByMine: 0, mask: true },
      { x: 1, y: 3, mine: false, nearByMine: 0, mask: true },
      { x: 2, y: 3, mine: false, nearByMine: 0, mask: true }, //
      { x: 3, y: 3, mine: false, nearByMine: 0, mask: true },
      { x: 4, y: 3, mine: false, nearByMine: 0, mask: true },
    ],
    [
      { x: 0, y: 4, mine: false, nearByMine: 0, mask: true },
      { x: 1, y: 4, mine: false, nearByMine: 0, mask: true },
      { x: 2, y: 4, mine: false, nearByMine: 0, mask: true },
      { x: 3, y: 4, mine: false, nearByMine: 0, mask: true },
      { x: 4, y: 4, mine: false, nearByMine: 0, mask: true },
    ],
  ]

  // randomlyChangeMines(arr, 10)
  arr.map((xArr) => {
    xArr.map((item: ItemType) => {
      calcuateNearbyMines(item.x, item.y, arr)
    })
  })

  const [gridArr, setGridArr] = useState(arr)
  // console.log("What is grid Arr  , ", gridArr)
  // console.log("what is row and column : ", gridArr[3][2]) //grid arr [y][x]
  // console.log("what is row and column @@@ : ", gridArr[2][3])

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
    // <div> TEST</div>
  )
}

const gridStyles = stylex.create({
  base: { backgroundColor: "lightgray" },
  xArr: { display: "flex", flexDirection: "row" },
})
