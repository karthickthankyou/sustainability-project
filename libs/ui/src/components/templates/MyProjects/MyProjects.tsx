import { useAccount } from '@sustainability-project/hooks/web3'
import { PageTitle } from '../../atoms/PageTitle'
import { ShowData } from '../../organisms/ShowData'
import { CreateProduct } from '../CreateProduct'
import { useTakeSkip } from '@sustainability-project/hooks'
import { useProductsQuery } from '@sustainability-project/network/src/generated'
import { ProductCard } from '../../organisms/ProductCard'

export interface IMyProjectsProps {}

export const MyProjects = ({}: IMyProjectsProps) => {
  const { account } = useAccount()

  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading } = useProductsQuery({
    variables: { take, skip, where: { manufacturerId: { equals: account } } },
  })
  return (
    <div>
      <div className="flex items-start justify-between">
        <PageTitle>My projects</PageTitle>
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
      >
        {data?.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ShowData>
    </div>
  )
}
