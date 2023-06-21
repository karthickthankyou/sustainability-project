import { useState } from 'react'

export const useTakeSkip = () => {
  const [take, setTake] = useState(12)
  const [skip, setSkip] = useState(0)

  return { take, skip, setTake, setSkip }
}
