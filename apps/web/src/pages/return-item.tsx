import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { ReturnItem } from '@sustainability-project/ui/src/components/templates/ReturnItem'

export default function ReturnItemPage() {
  const { account } = useAccount()

  if (!account) return <AlertNoAccount />
  return (
    <Container>
      <ReturnItem />
    </Container>
  )
}
