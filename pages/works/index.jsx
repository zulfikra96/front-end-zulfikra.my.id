"use-strict"

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { globalStore } from "../../states/global";
import { isEmpty } from "lodash";
import path from "path";
import fs from "fs"

export async function getServerSideProps() {
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())

    return {
        props: {
            language_json
        }
    }
}


export default function Works({ language_json }) {
    const [languageJson, setLanguageJson] = useState()
    const { language, chooseLanguage } = globalStore()
    useEffect(() => {
        // console.log(language === "")
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }

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
                        <div className="item web col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Boxed Water</h3>
                                    <span>Web</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                        <div className="item photography col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Build Indoo</h3>
                                    <span>Photography</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                        <div className="item branding col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Cocooil</h3>
                                    <span>Branding</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                        <div className="item design col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Nike Shoe</h3>
                                    <span>Design</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                        <div className="item photography col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Kitchen Sink</h3>
                                    <span>Photography</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                        <div className="item branding col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Amazon</h3>
                                    <span>brandingn</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                        <div className="item branding col-sm-6 col-md-4 col-lg-4 mb-4">
                            <a href="work-single.html" className="item-wrap fancybox">
                                <div className="work-info">
                                    <h3>Amazon</h3>
                                    <span>brandingn</span>
                                </div>
                                <img className="img-fluid" src="/assets/img/software.png" />
                            </a>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}