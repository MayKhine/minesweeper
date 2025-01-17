import * as stylex from "@stylexjs/stylex"
import { FaBomb } from "react-icons/fa"
import { FaFlag } from "react-icons/fa6"

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
  game: string
  showMines: boolean
}

export const GridItem = ({
  item,
  girdItemClickHandler,
  arr,
  toggleFlag,
  game,
  showMines,
}: GridItemProps) => {
  return (
    <div
      {...stylex.props(
        gridItemStyles.base,
        gridItemStyles.dynamicOption(item.mine, item.nearByMine, item.mask)
      )}
      onClick={() => {
        if (item.flag || item.mask == false || game != "on") {
          return
        }

        girdItemClickHandler(item.x, item.y, item.mine, arr)
      }}
      onAuxClick={(e) => {
        if (e.button == 2 && item.mask == true && game == "on") {
          toggleFlag(item.x, item.y, arr)
        }
      }}
    >
      {item.flag && item.mask && (
        <div>
          <FaFlag color="green" />
        </div>
      )}

      {showMines && item.mine && (
        <div>
          <FaBomb />
        </div>
      )}

      {!item.mine &&
        !item.flag &&
        item.nearByMine > 0 &&
        item.mask == false && <div>{item.nearByMine}</div>}
    </div>
  )
}

const gridItemStyles = stylex.create({
  base: {
    // height: "2rem",
    // width: "2rem",
    border: "1px lightgray solid",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    // height: "100%",
    // width: "4rem",
    aspectRatio: "1",
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
