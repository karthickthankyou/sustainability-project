import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { MyProjects } from '@sustainability-project/ui/src/components/templates/MyProjects'

export default function Products() {
  const { account } = useAccount()

  if (!account) return <AlertNoAccount />
  return (
    <Container>
      <MyProjects />
    </Container>
  )
}
