import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { MyProjects } from '@sustainability-project/ui/src/components/templates/MyProjects'
import { MyProductItems } from '@sustainability-project/ui/src/components/templates/MyProductItems'

export default function Products() {
  const { account } = useAccount()

  if (!account) return <AlertNoAccount />
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-25">
      <Container>
        <MyProjects />
        <MyProductItems />
      </Container>
    </div>
  )
}
