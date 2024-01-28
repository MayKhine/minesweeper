import * as stylex from "@stylexjs/stylex"

export type ItemType = {
  x: number
  y: number
  mine: boolean
  nearByMine: number
  mask: boolean
  queue: boolean
  flag: boolean
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
  toggleFlag: (x: number, y: number, arr: Array<Array<ItemType>>) => void
}

export const GridItem = ({
  item,
  // gameOver,
  girdItemClickHandler,
  arr,
  toggleFlag,
}: GridItemProps) => {
  return (
    <div
      {...stylex.props(
        gridItemStyles.base,
        gridItemStyles.dynamicOption(item.mine, item.nearByMine, item.mask)
      )}
      onClick={() => {
        if (item.flag || item.mask == false) {
          return
        }

        girdItemClickHandler(item.x, item.y, item.mine, arr)
      }}
      onAuxClick={(e) => {
        if (e.button == 2) {
          // console.log(" TUN ON FLAGGG")
          toggleFlag(item.x, item.y, arr)
        }
      }}
    >
      {item.flag && item.mask && <p> FLAG</p>}
      {!item.flag && item.nearByMine > 0 && item.mask == false && (
        <p>{item.nearByMine}</p>
      )}

      {/* <p>{item.mine}</p> */}
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
