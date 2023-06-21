import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import contractInfo from '../../standalone-projects/smart-contract/contractInfo.json'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

// Replace with your contract's deployed address

export const useAccount = () => {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState<Contract | null>()
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = async () => {
    if (window?.ethereum) {
      window.web3 = new Web3(window.ethereum as any)
      try {
        // Request account access if needed
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881', // Chain ID for Mumbai Testnet on Polygon
              chainName: 'Mumbai Testnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://rpc-mumbai.maticvigil.com/'], // RPC URL for the Mumbai Testnet
              blockExplorerUrls: ['https://mumbai.polygonscan.com/'], // Block explorer URL for the Mumbai Testnet
            },
          ],
        })
      } catch (error) {
        console.error('User denied account access')
      }
    } else if (window?.web3) {
      window.web3 = new Web3(window?.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window?.web3
    const accounts = await web3?.eth.getAccounts()

    if (accounts && accounts.length > 0) {
      setAccount(accounts[0])
    } else {
      console.error('No accounts detected')
      return // Stop further execution if no accounts are detected
    }
    setAccount(accounts[0])

    // Create a new instance of the contract
    const contract = new web3.eth.Contract(
      contractInfo.abi,
      contractInfo.contractAddress,
    )
    setContract(contract)

    // Check if the user is the owner of the contract
    const contractOwner = await contract?.methods.owner().call()
    setIsOwner(accounts[0] === contractOwner)
  }

  return { account, contract, isOwner }
}
