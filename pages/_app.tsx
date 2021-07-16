import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import { Apollo } from '../lib'
import global from '../styles/global'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
   global()
   return (
      <Provider session={pageProps.session}>
         <Apollo>
            <Component {...pageProps} />
         </Apollo>
      </Provider>
   )
}
export default App
