import { useTakeSkip } from '@sustainability-project/hooks'
import { useAccount } from '@sustainability-project/hooks/web3'
import {
  QueryMode,
  SortOrder,
  useProductItemsLazyQuery,
} from '@sustainability-project/network/src/generated'
import { useEffect, useState } from 'react'
import { PageTitle } from '../../atoms/PageTitle'
import { PlainButton } from '../../atoms/PlainButton'
import { IconRefresh } from '@tabler/icons-react'
import { ShowData } from '../../organisms/ShowData'
import { ProductItemCard } from '../../organisms/ProductItemCard'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@sustainability-project/hooks/async'

export interface IMyProductItemsProps {}

export const MyProductItems = ({}: IMyProductItemsProps) => {
  const { account } = useAccount()
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm)
  const [getProductItems, { data, loading }] = useProductItemsLazyQuery({
    variables: {
      take,
      skip,
      where: {
        ...(debouncedSearchTerm
          ? { id: { contains: debouncedSearchTerm } }
          : null),
        product: {
          is: {
            manufacturerId: { equals: account, mode: QueryMode.Insensitive },
          },
        },
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  })
  useEffect(() => {
    getProductItems()
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 ">
          <div className="text-lg font-semibold">My product items</div>

          <PlainButton
            onClick={() => {
              getProductItems({
                fetchPolicy: 'network-only',
              })
            }}
          >
            <IconRefresh
              className={`${loading ? 'animate-spin-reverse' : null} w-4 h-4`}
            />
          </PlainButton>
        </div>{' '}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
        <HtmlLabel>
          <HtmlInput
            placeholder="Search item id..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        </HtmlLabel>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.productItems?.length,
          totalCount: data?.productItemsCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 "
      >
        {data?.productItems?.map((item) => (
          <ProductItemCard key={item.id} productItem={item} />
        ))}
      </ShowData>
    </div>
  )
}
