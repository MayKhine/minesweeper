export type GameProps = {
  // games: Array<number>
  games: number
  setGames: (num: number) => void
}

export const Game = ({ games, setGames }: GameProps) => {
  return (
    <div>
      Game
      <button
        onClick={() => {
          const newNum = games + 1
          setGames(newNum)
        }}
      >
        Add
      </button>
      <div> {games}</div>
    </div>
  )
}
