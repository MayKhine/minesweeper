import * as stylex from "@stylexjs/stylex"
import { FaBomb } from "react-icons/fa"
import { MdFlag } from "react-icons/md"

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
  gridSize: number
}

export const GridItem = ({
  item,
  girdItemClickHandler,
  arr,
  toggleFlag,
  game,
  showMines,
  gridSize,
}: GridItemProps) => {
  return (
    <div
      {...stylex.props(
        styles.base,
        styles.dynamicOption(item.mine, item.nearByMine, item.mask)
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
        <div {...stylex.props(styles.textSize(gridSize))}>
          <MdFlag />
        </div>
      )}

      {showMines && item.mine && (
        <div {...stylex.props(styles.textSize(gridSize))}>
          <FaBomb />
        </div>
      )}

      {!item.mine &&
        !item.flag &&
        item.nearByMine > 0 &&
        item.mask == false && (
          <div {...stylex.props(styles.textSize(gridSize))}>
            {item.nearByMine}
          </div>
        )}
    </div>
  )
}

const styles = stylex.create({
  base: {
    border: "1px lightgray solid",
    fontSize: "1.5em",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "1",
  },
  dynamicOption: (mine, nearByMine, mask) => ({
    backgroundColor:
      mask == false
        ? mine
          ? "red"
          : nearByMine > 0
          ? "orange"
          : "lightgray"
        : "gray",
  }),
  textSize: (gridSize: number) => ({
    fontSize: gridSize == 5 ? "2rem" : gridSize == 9 ? "1.5rem" : "1rem",
  }),
})
