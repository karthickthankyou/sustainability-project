import { useFormCreateProduct } from '@sustainability-project/forms/src/createProduct'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import { useAsync } from '@sustainability-project/hooks/async'
import { createProduct } from '@sustainability-project/contract-utilities'
import { useAccount } from '@sustainability-project/hooks/web3'
import { Dialog } from '../../atoms/Dialog'
import { useEffect, useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { IconPlus } from '@tabler/icons-react'

export interface ICreateProductProps {}

export const CreateProduct = ({}: ICreateProductProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormCreateProduct()
  const { contract, account } = useAccount()

  const [{ data, loading, error }, createProductFunction] =
    useAsync(createProduct)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (data) {
      reset()
    }
  }, [data])

  const [open, setOpen] = useState(false)
  return (
    <div>
      <PlainButton
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <IconPlus /> New product
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Create product'}>
        <Form
          onSubmit={handleSubmit(async ({ name, plasticWeight }) => {
            if (!contract) {
              console.error('Contract not found')
              return
            }

            await createProductFunction({
              account,
              contract,
              payload: {
                name,
                plasticWeight,
              },
            })
            setShowSuccessMessage(true)
            setOpen(false)
          })}
        >
          <HtmlLabel title="Name" error={errors.name?.message}>
            <HtmlInput placeholder="Enter name." {...register('name')} />
          </HtmlLabel>
          <HtmlLabel
            title="Plastic Weight"
            error={errors.plasticWeight?.message}
          >
            <HtmlInput
              placeholder="Enter weight of plastic in grams."
              {...register('plasticWeight', { valueAsNumber: true })}
            />
          </HtmlLabel>{' '}
          <Button loading={loading} color="black" type="submit">
            Create
          </Button>
        </Form>
      </Dialog>
      <Dialog
        open={showSuccessMessage}
        setOpen={setShowSuccessMessage}
        title={'Success.'}
      >
        <div className="text-xl">Your product is submitted successfully.</div>
        <div className="mt-1 mb-4 text-sm text-gray">
          It may take a few seconds to reflect in our dabatase.
        </div>
      </Dialog>
    </div>
  )
}
