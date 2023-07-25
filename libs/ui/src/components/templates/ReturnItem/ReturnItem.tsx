import { useAccount } from '@sustainability-project/hooks/web3'
import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { useEffect, useState } from 'react'
import { Button } from '../../atoms/Button'
import { useAsync } from '@sustainability-project/hooks/async'
import { returnProductItem } from '@sustainability-project/contract-utilities'
import { PageTitle } from '../../atoms/PageTitle'
import { Dialog } from '../../atoms/Dialog'

export interface IReturnItemProps {}

export const ReturnItem = ({}: IReturnItemProps) => {
  const { account, contract } = useAccount()
  const [productItemId, setProductItemId] = useState('')

  const [{ data, loading, error }, returnProductItemFunction] =
    useAsync(returnProductItem)

  useEffect(() => {
    if (data) {
      setProductItemId('')
    }
  }, [data])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  return (
    <div className="max-w-lg">
      <PageTitle>Return item</PageTitle>
      <Form
        onSubmit={async (e) => {
          e.preventDefault()

          // get form data
          const data = new FormData(e.currentTarget)
          const productItemId = data.get('productItemId') as string

          if (!account || !contract) {
            console.error('account or contract not found.')
            return
          }
          await returnProductItemFunction({
            account,
            contract,
            payload: { productItemId },
          })
          setShowSuccessMessage(true)
        }}
      >
        <HtmlLabel title="Product item id">
          <HtmlInput
            placeholder="Enter product item id"
            value={productItemId}
            name="productItemId"
            onChange={(e) => setProductItemId(e.target.value)}
          />
        </HtmlLabel>{' '}
        <div className="mt-2">
          {data ? 'Product item set to returned.' : null}
        </div>
      </Form>{' '}
      <Dialog
        open={showSuccessMessage}
        setOpen={setShowSuccessMessage}
        title={'Success.'}
      >
        <div className="text-xl">Item marked as returned!</div>
        <div className="mt-1 mb-4 text-sm text-gray">
          It may take a few seconds to reflect in our dabatase.
        </div>
      </Dialog>
    </div>
  )
}
