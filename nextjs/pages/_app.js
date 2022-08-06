import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import AppLayout from '../components/Layouts/AppLayout';
import createEmotionCache from '../src/createEmotionCache';
import { SessionProvider } from "next-auth/react"

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <CacheProvider value={emotionCache}>
                
          <CssBaseline />
      
          <AppLayout mainPage={<Component {...pageProps} /> }/>          
                        
        </CacheProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
