import Head from 'next/head';
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

import { DefaultSeo } from 'next-seo';

import * as gtag from '../lib/gtag';

import { AuthProvider } from '../contexts/auth';

import { attributes as global } from '../content/settings/global.md';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${global.siteTitle}`}
        defaultTitle={global.defaultMetadata.title}
        description={global.defaultMetadata.description}
        openGraph={{
          type: 'website',
          site_name: global.siteTitle,
        }}
        twitter={{
          cardType: global.defaultMetadata.twitterCardType,
          handle: global.defaultMetadata.twitterUsername,
        }}
      />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      {/* eslint-disable-next-line @next/next/inline-script-id */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
