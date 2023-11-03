import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { CookiesProvider } from "react-cookie";

Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="https://alpha-site.vercel.app/imgs/Cogu-avatar/Default.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />

                <link rel="stylesheet" href="/css/reset.css" />             
                <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
                <link rel="stylesheet" href="/css/global.css" />
                <link rel="stylesheet" href="/css/globalAnimations.css" />   
            </Head>
            <nav>
                <style jsx>{`
                    a {
                        margin: 0 10px 0 0;
                    }
                `}</style>
            </nav>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </>
    )
}

export default App