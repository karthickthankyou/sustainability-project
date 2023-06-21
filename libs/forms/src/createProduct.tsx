import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaCreateProduct = z.object({
  name: z.string().min(1),
  plasticWeight: z.number(),
})

export type FormTypeCreateProduct = z.infer<typeof schemaCreateProduct>

export const useFormCreateProduct = () =>
  useForm<FormTypeCreateProduct>({
    resolver: zodResolver(schemaCreateProduct),
  })

export const FormProviderCreateProduct = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateProduct()
  return <FormProvider {...methods}>{children}</FormProvider>
}
