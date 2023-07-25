import {
  ProductItemsQuery,
  Status,
} from '@sustainability-project/network/src/generated'
import { StatusBadge } from '../StatusBadge'
import {
  returnProductItem,
  sellProductItem,
} from '@sustainability-project/contract-utilities'
import { useAsync } from '@sustainability-project/hooks/async'
import { useAccount } from '@sustainability-project/hooks/web3'
import { notification$ } from '@sustainability-project/util/subjects'
import { PlainButton } from '../../atoms/PlainButton'
import Image from 'next/image'

export interface IProductItemCardProps {
  productItem: NonNullable<ProductItemsQuery['productItems']>[0]
}

const getBg = (status: Status) => {
  if (status === Status.Manufactured) {
    return `url('/nature.jpg')`
  }
}

export const ProductItemCard = ({ productItem }: IProductItemCardProps) => {
  return (
    <div className="p-3 bg-white rounded">
      {/* <div
        className="relative p-3 space-y-2 bg-cover rounded-lg backdrop-filter backdrop backdrop-blur-sm"
        style={{
          backgroundImage: `url('/nature.jpg')`,
        }}
      > */}
      <ProductItemInfo productItem={productItem} />
      <UpdateProductItem productItem={productItem} />
      {/* </div> */}
    </div>
  )
}

export const ProductItemInfo = ({ productItem }: IProductItemCardProps) => {
  return (
    <>
      <StatusBadge shadow={false} status={productItem.status} />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{productItem.id}</div>
        <div className="text-sm">{productItem.product.name}</div>
      </div>
    </>
  )
}

export const UpdateProductItem = ({ productItem }: IProductItemCardProps) => {
  return (
    <div>
      <div className="flex justify-end">
        {productItem.status === Status.Manufactured ? (
          <SellItem id={productItem.id} />
        ) : null}
        {productItem.status === Status.Sold ? (
          <ReturnItem id={productItem.id} />
        ) : null}
      </div>
    </div>
  )
}

export const ActionComplete = () => {
  return (
    <div>
      <div className="text-xl font-bold">Action complete.</div>
      <div className="mt-1 text-sm">
        It will take a few seconds to update. Click refresh.
      </div>
    </div>
  )
}

export const SellItem = ({ id }: { id: string }) => {
  const { account, contract } = useAccount()

  const [{ data, loading, error }, sellProductItemFunction] =
    useAsync(sellProductItem)
  return (
    <div>
      <PlainButton
        loading={loading}
        onClick={async () => {
          if (!contract) {
            notification$.next({ message: 'Action failed.' })
            return
          }
          await sellProductItemFunction({
            account,
            contract,
            payload: { productItemId: id },
          })
          notification$.next({
            message: <ActionComplete />,
          })
        }}
        className="text-sm underline underline-offset-4"
      >
        Sell item
      </PlainButton>
    </div>
  )
}

export const ReturnItem = ({ id }: { id: string }) => {
  const { account, contract } = useAccount()

  const [{ data, loading, error }, returnProductItemFunction] =
    useAsync(returnProductItem)
  return (
    <div>
      <PlainButton
        loading={loading}
        onClick={async () => {
          if (!contract) {
            notification$.next({ message: 'Action failed.' })
            return
          }
          await returnProductItemFunction({
            account,
            contract,
            payload: { productItemId: id },
          })
          notification$.next({
            message: <ActionComplete />,
          })
        }}
        className="text-sm underline underline-offset-4"
      >
        Return item
      </PlainButton>
    </div>
  )
}
