import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { SellItem } from '@sustainability-project/ui/src/components/templates/SellItem'

export default function SellItemPage() {
  const { account } = useAccount()

  if (!account) return <AlertNoAccount />
  return (
    <Container>
      <SellItem />
    </Container>
  )
}
