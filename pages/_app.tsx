import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@biconomy/web3-auth/dist/src/style.css"
import { MoralisProvider } from "react-moralis";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  <MoralisProvider
  initializeOnMount={false}
    >
  <Component {...pageProps} />
  </MoralisProvider>
  );
}
