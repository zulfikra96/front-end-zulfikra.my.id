import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import path from "path";
import fs from "fs";
import _ from "lodash";
import { globalStore } from "../../states/global";
import { worksState } from "../../states/Works";
import { useRouter } from "next/router";
const { isEmpty } = _


export async function getServerSideProps(context) {
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
    const id = context.query.id
    let data
    try {
        const res = await fetch(`${process.env.LOCAL_BASE_URL}/clients/works/${id}`, {
            method: "GET"
        }).then((res) => res.json())
        data = res.data
    } catch (error) {
        console.log(error)

    }
    return {
        props: {
            language_json,
            base_url: process.env.BASE_URL,
            data
        }
    }
}


export default function Detail({ base_url, language_json, data }) {
    const [languageJson, setLanguageJson] = useState()
    const { language, chooseLanguage } = globalStore()
    const { getClientWorksDetail } = worksState()
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
    }, [])
    return (
        <div>
            <Head>
                <meta property="og:url" content={`https://zulfikra.my.id/works/${data?.id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={data?.title} />
                <meta property="og:description" content={data?.meta_description} />
                <meta property="og:image" content={data?.image_cover} />

                <meta name="description" content={data?.meta_description} />
                <meta name="keywords" content={data?.meta_keywords} />
                <meta name="author" content="zulfikra l abdjul" />

            </Head>
            <Navbar languageJson={languageJson} />
            <main id="main">

                <section className="section">


                    <div className="site-section pb-0">
                        <div className="container">
                            <div className="row align-items-stretch">
                                <div className="col-md-8" data-aos="fade-up">
                                    <div className="col-md-12 mb-4">
                                        <img src={data?.image_cover} alt="Image" className="img-fluid" />
                                    </div>
                                    <div className="col-md-12 mb-4 bg-light p-4">
                                        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                                    </div>
                                </div>
                                <div className="col-md-3 ml-auto" data-aos="fade-up" data-aos-delay="100">
                                    <div className="sticky-content">
                                        <h3 className="h3">{data?.title}</h3>
                                        <p className="mb-4"><strong><span className="text-muted">{data?.category}</span></strong></p>
                                        <div className="row">
                                            <span>{data.tools}</span>
                                        </div>
                                        {/* <h4 className="h4 mb-3">What I did</h4>
                                        <ul className="list-unstyled list-line mb-5">
                                            <li>Design</li>
                                            <li>HTML5/CSS3</li>
                                            <li>CMS</li>
                                            <li>Logo</li>
                                        </ul>

                                        <p><a href="#" className="readmore">Visit Website</a></p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}