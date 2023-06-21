import { Subject } from 'rxjs'
import { ReactNode } from 'react'

export type NotificationType = {
  id: string
  message: ReactNode
  type?: 'success' | 'error' | 'info' | 'warning'
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
}

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
