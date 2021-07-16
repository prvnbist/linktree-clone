import type { AppProps } from 'next/app'

import { Apollo } from '../lib'
import global from '../styles/global'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
   global()
   return (
      <Apollo>
         <Component {...pageProps} />
      </Apollo>
   )
}
export default App
