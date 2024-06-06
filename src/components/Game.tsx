export type GameProps = {
  // games: Array<number>
  // games: number
  games: GameType
  setGames: (games: GameType) => void
}

type GameType = {
  win: number
  lost: number
  // time: number
}

export const Game = ({ games, setGames }: GameProps) => {
  return (
    <div>
      Game
      <button
        onClick={() => {
          const newWin = games.win + 1
          const newLost = games.lost + 1
          const newData = { win: newWin, lost: newLost }
          setGames(newData)
        }}
      >
        Add
      </button>
      <div>
        {games.win} {games.lost}
      </div>
    </div>
  )
}
