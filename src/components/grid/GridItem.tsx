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
  // gameOver,
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
        gridItemStyles.dynamicOption(
          item.mine,
          item.nearByMine,
          item.mask,
          item.flag
        )
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
        <div {...stylex.props(gridItemStyles.cell)}>
          <FaFlag color="green" />
        </div>
      )}

      {showMines && item.mine && (
        <div {...stylex.props(gridItemStyles.cell)}>
          <FaBomb />
        </div>
      )}

      {!item.mine &&
        !item.flag &&
        item.nearByMine > 0 &&
        item.mask == false && (
          <div {...stylex.props(gridItemStyles.cell)}>{item.nearByMine}</div>
        )}
    </div>
  )
}

const gridItemStyles = stylex.create({
  base: {
    height: "2rem",
    width: "2rem",
    border: "1px black solid",
    fontSize: "1rem",
    justifyItems: "center",
    alignContent: "center",
  },
  dynamicOption: (mine, nearByMine, mask) => ({
    backgroundColor:
      mask == false
        ? mine
          ? "red"
          : nearByMine > 0
          ? "orange"
          : "pink"
        : "lightgray",
  }),
  cell: {
    // width: "100%",
    // height: "100%",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyItems: "center",
    // alignContnet: "center",
    // justifyContnet: "center",
    // backgroundColor: "pink",
  },
})
