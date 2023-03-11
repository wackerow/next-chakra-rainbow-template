import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../theme'


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  arbitrumGoerli,
  baseGoerli,
  gnosis,
  goerli,
  hardhat,
  localhost,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonZkEvmTestnet,
  sepolia,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    baseGoerli,
    gnosis,
    goerli,
    hardhat,
    localhost,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonZkEvmTestnet,
    sepolia,  
  ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID || "" }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'nextjs-chakraui-rainbow-template',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
