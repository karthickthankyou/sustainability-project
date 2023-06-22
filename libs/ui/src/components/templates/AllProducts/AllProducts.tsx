import { useProductsQuery } from '@sustainability-project/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@sustainability-project/hooks'
import { ProductCard } from '../../organisms/ProductCard'
import { PageTitle } from '../../atoms/PageTitle'

export interface IAllProductsProps {}

export const AllProducts = ({}: IAllProductsProps) => {
  const { loading, data } = useProductsQuery()
  const { setSkip, setTake, skip, take } = useTakeSkip()
  return (
    <div>
      <PageTitle>All products</PageTitle>
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
          <ProductCard product={product} />
        ))}
      </ShowData>
    </div>
  )
}
