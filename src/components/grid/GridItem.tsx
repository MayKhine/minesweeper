import * as stylex from "@stylexjs/stylex"

export type ItemType = {
  x: number
  y: number
  mine: boolean
  nearByMine: number
}

export type GridItemProps = {
  item: ItemType
  gameOver: () => void
  nearByMineResult?: boolean
}

export const GridItem = ({
  item,
  gameOver,
  nearByMineResult,
}: GridItemProps) => {
  const onClickFn = () => {
    if (item.mine) {
      gameOver()
      console.log("BOOMB")
    }
  }
  return (
    <div
      {...stylex.props(
        gridItemStyles.base,
        gridItemStyles.dynamicOption(item.mine, item.nearByMine)
      )}
      onClick={onClickFn}
    >
      {/* x: {item.x} , y: {item.y} */}
      {item.nearByMine}
    </div>
  )
}

const gridItemStyles = stylex.create({
  base: {
    // backgroundColor: "pink",
    height: "3rem",
    width: "3rem",
    border: "1px black solid",
  },
  dynamicOption: (mine, nearByMine) => ({
    backgroundColor: mine ? "red" : nearByMine > 0 ? "orange" : "pink",
  }),
})
