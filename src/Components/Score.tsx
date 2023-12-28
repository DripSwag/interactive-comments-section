import { useState } from 'react'

interface Params {
  score: number
}

enum ScoreState {
  added,
  neutral,
  decreased,
}

export default function Score({ score }: Params) {
  const [value, setValue] = useState(score)
  const [scoreState, setScoreState] = useState(ScoreState.neutral)

  function handleIncreaseScore() {
    if (scoreState === ScoreState.added) {
      setValue(score)
      setScoreState(ScoreState.neutral)
    } else {
      setValue(score + 1)
      setScoreState(ScoreState.added)
    }
  }

  function handleDecreaseScore() {
    if (scoreState === ScoreState.decreased) {
      setValue(score)
      setScoreState(ScoreState.neutral)
    } else {
      setValue(score - 1)
      setScoreState(ScoreState.decreased)
    }
  }

  return (
    <div className='flex gap-4 bg-LightGray px-4 py-2 rounded-lg text-GrayishBlue items-center'>
      <button
        className={`font-bold ${
          scoreState === ScoreState.added ? 'text-ModerateBlue' : ''
        }`}
        onClick={() => {
          handleIncreaseScore()
        }}
      >
        +
      </button>
      <p className='text-ModerateBlue font-medium'>{value}</p>
      <button
        className={`font-bold ${
          scoreState === ScoreState.decreased ? 'text-ModerateBlue' : ''
        }`}
        onClick={() => {
          handleDecreaseScore()
        }}
      >
        -
      </button>
    </div>
  )
}
