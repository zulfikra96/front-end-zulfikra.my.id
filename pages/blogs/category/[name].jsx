import React from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { globalStore } from "../../../states/global";
import { isEmpty } from "lodash";
import Navbar from "../../components/Navbar";
import fs from "fs"
import path from "path"
import Footer from "../../components/Footer"
import NavbarBlog from "../components/Navbar";
import MostRead from "../components/MostRead";
import { NextRouter, useRouter } from "next/router";
import { blogStore } from "../../../states/Blogs";


export async function getServerSideProps(context) {
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())

    return {
        props: {
            language_json,
            base_url: process.env.BASE_URL
        }
    }
}

export default function Search({ language_json, base_url }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    const [showSearch, setShowSearch] = useState(false)
    const searchRef = useRef(null)
    const router = useRouter()
    const name = router.query.name;
    const { latest_blogs, editor_choice, most_popular, getClientBlogs, getClientBlogByCategory } = blogStore()

    useEffect(() => {
        console.log(router)
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
                //     el: '.swiper-pagination',
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
            await getClientBlogs(base_url, "")
            await getClientBlogByCategory(base_url, name)
        })()

        setTimeout(async () => {
            const apify = await fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
            const base = Buffer.from(JSON.stringify({
                path: `/blogs/category/${name}`,
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
                    <div className="d-flex flex-column mb-4">
                        <div className="d-flex ">
                            <span><strong>Kategori : </strong>{name}</span>
                        </div>

                    </div>
                    <div className="row p-0">

                        <div className="d-flex col-md-8 flex-wrap ">
                            <div className="d-flex flex-wrap">
                                {latest_blogs.map((e) => (
                                    <div key={e.id} className="d-flex col-md-6 pe-2 mb-2">
                                        <Link href={`/blogs/${e.slug}`}>
                                            <div style={{ width: "100%", height: "280px" }} className="blog-item bg-dark d-flex flex-column overflow-hidden position-relative ">
                                                <img className="img-fluid darken-img" src={e.image_cover} alt="" />
                                                <div className="position-absolute bottom-0 p-2">
                                                    <span className="text-white">{e.title}</span>
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
        </div>
    )
}