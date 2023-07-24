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

export async function getServerSideProps(context) {
    // console.log(language_json)
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
    // console.log(typeof language_json)
    // console.log(dir)
    const id = context.query.id

    setTimeout(async () => {
        const apify = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        fetch(`${process.env.LOCAL_BASE_URL}/analytics/visitors`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            path: `/blogs/${id}`,
            ip:apify.ip
          })
        })
      })

    return {
        props: {
            language_json,
            base_url: process.env.BASE_URL
        }
    }
}

export default function Detail({ language_json, base_url }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    const { most_popular, blog_detail, getClientBlogDetail, getClientBlogs } = blogStore()
    const router = useRouter()
    useEffect(() => {
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
        (async () => {
            await getClientBlogDetail(router.query.id, base_url)
            await getClientBlogs(base_url)
            // console.log(router)
        })()
    }, [])
    return (
        <div>
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
                            <h4>{blog_detail.title}</h4>
                            <span className="text-dark">{(blog_detail.created_at) ? formatRelative(subDays(new Date(blog_detail.created_at), 3), new Date(), { locale: id }) : ''}</span>
                            <img className="img-fluid mb-4" src={blog_detail.image_cover} alt="" />
                            <div style={{ background: "#fff" }} className="p-2" dangerouslySetInnerHTML={{ __html: blog_detail.description }}>

                            </div>
                            <br />
                            <div className="bg-light">
                                <div className="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
                            </div>
                        </div>
                        <MostRead most_popular={most_popular} />
                    </div>
                </div>
            </main>
        </div>
    )
}