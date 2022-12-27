import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@biconomy/web3-auth/dist/src/style.css"
import { MoralisProvider } from "react-moralis";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  <MoralisProvider
      serverUrl="https://mcjmbxttitd.usermoralis.com:2053/server"
      appId="qhuStMx7fRRNYAtpIOXdqb1Jm9V9eBzqH7bVI1SA"
    >
  <Component {...pageProps} />
  </MoralisProvider>
  );
}
