"use-strict"
import React from "react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { globalStore } from "../../states/global";
import { isEmpty } from "lodash";
import path from "path";
import fs from "fs"
import { worksState } from "../../states/Works";
import Link from "next/link";
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


export default function Works({ language_json, base_url }) {
    const [languageJson, setLanguageJson] = useState()
    const { language, chooseLanguage } = globalStore()
    const { getClientWorks, works } = worksState()
    useEffect(() => {
        // console.log(language === "")
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
        (async () => {
            await getClientWorks(base_url)
        })()

        setTimeout(async () => {
            const apify = await fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
            const base = Buffer.from(JSON.stringify({
                path: "/works",
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
            <Navbar active={"works"} languageJson={languageJson} />
            <main id="main">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <h3 className="h3 heading">Works</h3>
                    </div>

                    <div id="portfolio-grid" className="row no-gutter" data-aos="fade-up" data-aos-delay="200">
                        {works.map((e) => (
                            <div key={e.id} className="overflow-hidden item web col-sm-6 col-md-4 col-lg-4 mb-4">
                                <Link href={`/works/${e.id}`} className="item-wrap fancybox">
                                    <div className="work-info">
                                        <h3>{e.title}</h3>
                                        <span><strong>{e.category}</strong></span>
                                    </div>
                                    <div style={{ height:"230px" }} className="overflow-hidden">
                                        <img className="img-fluid" src={e.image_cover} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}