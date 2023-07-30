import React from "react"
import "../public/assets/vendor/aos/aos.css"
import "../public/assets/vendor/bootstrap/css/bootstrap.min.css"
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "../public/assets/vendor/swiper/swiper-bundle.min.css"
import "../public/assets/css/style.css"
import Head from "next/head"


import Script from "next/script"
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&family=Rubik:wght@300&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href="../zulfikra.png" />
            </Head>
            <Component {...pageProps} />
            <Script strategy="beforeInteractive" src="/assets/vendor/aos/aos.js" />
            <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
            <Script strategy="beforeInteractive" src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" />
            <Script src="/assets/vendor/php-email-form/validate.js" />
            <Script strategy="beforeInteractive" src="/assets/vendor/swiper/swiper-bundle.min.js" />
            <Script src="/assets/js/main.js" />
        </>
    )
}