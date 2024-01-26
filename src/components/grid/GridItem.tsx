import * as stylex from "@stylexjs/stylex"

export type ItemType = {
  x: number
  y: number
  mine: boolean
}

export type GridItemProps = {
  item: ItemType
  gameOver: () => void
}

export const GridItem = ({ item, gameOver }: GridItemProps) => {
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
        gridItemStyles.dynamicOption(item.mine)
      )}
      onClick={onClickFn}
    >
      {item.i} {item.x}
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
  dynamicOption: (mine) => ({
    backgroundColor: mine ? "red" : "pink",
  }),
})
