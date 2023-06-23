import { useNotificationStore } from '@sustainability-project/store/utils'

import { notification$ } from '@sustainability-project/util/subjects'
import { makeId } from '@sustainability-project/util'
import { useEffect } from 'react'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  delay,
  catchError,
  EMPTY,
} from 'rxjs'

export const useNotification = () => {
  const { addNotification, removeNotification } = useNotificationStore(
    (state) => ({
      addNotification: state.addNotification,
      removeNotification: state.removeNotification,
    }),
  )

  useEffect(() => {
    const subscription = notification$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map((v) => ({ ...v, id: makeId(12) })),
        tap((v) => {
          addNotification(v)
        }),
        delay(4000),
        tap((v) => {
          removeNotification(v.id)
        }),
        catchError((e) => {
          return EMPTY
        }),
      )
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [addNotification, removeNotification])
}
