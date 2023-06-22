import { useAccount } from '@sustainability-project/hooks/web3'
import { PageTitle } from '../../atoms/PageTitle'
import { ShowData } from '../../organisms/ShowData'
import { CreateProduct } from '../CreateProduct'
import { useTakeSkip } from '@sustainability-project/hooks'
import { useProductsLazyQuery } from '@sustainability-project/network/src/generated'
import { ProductCard } from '../../organisms/ProductCard'
import { PlainButton } from '../../atoms/PlainButton'
import { IconRefresh } from '@tabler/icons-react'
import { useEffect } from 'react'

export interface IMyProjectsProps {}

export const MyProjects = ({}: IMyProjectsProps) => {
  const { account } = useAccount()

  const { setSkip, setTake, skip, take } = useTakeSkip()
  const [getProducts, { data, loading }] = useProductsLazyQuery({
    variables: { take, skip, where: { manufacturerId: { equals: account } } },
  })

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mt-2 mb-4">
          <PageTitle>My products</PageTitle>
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
        className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
      >
        {data?.products?.map((product) => (
          <ProductCard key={product.id} product={product} showAddItems />
        ))}
      </ShowData>
    </div>
  )
}
