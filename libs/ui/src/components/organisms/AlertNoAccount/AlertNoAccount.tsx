import { Container } from '../../atoms/Container'
import { PlainButton } from '../../atoms/PlainButton'
import { AlertSection } from '../../molecules/AlertSection'

export interface IAlertNoAccountProps {}

export const AlertNoAccount = ({}: IAlertNoAccountProps) => {
  return (
    <Container>
      <AlertSection>
        <div className="font-semibold">You need to sign in with metamask.</div>
        <PlainButton
          onClick={() => {
            window.location.reload()
          }}
          className="text-xs underline underline-offset-4"
        >
          Signed in? Refresh.
        </PlainButton>
      </AlertSection>
    </Container>
  )
}
