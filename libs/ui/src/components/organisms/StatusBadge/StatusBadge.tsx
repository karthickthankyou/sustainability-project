import { Status } from '@sustainability-project/network/src/generated'

export interface IStatusBadgeProps {
  status?: Status | null
  shadow?: boolean
}

const classes = {
  [Status.Manufactured]: 'bg-yellow border border-yellow',
  [Status.Sold]: 'bg-red border border-red ',
  [Status.Returned]: 'bg-green border border-green ',
}

export const StatusBadge = ({ status, shadow = true }: IStatusBadgeProps) => {
  if (!status) {
    return null
  }
  return (
    <span
      className={`${classes[status]} ${
        shadow ? 'shadow-lg' : null
      } rounded  inline-block px-2 py-0.5 bg-opacity-30 text-xs`}
    >
      {status}
    </span>
  )
}
