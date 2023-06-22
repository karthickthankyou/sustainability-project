import { ReactNode } from 'react'

export interface IPageTitleProps {
  children: ReactNode
}

export const PageTitle = ({ children }: IPageTitleProps) => {
  return <h1 className="mt-2 mb-4 text-lg font-semibold ">{children}</h1>
}
