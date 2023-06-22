import { useTakeSkip } from '@sustainability-project/hooks'
import {
  Status,
  useTransactionsLazyQuery,
} from '@sustainability-project/network/src/generated'
import { useEffect, useState } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { format } from 'date-fns'
import { Pagination } from '../../molecules/Pagination'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { PlainButton } from '../../atoms/PlainButton'
import { useDebouncedValue } from '@sustainability-project/hooks/async'
import { PageTitle } from '../../atoms/PageTitle'
import { StatusBadge } from '../../organisms/StatusBadge'

export interface ITransactionsProps {}

export const Transactions = ({}: ITransactionsProps) => {
  const [searchText, setSearchText] = useState('')
  const { setSkip, setTake, skip, take } = useTakeSkip()

  const debouncedSearchText = useDebouncedValue(searchText, 300)

  const whereCondition = debouncedSearchText
    ? {
        productItem: {
          is: { id: { equals: debouncedSearchText } },
        },
      }
    : null

  const [getTransactions, { data, loading }] = useTransactionsLazyQuery({
    variables: {
      take,
      skip,
      ...(whereCondition ? { where: whereCondition } : null),
    },
  })

  useEffect(() => {
    getTransactions()
  }, [])
  return (
    <div>
      <PageTitle>All transactions</PageTitle>
      <div className="max-w-md my-2">
        <HtmlLabel title="Search item id">
          <HtmlInput
            value={searchText}
            placeholder="enter the product item id"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </HtmlLabel>
      </div>
      <table className="w-full mt-8 border-separate border-spacing-y-2">
        <tr>
          <th className="text-left">ID</th>
          <th className="text-center">Item ID</th>
          <th className="text-center">Date</th>
          <th className="text-center">Name</th>
          <th className="text-right">Status</th>
        </tr>
        {data?.transactions?.length === 0 ? (
          <tr className="text-center ">
            <td colSpan={5}>
              <div className="py-6 bg-gray-25">
                <div>No results.</div>
                {searchText ? (
                  <PlainButton
                    className="text-xs"
                    onClick={() => setSearchText('')}
                  >
                    Clear search text.
                  </PlainButton>
                ) : null}
              </div>
            </td>
          </tr>
        ) : null}

        {data?.transactions?.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td className="text-center">{transaction.productItemId}</td>
            <td className="text-center">
              {format(new Date(transaction.createdAt), 'PPp')}
            </td>
            <td className="text-center">
              {transaction.productItem.product.name}
            </td>
            <td className="text-right">
              <StatusBadge status={transaction.status || Status.Manufactured} />
            </td>
          </tr>
        ))}
      </table>
      {loading ? 'Loading...' : null}
      <div className="flex justify-center">
        <Pagination
          count={Math.floor((data?.transactionsCount.count || 0) / take) || 0}
          page={(skip || 0) / (take || 12)}
          onChange={(v, c) => setSkip(c * (take || 12))}
        />
      </div>
    </div>
  )
}
