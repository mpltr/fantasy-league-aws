import './styles.css'
import Head from "next/head"
import Nav from "../components/Nav"
import App from 'next/app'
import fetch from 'isomorphic-unfetch'

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps, tournaments}) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="viewport" content="width=device-width"></meta>
      </Head>
      <Nav tournaments={tournaments}/>
      <Component {...pageProps} tournaments={tournaments}/>
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context)
  const tournaments = await fetch(`${process.env.NEXT_PUBLIC_API}/tournament`).then(res => res.json());
  return {
    ...appProps, 
    tournaments
  }
}

export default MyApp