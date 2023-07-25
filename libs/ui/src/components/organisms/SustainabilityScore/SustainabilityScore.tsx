import { getBgColor } from '@sustainability-project/util'
import { ReactNode } from 'react'

export interface ISustainabilityScoreProps {
  score: number
  timeToManufacture: ReactNode
  timeToReturn: ReactNode
}

export const SustainabilityScore = ({
  score,
  timeToManufacture,
  timeToReturn,
}: ISustainabilityScoreProps) => {
  const bgColor = getBgColor(score)

  return (
    <div className="flex items-center gap-2 ">
      <p
        className={`w-12 h-12 pl-1 flex items-center text-xl rounded justify-center ${bgColor} `}
      >
        {score ? score.toFixed(0) : 0}
        <span className="text-xs">%</span>
      </p>
      <div>
        {timeToManufacture ? (
          <p className="text-xs text-gray-500">
            Produced every {timeToManufacture}.
          </p>
        ) : null}
        <p className="text-xs text-gray-500">
          {timeToReturn
            ? `Returned every ${timeToReturn}.`
            : 'None of them returned.'}
        </p>
      </div>
    </div>
  )
}
