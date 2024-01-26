import * as stylex from "@stylexjs/stylex"

export type ItemType = {
  x: number
  y: number
  mine: boolean
  nearByMine: number
  mask: boolean
}

export type GridItemProps = {
  item: ItemType
  // gameOver: () => void
  girdItemClickHandler: (x: number, y: number, mine: boolean) => void
}

export const GridItem = ({
  item,
  // gameOver,
  girdItemClickHandler,
}: GridItemProps) => {
  return (
    <div
      {...stylex.props(
        gridItemStyles.base,
        gridItemStyles.dynamicOption(item.mine, item.nearByMine)
      )}
      onClick={() => {
        girdItemClickHandler(item.x, item.y, item.mine)
      }}
    >
      {!item.mask && <p>{item.nearByMine}</p>}
      {/* {item.nearByMine} */}
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
