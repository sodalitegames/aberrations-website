import Head from 'next/head';
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';

import * as gtag from '../lib/gtag';

import { AuthProvider } from '../contexts/auth';

import { attributes as global } from '../content/settings/global.md';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
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
      {/* Netlify CMS Script Tag */}
      <Script strategy="beforeInteractive" src="https://identity.netlify.com/v1/netlify-identity-widget.js" />

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script
        id="google-analytics-script"
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

      {/* MailerLite Script Tag */}
      <Script
        id="mailerlite-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
          var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
          f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
          var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
          _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');
          var ml_account = ml('accounts', '3705686', 'd2m1d8e0x9', 'load');`,
        }}
      />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
