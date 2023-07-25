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
  { label: 'My products', href: '/my-products', loggedIn: true },
  { label: 'Admin', href: '/admin', loggedIn: true, admin: true },
  { label: 'About', href: '/about' },
]
export const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  //   { label: 'Sell item', href: '/sell-item', loggedIn: true },
  //   { label: 'Return item', href: '/return-item', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: false },
]

type TimePerProduct = {
  value: number
  displayValue: string | null
}

export const calculateTimePerProduct = (
  start: Date,
  numberOfProducts: number,
): TimePerProduct => {
  const now = new Date()
  const diffInSeconds = Math.abs((now.getTime() - start.getTime()) / 1000)
  if (numberOfProducts === 0) {
    return { value: 0, displayValue: null }
  }
  const timePerProduct = diffInSeconds / numberOfProducts

  if (timePerProduct < 60) {
    return {
      value: timePerProduct,
      displayValue: timePerProduct + ' seconds',
    }
  } else if (timePerProduct < 3600) {
    // Less than an hour
    return {
      displayValue: (timePerProduct / 60).toFixed(1) + ' minutes',
      value: timePerProduct,
    }
  } else if (timePerProduct < 86400) {
    // Less than a day
    return {
      displayValue: (timePerProduct / 3600).toFixed(1) + ' hours',
      value: timePerProduct,
    }
  } else {
    // More than a day
    return {
      displayValue: (timePerProduct / 86400).toFixed(1) + ' days',
      value: timePerProduct,
    }
  }
}

export const sustainabilityScore = (
  productionTime: number,
  returnTime: number,
): number => {
  if (productionTime <= 0 || returnTime <= 0) {
    return 0
  }

  // If returnTime is greater than productionTime, this will give a score between 0 and 1
  // The closer this value is to 1, the more sustainable the process.
  // If returnTime is less than productionTime, this will give a score greater than 1,
  // indicating a non-sustainable process (more items are being produced than returned)
  return +((returnTime / productionTime) * 100).toFixed(1)
}

export const getBgColor = (score: number): string => {
  if (score < 20) {
    return 'border border-red text-red '
  } else if (score < 40) {
    return 'border border-orange text-orange '
  } else if (score < 60) {
    return 'border border-yellow text-yellow '
  } else if (score < 80) {
    return 'border border-green-300 text-green-300 '
  } else {
    return 'border border-green text-green '
  }
}
