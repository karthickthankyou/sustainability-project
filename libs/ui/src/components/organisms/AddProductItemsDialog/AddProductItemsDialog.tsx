import { useEffect, useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { IconPlus } from '@tabler/icons-react'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useAsync } from '@sustainability-project/hooks/async'
import { addProductItems } from '@sustainability-project/contract-utilities'
import { useFormAddProductItems } from '@sustainability-project/forms/src/addProductItems'
import { useAccount } from '@sustainability-project/hooks/web3'
import { Button } from '../../atoms/Button'

export interface IAddProductItemsDialogProps {
  productId: string
}

export const AddProductItemsDialog = ({
  productId,
}: IAddProductItemsDialogProps) => {
  const [open, setOpen] = useState(false)
  const [{ data, loading, error }, addProductItemsFunction] =
    useAsync(addProductItems)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormAddProductItems()

  const { contract, account } = useAccount()

  useEffect(() => {
    if (data) {
      reset()
    }
  }, [data])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  return (
    <div>
      <PlainButton
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm underline text-gray underline-offset-4"
      >
        Add items
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Add product items'}>
        <Form
          onSubmit={handleSubmit(async ({ quantity }) => {
            if (!contract) {
              console.error('Contract not found')
              return
            }

            addProductItemsFunction({
              account,
              contract,
              payload: {
                productId,
                quantity,
              },
            })
          })}
        >
          <div className="text-lg font-semibold">Product #{productId}</div>
          <HtmlLabel title="Quantity" error={errors.quantity?.message}>
            <HtmlInput
              placeholder="Enter quantity"
              {...register('quantity', { valueAsNumber: true })}
            />
          </HtmlLabel>{' '}
          <Button
            disabled={Boolean(data)}
            loading={loading}
            color="black"
            type="submit"
          >
            Add items
          </Button>
          <div className="mt-2">
            {data ? 'Items added successfully.' : null}
          </div>
        </Form>
      </Dialog>{' '}
      <Dialog
        open={showSuccessMessage}
        setOpen={setShowSuccessMessage}
        title={'Success.'}
      >
        <div className="text-xl">Items submitted successfully.</div>
        <div className="mt-1 mb-4 text-sm text-gray">
          It may take a few seconds to reflect in our dabatase.
        </div>
      </Dialog>
    </div>
  )
}
