import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { AllProducts } from '@sustainability-project/ui/src/components/templates/AllProducts'
import { Manufacturers } from '@sustainability-project/ui/src/components/templates/Manufacturers'
import { Transactions } from '@sustainability-project/ui/src/components/templates/Transactions'
import { SustainabilityScene } from '@sustainability-project/3d/src/scenes/SustainabilityScene'
import { Button } from '@sustainability-project/ui/src/components/atoms/Button'
import { useRef } from 'react'
import { IconMouse } from '@tabler/icons-react'

export const useScrollTo = () => {
  const interactiveMapRef = useRef<HTMLDivElement | null>(null)

  const executeScroll = () =>
    interactiveMapRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  return [interactiveMapRef, executeScroll] as const
}

export default function Home() {
  const { account } = useAccount()

  const [ref, executeScroll] = useScrollTo()

  return (
    <div className="bg-gray-25">
      <div className="relative ">
        <SustainabilityScene />
        <div className="absolute top-0 left-0 max-w-2xl p-12 text-white ">
          <h1 className="font-black text-7xl">Where does our plastic go?</h1>

          <Button
            color="white"
            className="mt-8"
            size="lg"
            onClick={() => executeScroll()}
          >
            Know more.
          </Button>
        </div>
        <div className="absolute bottom-0 right-0 p-12 ">
          <div>
            Use CMD + <IconMouse className="inline" /> Scroll to zoom.
          </div>
        </div>
      </div>
      <div ref={ref} className="h-16" />
      <div>
        {account ? (
          <Container className="space-y-24">
            <AllProducts />
            <Manufacturers />
            <Transactions />
          </Container>
        ) : (
          <AlertNoAccount />
        )}
      </div>
      <div className="h-16" />
    </div>
  )
}
