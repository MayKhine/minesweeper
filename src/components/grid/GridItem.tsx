import * as stylex from "@stylexjs/stylex"
import { FaBomb } from "react-icons/fa"
import { MdFlag } from "react-icons/md"
import { colors } from "../../tokens.stylex"
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
  lastBombClick: Array<number>
}

export const GridItem = ({
  item,
  girdItemClickHandler,
  arr,
  toggleFlag,
  game,
  showMines,
  gridSize,
  lastBombClick,
}: GridItemProps) => {
  // const [toggleBgMine, setToggleBgMine] = useState(false)

  // console.log("last bom click : ", lastBombClick, lastBombClick[0])
  return (
    <div
      {...stylex.props(
        styles.base(gridSize),
        styles.dynamicOption(item.nearByMine, item.mask)
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
          <MdFlag color={colors.white} />
        </div>
      )}
      {showMines && item.mine && (
        <div
          {...stylex.props(
            styles.textSize(gridSize),
            styles.bombColor(lastBombClick, item.x, item.y)
          )}
        >
          <FaBomb color={colors.black} />
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
  base: (gridSize: number) => ({
    // border: `2px ${colors.black} solid`,
    border:
      gridSize == 5
        ? `2.5px ${colors.gray4} solid`
        : gridSize == 9
        ? `1.5px ${colors.gray4} solid`
        : `1px ${colors.gray4} solid`,

    fontSize: "1.5em",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "1",
    height: "100%",
  }),
  dynamicOption: (nearByMine, mask) => ({
    backgroundColor:
      mask == false
        ? nearByMine > 0
          ? `${colors.gray2}`
          : `${colors.gray1}`
        : `${colors.gray3}`,
  }),

  textSize: (gridSize: number) => ({
    with: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: gridSize == 5 ? "2rem" : gridSize == 9 ? "1.5rem" : "1rem",
  }),
  bombColor: (lastBombClick, x, y) => ({
    width: "100%",
    height: "100%",
    backgroundColor:
      lastBombClick[0] === x && lastBombClick[1] === y
        ? "red"
        : `${colors.gray1}`,
  }),
})
