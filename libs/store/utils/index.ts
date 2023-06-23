import create from 'zustand'
import { persist } from 'zustand/middleware'
import { NotificationType } from '@sustainability-project/types'

type State = {
  notifications: NotificationType[]
  addNotification: (notification: NotificationType) => void
  removeNotification: (id: NotificationType['id']) => void
  resetNotification: () => void
}

export const useNotificationStore = create<State>(
  persist<State>(
    (set) => ({
      notifications: [],

      addNotification: (notification) =>
        set((state) => ({
          ...state,
          notifications: [...state.notifications, notification],
        })),

      removeNotification: (id) =>
        set((state) => ({
          ...state,
          notifications: state.notifications.filter((item) => item.id !== id),
        })),

      resetNotification: () => set({ notifications: [] }),
    }),
    { name: 'notification' },
  ),
)
