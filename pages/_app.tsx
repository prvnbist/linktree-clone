import type { AppProps } from 'next/app'
import { GlobalStyles } from 'twin.macro'
import { Provider } from 'next-auth/client'
import { ToastProvider } from 'react-toast-notifications'

import { Apollo } from '../lib'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
   return (
      <Provider session={pageProps.session}>
         <GlobalStyles />
         <Apollo>
            <ToastProvider
               autoDismiss
               autoDismissTimeout={4000}
               placement="top-right"
            >
               <Component {...pageProps} />
            </ToastProvider>
         </Apollo>
      </Provider>
   )
}
export default App
