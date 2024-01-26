import * as stylex from "@stylexjs/stylex"

export type ItemType = {
  i: number
  x: number
  mine: boolean
}

export type GridItemProps = {
  item: ItemType
}

export const GridItem = ({ item }: GridItemProps) => {
  const onClickFn = () => {
    if (item.mine) {
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
