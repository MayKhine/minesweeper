import * as styleX from "@stylexjs/stylex"

export type ClearPopUpModelProps = {
  closePopUp: () => void
}
export const ClearPopUpModel = ({ closePopUp }: ClearPopUpModelProps) => {
  return (
    <div {...styleX.props(popUpModalStyles.base)} onClick={closePopUp}></div>
  )
}

const popUpModalStyles = styleX.create({
  base: {
    backgroundColor: "rgba(167, 84, 84, 0.3)",
    width: "100%",
    height: "100%",
    zIndex: "1",
    left: 0,
    top: 0,
    position: "fixed",
  },
})
