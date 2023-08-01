import React from "react";
import { useEffect, useRef, useState } from "react";
import { globalStore } from "../../states/global";
import { isEmpty } from "lodash";
import Navbar from "../components/Navbar";
import fs from "fs"
import path from "path"
import Footer from "../components/Footer"
import NavbarBlog from "./components/Navbar";
import MostRead from "./components/MostRead";
import Link from "next/link";
import { blogStore } from "../../states/Blogs";
import { formatRelative, subDays } from "date-fns"
import { id } from "date-fns/locale";
import Author from "../components/Author";

export async function getServerSideProps() {
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
   
    return {
        props: {
            language_json,
            base_url: process.env.BASE_URL
        }
    }
}

export default function Blogs({ language_json, base_url }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    const [showSearch, setShowSearch] = useState(false)
    const { latest_blogs, editor_choice, most_popular, getClientBlogs } = blogStore()
    const searchRef = useRef(null)
    useEffect(() => {
        setLanguageJson(language_json);

        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
        (async () => {
            // alert("Hello world")
            const swiper = new Swiper('.swiper-blog', {
                // Optional parameters
                direction: 'horizontal',
                loop: false,

                // If we need pagination
                // pagination: {
                //     el: '.swiper-pagination',key={e.id}
                // },

                // // Navigation arrows
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },

                // // And if we need scrollbar
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                // },
            });
            await getClientBlogs(base_url)
        })()

        setTimeout(async () => {
            const apify = await fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
            const base = Buffer.from(JSON.stringify({
                path: "/blogs",
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
            <Navbar active={"blog"} languageJson={languageJson} />
            <main id="main">
                <div className="container">
                    <NavbarBlog base_url={base_url} />
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                <li className="breadcrumb-item active" >Blogs</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row gap-2 mb-4 col-sm-12 col-xs-12">
                        {/* Banner blog */}
                        <div className="swiper-blog overflow-hidden col-12 col-lg-6 col-md-7 col-sm-12 col-xs-12 mb-4">
                            <div className="swiper-wrapper">
                                {editor_choice.map((e) => (
                                    <div key={e.id} className="swiper-slide slider-blog ">
                                        <Link href={`/blogs/${e.slug}`}>
                                            <img className="darken-image" src={e.image_cover} alt="" />
                                            <div className="position-absolute bottom-0 p-2">
                                                <h4>{e.title}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* editor choice */}
                        <div className="d-lg-flex d-md-flex d-sm-none d-none  flex-column col-12 col-md-5">
                            {editor_choice.map((e) => (
                                <Link key={e.id} className="d-flex flex-row gap-2 mb-2" href={`/blogs/${e.slug}`}>
                                    <div className="img col-md-2 overflow-hidden" style={{ height:'60px'}}>
                                        <img className="img-fluid" src={e.image_cover} alt="" />
                                    </div>
                                    <div className="content col-md-10">
                                        <span>{e.title}</span>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>

                    <div className="row">
                        <div className="d-flex flex-column col-md-8 col-12 flex-wrap ">
                            <div className="d-flex">
                                <h4><strong>Terbaru</strong></h4>
                            </div>
                            <div className="d-flex flex-wrap">
                                {latest_blogs.map((e) => (
                                    <div key={e.id} className="d-flex col-12 col-md-6 pe-2 mb-2">
                                        <Link style={{ width: "100%" }} href={`/blogs/${e.slug}`}>
                                            <div style={{ width: "100%", height: "280px" }} className="blog-item bg-dark d-flex flex-column overflow-hidden position-relative ">
                                                <img className="img-fluid darken-img" src={e.image_cover} alt="" />
                                                <div className="position-absolute bottom-0 p-2">
                                                    <span><i className="bi bi-bookmark"> </i>{e.category} </span><span className="text-light">| {formatRelative(subDays(new Date(e.created_at), 3), new Date(), { locale: id })}</span>
                                                    <h4 className="text-white fs-4 fw-bold">{e.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <MostRead most_popular={most_popular} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}