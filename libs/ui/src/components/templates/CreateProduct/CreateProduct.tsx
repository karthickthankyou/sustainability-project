import { useFormCreateProduct } from '@sustainability-project/forms/src/createProduct'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import { useAsync } from '@sustainability-project/hooks/async'
import { createProduct } from '@sustainability-project/contract-utilities'
import { useAccount } from '@sustainability-project/hooks/web3'
import { Dialog } from '../../atoms/Dialog'
import { useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { IconPlus } from '@tabler/icons-react'

export interface ICreateProductProps {}

export const CreateProduct = ({}: ICreateProductProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateProduct()
  const { contract, account } = useAccount()

  const [{ data, loading, error }, createProductFunction] =
    useAsync(createProduct)
  console.log('errors', errors)
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

            console.log(name, plasticWeight)
            createProductFunction({
              account,
              contract,
              payload: {
                name,
                plasticWeight,
              },
            })
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
          <Button
            disabled={Boolean(data)}
            loading={loading}
            color="black"
            type="submit"
          >
            Create
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
