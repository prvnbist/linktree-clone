import tw from 'twin.macro'
import { signIn, signOut, useSession } from 'next-auth/client'

const Home = () => {
   const [session] = useSession()

   return (
      <div tw="bg-gray-100">
         Hello World!
         <p>{session?.user?.email}</p>
         <button onClick={() => signIn()}>Sign in</button>
         <button onClick={() => signOut()}>Sign out</button>
      </div>
   )
}

export default Home
