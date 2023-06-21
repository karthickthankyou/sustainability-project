import { useAccount } from '@sustainability-project/hooks/web3'
import { Container } from '@sustainability-project/ui/src/components/atoms/Container'
import { PageTitle } from '@sustainability-project/ui/src/components/atoms/PageTitle'
import { AlertNoAccount } from '@sustainability-project/ui/src/components/organisms/AlertNoAccount'
import { CreateProduct } from '@sustainability-project/ui/src/components/templates/CreateProduct'

export default function Products() {
  const { account } = useAccount()

  if (!account) return <AlertNoAccount />
  return (
    <Container>
      <div className="flex items-start justify-between">
        <PageTitle>My projects</PageTitle>
        <CreateProduct />
      </div>
    </Container>
  )
}
