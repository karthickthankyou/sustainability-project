import { useEffect, useState, useCallback } from 'react'

import { MenuItem, ROLES } from '@sustainability-project/types'

export const useKeypress = (keys: string[], action: () => void) => {
  useEffect(() => {
    const onKeyup = (e: { key: any }) => {
      if (keys.includes(e.key)) action()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [action, keys])
}

export const makeId = (length: number = 4) => {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const filterMenuItems = ({
  roles,
  menuItems,
}: {
  roles: ROLES
  menuItems: MenuItem[]
}) => {
  return menuItems
    .filter(({ loggedIn }) => (loggedIn ? roles.loggedIn : true))
    .filter(({ admin }) => (admin ? roles.admin : true))
}

export const MENUITEMS: MenuItem[] = [
  { label: 'Transactions', href: '/transactions', loggedIn: true },
  { label: 'Sell item', href: '/sell-item', loggedIn: true },
  { label: 'Return item', href: '/return-item', loggedIn: true },
  { label: 'Admin', href: '/admin', loggedIn: true, admin: true },
]
export const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'My products', href: '/my-products', loggedIn: true },
  { label: 'About', href: '/about' },
  { label: 'Settings', href: '/settings', loggedIn: false },
]
