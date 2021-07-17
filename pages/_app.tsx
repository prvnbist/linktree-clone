import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ToastProvider } from 'react-toast-notifications'

import { Apollo } from '../lib'
import global from '../styles/global'
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
   global()
   return (
      <Provider session={pageProps.session}>
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
