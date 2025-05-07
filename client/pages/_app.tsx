import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      50:  '#fff8f0',
      100: '#ffe0b2',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa726',
      500: '#ff9800',
      600: '#fb8c00',
      700: '#f57c00',
      800: '#ef6c00',
      900: '#e65100',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
