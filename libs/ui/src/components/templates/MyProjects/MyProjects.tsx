import { useAccount } from '@sustainability-project/hooks/web3'
import { PageTitle } from '../../atoms/PageTitle'
import { ShowData } from '../../organisms/ShowData'
import { CreateProduct } from '../CreateProduct'
import { useTakeSkip } from '@sustainability-project/hooks'
import {
  QueryMode,
  useProductsLazyQuery,
} from '@sustainability-project/network/src/generated'
import { ProductCard } from '../../organisms/ProductCard'
import { PlainButton } from '../../atoms/PlainButton'
import { IconRefresh } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@sustainability-project/hooks/async'

export interface IMyProjectsProps {}

export const MyProjects = ({}: IMyProjectsProps) => {
  const { account } = useAccount()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm)

  const { setSkip, setTake, skip, take } = useTakeSkip()
  const [getProducts, { data, loading }] = useProductsLazyQuery({
    variables: {
      take,
      skip,
      where: {
        ...(debouncedSearchTerm
          ? {
              name: {
                contains: debouncedSearchTerm,
                mode: QueryMode.Insensitive,
              },
            }
          : null),
        manufacturerId: { equals: account, mode: QueryMode.Insensitive },
      },
    },
  })

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="pt-2 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mt-2">
          <div className="text-lg font-semibold">My products</div>

          <PlainButton
            onClick={() => {
              getProducts({
                fetchPolicy: 'network-only',
              })
            }}
          >
            <IconRefresh
              className={`${loading ? 'animate-spin-reverse' : null} w-4 h-4`}
            />
          </PlainButton>
        </div>
        <CreateProduct />
      </div>{' '}
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
          resultCount: data?.products?.length,
          totalCount: data?.productsCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 "
      >
        {data?.products?.map((product) => (
          <ProductCard key={product.id} product={product} showAddItems />
        ))}
      </ShowData>
    </div>
  )
}
