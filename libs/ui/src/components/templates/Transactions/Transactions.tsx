import { useTakeSkip } from '@sustainability-project/hooks'
import { useTransactionsLazyQuery } from '@sustainability-project/network/src/generated'
import { useEffect, useState } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { format } from 'date-fns'
import { Pagination } from '../../molecules/Pagination'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { PlainButton } from '../../atoms/PlainButton'

export interface ITransactionsProps {}

export const Transactions = ({}: ITransactionsProps) => {
  const [searchText, setSearchText] = useState('')
  const { setSkip, setTake, skip, take } = useTakeSkip()

  const whereCondition = searchText
    ? {
        productItem: {
          is: { id: { equals: searchText } },
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
      <div className="max-w-lg mx-auto mt-8">
        <HtmlLabel title="Search item id">
          <HtmlInput
            value={searchText}
            placeholder="enter the product item id"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </HtmlLabel>
      </div>
      <table className="w-full mt-8 border-separate border-spacing-2">
        <tr>
          <th>ID</th>
          <th>Item ID</th>
          <th>Date</th>
          <th>Name</th>
          <th>Status</th>
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
            <td className="text-center">{transaction.id}</td>
            <td className="text-center">{transaction.productItemId}</td>
            <td className="text-center">
              {format(new Date(transaction.createdAt), 'PPp')}
            </td>
            <td className="text-center">
              {transaction.productItem.product.name}
            </td>
            <td className="text-center">{transaction.status}</td>
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
