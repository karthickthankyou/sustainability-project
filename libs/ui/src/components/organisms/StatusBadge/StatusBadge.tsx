import { Status } from '@sustainability-project/network/src/generated'

export interface IStatusBadgeProps {
  status: Status
}

const classes = {
  [Status.Manufactured]: 'bg-yellow border border-yellow',
  [Status.Sold]: 'bg-red border border-red ',
  [Status.Returned]: 'bg-green border border-green ',
}

export const StatusBadge = ({ status }: IStatusBadgeProps) => {
  return (
    <span
      className={`${classes[status]} rounded shadow-lg inline-block px-2 py-0.5 bg-opacity-30 text-xs`}
    >
      {status}
    </span>
  )
}
