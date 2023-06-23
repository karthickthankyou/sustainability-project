import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@sustainability-project/network/src/config/apollo'
import { Header } from '@sustainability-project/ui/src/components/organisms/Header'
import { Notifications } from '@sustainability-project/ui/src/components/organisms/Notifications'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Header />
      <Component {...pageProps} />
      <Notifications />
    </ApolloProvider>
  )
}
