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
    // console.log(language_json)
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
    const { most_popular, blog_detail, getClientBlogDetail, getClientBlogs } = blogStore()
    const router = useRouter()
    useEffect(() => {
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
        const images = document.getElementsByTagName("img")
        for (let i = 0; i < images.length; i++) {
            images[i].classList.add("img-fluid")
        }
        (async () => {
            await getClientBlogs(base_url)
            // console.log(router)
        })()

        setTimeout(async () => {
            const apify = await fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
            const base = Buffer.from(JSON.stringify({
                path: `/blogs/${router.query.id}`,
                ip: apify.ip
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
            </Head>
            <Script async defer crossorigin="anonymous" src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v17.0&appId=706452909524459&autoLogAppEvents=1" nonce="rGnDUPIB"></Script>
            <Navbar active={"blog"} languageJson={languageJson} />
            <main id="main">
                <div className="container">
                    <NavbarBlog base_url={base_url} />
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                <li className="breadcrumb-item" ><Link href="/blogs">Blogs</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{blog_detail.title}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ">
                        <div className="d-flex col-md-8 col-12 col-xs-12 flex-column">
                            <h4>{content.title}</h4>
                            <span className="text-dark">{(content.created_at) ? formatRelative(subDays(new Date(content.created_at), 3), new Date(), { locale: id }) : ''}</span>
                            <img className="img-fluid mb-4" src={content.image_cover} alt="" />
                            <div style={{ background: "#fff" }} className="p-2 text-dark" dangerouslySetInnerHTML={{ __html: content.description }}>

                            </div>
                            <br />
                            <div className="bg-light">
                                <div className="fb-comments" data-href={`https://zulfikra.my.id/blogs/${content.slug}`} data-width="" data-numposts="5"></div>
                            </div>
                        </div>
                        <MostRead most_popular={most_popular} />
                    </div>
                </div>
            </main>

            <Author />
            <Footer />
        </div>
    )
}