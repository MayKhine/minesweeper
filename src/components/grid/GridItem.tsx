import * as stylex from "@stylexjs/stylex"

type GridItemProps = {
  item: string
}
export const GridItem = ({ item }: GridItemProps) => {
  const onClickFn = () => {
    console.log("ON CLICK : ", item)
  }
  return (
    <div {...stylex.props(gridItemStyles.base)} onClick={onClickFn}>
      {item}
    </div>
  )
}

const gridItemStyles = stylex.create({
  base: {
    backgroundColor: "pink",
    height: "3rem",
    width: "3rem",
    border: "1px black solid",
  },
})
