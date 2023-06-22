import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { PlainButton } from '@sustainability-project/ui/src/components/atoms/PlainButton'
import { AlertSection } from '@sustainability-project/ui/src/components/molecules/AlertSection'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { AllProducts } from '@sustainability-project/ui/src/components/templates/AllProducts'
import { Manufacturers } from '@sustainability-project/ui/src/components/templates/Manufacturers'
import { Transactions } from '@sustainability-project/ui/src/components/templates/Transactions'

export default function Home() {
  const { account } = useAccount()

  if (!account) return <AlertNoAccount />

  return (
    <Container className="space-y-24">
      <AllProducts />
      <Manufacturers />
      <Transactions />
    </Container>
  )
}
