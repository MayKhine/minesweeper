import * as stylex from "@stylexjs/stylex"

import { GridItem, ItemType } from "./GridItem"

export const Grid = () => {
  const gridSize = 5

  const generateArrayOfArr = (num: number) => {
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push([])
      for (let x = 0; x < num; x++) {
        const item: ItemType = {
          i: i,
          x: x,
          mine: false,
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

  const arr = generateArrayOfArr(gridSize)
  console.log("What is arr: ", arr)

  // Call the function to randomly change mine values 5 times
  randomlyChangeMines(arr, 5)

  console.log("what is after rnadom changes: ", arr)

  return (
    <div {...stylex.props(gridStyles.base)}>
      {arr.map((eachArr, key) => {
        return (
          <div {...stylex.props(gridStyles.xArr)} key={key}>
            {eachArr.map((item, key) => {
              return <GridItem item={item} key={key} />
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
