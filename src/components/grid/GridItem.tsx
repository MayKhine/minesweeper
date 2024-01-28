import * as stylex from "@stylexjs/stylex"

export type ItemType = {
  x: number
  y: number
  mine: boolean
  nearByMine: number
  mask: boolean
  queue: boolean
}

export type GridItemProps = {
  item: ItemType
  // gameOver: () => void
  girdItemClickHandler: (
    x: number,
    y: number,
    mine: boolean,
    arr: Array<Array<ItemType>>
  ) => void
  arr: Array<Array<ItemType>>
}

export const GridItem = ({
  item,
  // gameOver,
  girdItemClickHandler,
  arr,
}: GridItemProps) => {
  return (
    <div
      {...stylex.props(
        gridItemStyles.base,
        gridItemStyles.dynamicOption(item.mine, item.nearByMine, item.mask)
      )}
      onClick={() => {
        console.log("My mask: ", item.mask)
        girdItemClickHandler(item.x, item.y, item.mine, arr)
      }}
    >
      {item.nearByMine > 0 && item.mask == false && <p>{item.nearByMine}</p>}
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
  dynamicOption: (mine, nearByMine, mask) => ({
    backgroundColor:
      mask == false
        ? mine
          ? "red"
          : nearByMine > 0
          ? "orange"
          : "pink"
        : "gray",
  }),
})
