export type GameProps = {
  // games: Array<number>
  // games: number
  games: GameType
  setGames?: (games: GameType) => void
}

type GameType = {
  win: number
  lost: number
  // time: number
}

export const Game = ({ games }: GameProps) => {
  return (
    <div>
      Game
      <div>
        Game Win: {games.win} , Game Lost: {games.lost}
      </div>
    </div>
  )
}
