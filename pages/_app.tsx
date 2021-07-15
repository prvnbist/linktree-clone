import type { AppProps } from 'next/app'
import { GlobalStyles } from 'twin.macro'

import { Apollo } from '../lib'

function App({ Component, pageProps }: AppProps) {
   return (
      <Apollo>
         <GlobalStyles />
         <Component {...pageProps} />
      </Apollo>
   )
}
export default App
