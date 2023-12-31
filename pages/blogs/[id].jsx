import React from "react";
import Script from "next/script"
import Navbar from "../components/Navbar";
import fs from "fs";
import path from "path";
import { globalStore } from "../../states/global";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import NavbarBlog from "./components/Navbar";
import MostRead from "./components/MostRead";
import { blogStore } from "../../states/Blogs";
import { useRouter } from 'next/router';
import { formatRelative, subDays } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import Footer from "../components/Footer";
import Author from "../components/Author";
import Head from "next/head";

export async function getServerSideProps(context) {

    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
    // console.log(typeof language_json)
    // console.log(dir)
    const id = context.query.id
    let content = ""
    try {
        const res = await fetch(`${process.env.LOCAL_BASE_URL}/clients/blogs/${context.query.id}`).then((res) => res.json())
        content = res.data
    } catch (error) {
        console.error(error);
    }
    return {
        props: {
            content: content || {},
            language_json,
            base_url: process.env.BASE_URL
        }
    }
}

export default function Detail({ language_json, base_url, content }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    const { most_popular, getClientBlogDetail, getClientBlogs } = blogStore()
    const [_date, setDate] = useState()
    const router = useRouter()
    useEffect(() => {
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
        const main = document.getElementById("main")
        const images = main.getElementsByTagName("img")
        for (let i = 0; i < images.length; i++) {
            images[i].classList.add("img-fluid")
            images[i].onclick = function () {
                window.open(images[i].src)
            }
            images[i].onmouseenter = function () {
                images[i].style.cursor = "pointer"
            }
        }
        setDate(content?.created_at);
        (async () => {
            await getClientBlogs(base_url)
            // console.log(router)
        })()

        setTimeout(async () => {
            const apify = await fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .catch((err) => console.log(err))
            const base = Buffer.from(JSON.stringify({
                path: `/blogs/${router.query.id}`,
                ip: apify?.ip
            })).toString("base64");
            await fetch(`${base_url}/analytics/visitors`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    data: base
                })
            })
        })

    }, [])
    return (
        <div>
            <Head>
                <meta property="og:url" content={`https://zulfikra.my.id/blogs/${content?.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={content?.title} />
                <meta property="og:description" content={content?.meta_description} />
                <meta property="og:image" content={content?.image_cover} />

                <meta name="description" content={content?.meta_description} />
                <meta name="keywords" content={content?.meta_keywords} />
                <meta name="author" content="zulfikra l abdjul" />

                <meta name="twitter:title" content={content?.title} />
                <meta name="twitter:description" content={content?.meta_description} />
                <meta name="twitter:image" content={content?.image_cover} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Script async defer crossorigin="anonymous" src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v17.0&appId=706452909524459&autoLogAppEvents=1" nonce="rGnDUPIB"></Script>
            <Navbar active={"blog"} languageJson={languageJson} />
            <main id="main">
                <section className="section">
                    <div className="container">
                        <NavbarBlog base_url={base_url} />
                        <div className="row">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li className="breadcrumb-item" ><Link href="/blogs">Blogs</Link></li>
                                    <li className="breadcrumb-item active strong" aria-current="page">{content?.title}</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row ">
                            {(content) ? <div className="d-flex col-md-9 col-12 col-xs-12 flex-column">
                                <h4 className="title p-0 m-0">{content?.title}</h4>
                                <span className="text-dark">{(_date) ? formatRelative(subDays(new Date(_date), 3), new Date(), { locale: id }) : ''}</span>
                                <img className="img-fluid mb-4" src={content?.image_cover} alt="" />
                                <div className=" blogs " dangerouslySetInnerHTML={{ __html: content?.description }}>

                                </div>
                                <br />
                                <div className="bg-light">
                                    <div className="fb-comments" data-href={`https://zulfikra.my.id/blogs/${content?.slug}`} data-width="" data-numposts="5"></div>
                                </div>
                            </div> : <></>}
                            <MostRead most_popular={most_popular} />
                        </div>
                        <Author />

                    </div>
                </section>
            </main>
            <div className="container">

            </div>
            <Footer />
        </div>
    )
}