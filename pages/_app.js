// import '../styles/globals.css'
import 'bulma/css/bulma.min.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Name Genesis</title>
        <meta name="description" content="Generate a name for the next unicorn!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
