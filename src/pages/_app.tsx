import { WalletWrapper } from '@/Wrappers/WalletWrapper';
import { ChakraProvider } from '@chakra-ui/react';
import '@solana/wallet-adapter-react-ui/styles.css';
import type { AppProps } from 'next/app';
import '@fontsource/inter/variable.css';
import { theme } from '@/styles/theme';
import { NextSeo } from 'next-seo';

const metadata = {
  title: 'Dropspace',
  description:
    'An all-in-one storage solution for communities, providing a secure and easy way to share files. Dropspace simplifies file management for organizations and their members.',
  url: 'https://dropspace.shastraos.org/',
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        defaultTitle={metadata.title}
        description={metadata.description}
        openGraph={{
          title: metadata.title,
          description: metadata.description,
          url: metadata.url,
          type: 'website',
          siteName: metadata.title,
          images: [
            {
              url: '/assets/og.svg',
              width: 1200,
              height: 630,
              alt: metadata.title,
            },
          ],
        }}
        themeColor={theme.colors.black}
        title={metadata.title}
      />

      <WalletWrapper>
        <Component {...pageProps} />
      </WalletWrapper>
    </ChakraProvider>
  );
};

export default App;
