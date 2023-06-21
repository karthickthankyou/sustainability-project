import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaAddProductItems = z.object({
  quantity: z.number().min(1).max(10),
})

export type FormTypeAddProductItems = z.infer<typeof schemaAddProductItems>

export const useFormAddProductItems = () =>
  useForm<FormTypeAddProductItems>({
    resolver: zodResolver(schemaAddProductItems),
  })

export const FormProviderAddProductItems = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormAddProductItems()
  return <FormProvider {...methods}>{children}</FormProvider>
}
