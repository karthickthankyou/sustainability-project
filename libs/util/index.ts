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
  { label: 'About', href: '/about' },
  { label: 'Inventory', href: '/inventory', loggedIn: true },
  { label: 'Admin', href: '/admin', loggedIn: true, admin: true },
  {
    label: 'Verifier',
    href: '/verifier',
    loggedIn: true,
  },
]
export const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'My projects', href: '/my-projects', loggedIn: true },
  { label: 'Reports', href: '/reports', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: false },
]
