import * as stylex from "@stylexjs/stylex"

export type PopUpModalProps = {
  text: string
  buttonText: string
  tryAgain: () => void
  removePopUp: () => void
}
export const PopUpModal = ({
  text,
  buttonText,
  tryAgain,
  removePopUp,
}: PopUpModalProps) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.textContainer)}>
        <div {...stylex.props(styles.text)}> {text}</div>
        <div
          {...stylex.props(styles.button)}
          onClick={() => {
            tryAgain()
            removePopUp()
          }}
        >
          {buttonText}
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "100%",
    height: "100%",
    zIndex: "1",
    left: 0,
    top: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    padding: "2rem",
    paddingLeft: "4rem",
    paddingRight: "4rem",
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "black",
    padding: ".5rem",
    border: "1px solid black",
    color: "white",
    fontSize: ".8rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
  },
})
