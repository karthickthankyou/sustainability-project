import { useTakeSkip } from '@sustainability-project/hooks'
import { useManufacturersQuery } from '@sustainability-project/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { PageTitle } from '../../atoms/PageTitle'
import { ManufacturerCard } from '../../organisms/ManufacturerCard'

export interface IManufacturersProps {}

export const Manufacturers = ({}: IManufacturersProps) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading } = useManufacturersQuery()
  return (
    <div>
      <PageTitle>All manufacturers</PageTitle>
      <ShowData
        loading={false}
        pagination={{
          resultCount: data?.manufacturers.length,
          totalCount: data?.manufacturersCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
      >
        {data?.manufacturers.map((manufacturer) => (
          <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </ShowData>
    </div>
  )
}
