import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"
import useDebounce from "../hooks/useDebounce"
import { useSession } from "next-auth/react"

import { mintNFTABI, mintNFTAddress } from "../contracts/Contract"


export default function Home() {
  const [tokenId, setTokenId] = useState("")
  const debouncedValue = useDebounce<string>(tokenId)
  const { data: session } = useSession()

  //Preparing a contract
  const { config } = usePrepareContractWrite({
    address: mintNFTAddress,
    abi: mintNFTABI,
    functionName: "mint",
    //@ts-ignore
    args: [parseInt(debouncedValue)],
    enabled: Boolean(debouncedValue),
  })

  //using prepared contract
  const {
    write: mintNFT,
    data: mintData,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(config)

  //waiting for the transaction to finish

  const { isSuccess: txSuccess, isLoading } = useWaitForTransaction({
    hash: mintData?.hash,
  })

  const isMinted = txSuccess

  return (
    <main >
      <div className='container m-auto h-screen flex items-center justify-center'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='m-auto'>
            <h1 className='text-3xl font-bold mb-5'>NFT Mint</h1>
            <ConnectButton />

            <form
              onSubmit={(e) => {
                e.preventDefault()
                mintNFT?.()
              }}
              className='mt-5'
            >
              <div>
                <label htmlFor='tokenId'>Token ID</label>
                <input
                  id='tokenId'
                  name='tokenId'
                  onChange={(e) => setTokenId(e.target.value)}
                  placeholder='420'
                  value={tokenId}
                  className='px-4 py-3 rounded border-2 ml-3'
                />
              </div>
              {!session && (
                <button
                  className='py-2 px-4 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
                  disabled={
                    isMintLoading || isLoading || !parseInt(debouncedValue)
                  }
                  type='submit'
                >
                  {isMintLoading && "Waiting For Approve"}
                  {isMintStarted && isLoading && !isMinted && "Minting..."}
                  {!isMintLoading && !isLoading && "Mint"}
                </button>
              )}
            </form>
          </div>
          <div>
            <div className='card w-96 text-center'>
              <figure className='px-10 pt-10 mb-3'>
                <img
                  src='https://placeimg.com/400/225/arch'
                  alt='Shoes'
                  className='rounded-xl'
                />
              </figure>
              {isMinted && (
                <>
                  <p>
                    View on{" "}
                    <a
                      className='text-blue-800 hover:underline'
                      href={`https://goerli.etherscan.io/tx/${mintData?.hash}`}
                    >
                      Goerli Etherscan
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}