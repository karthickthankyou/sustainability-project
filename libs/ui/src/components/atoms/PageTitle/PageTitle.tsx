import { ReactNode } from 'react'

export interface IPageTitleProps {
  children: ReactNode
}

export const PageTitle = ({ children }: IPageTitleProps) => {
  return <h1 className="text-lg font-bold ">{children}</h1>
}
