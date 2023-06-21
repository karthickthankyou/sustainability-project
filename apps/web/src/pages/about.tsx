import { Container } from '@sustainability-project/ui/src/components/atoms/Container'

export default function AboutPage() {
  return (
    <Container>
      <div className="flex flex-col max-w-lg gap-2 ">
        <h1 className="text-xl font-bold">About the Sustainability Project</h1>
        <p>
          Imagine a world where every product tells a story - an honest, no
          secrets barred, a full-disclosure tale of its lifecycle. Interesting,
          right? That&apos;s precisely what The Sustainability Project is trying
          to achieve!
        </p>{' '}
        <p>
          This portfolio product tries to change the narrative of product
          transparency (and saving the world while we&apos;re at it).
        </p>
        <h2 className="mt-4 font-semibold">The Mission</h2>
        <p>
          Every hazardous product needs to be tracked back to the recycling
          unit.
        </p>
        <p>
          If not, at least we should know how much we dumped on the environment.
        </p>
        <h2 className="mt-4 font-semibold">The Developer</h2>
        <p>
          Hi, I am Karthick Ragavendran, a full-stack developer, tech
          enthusiast, and environment lover. I embarked on this journey to blend
          my knack for coding with my passion for the environment.
        </p>{' '}
      </div>
    </Container>
  )
}
