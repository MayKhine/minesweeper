import * as styleX from "@stylexjs/stylex"

export type PopUpModalProps = {
  gameStatus: string
  text: string
  tryAgain: () => void
  removePopUp: () => void
}
export const PopUpModal = ({
  gameStatus,
  text,
  tryAgain,
  removePopUp,
}: PopUpModalProps) => {
  return (
    <div {...styleX.props(popUpModalStyles.base)}>
      <div {...styleX.props(popUpModalStyles.modal)}>
        <div> Game Status: {gameStatus} </div>
        <div> {text}</div>
        <button
          onClick={() => {
            tryAgain()
            removePopUp()
          }}
        >
          Play again
        </button>
      </div>
    </div>
  )
}

const popUpModalStyles = styleX.create({
  base: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    zIndex: "1",
    left: 0,
    top: 0,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "pink",
    display: "flex",
    flexDirection: "column",
    width: "10rem",
    height: "10rem",
    // alignItems: "center",
    // alignSelf: "center",
    // justifyConent: "center",
  },
})
