import * as stylex from "@stylexjs/stylex"
import { GridItem } from "./GridItem"
export const Grid = () => {
  const girdArr = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ]

  const generateArrayOfArr = (num: number) => {
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push([])
      for (let x = 0; x < num; x++) {
        arr[i].push(`${i}.${x}`)
      }
    }
    return arr
  }

  const arr = generateArrayOfArr(5)
  console.log("What is arr: ", arr)
  return (
    <div {...stylex.props(gridStyles.base)}>
      {arr.map((eachArr, key) => {
        // return <GridItem />
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
