import { useEffect, useRef, useState } from "react";
import { globalStore } from "../../states/global";
import { isEmpty } from "lodash";
import Navbar from "../components/Navbar";
import fs from "fs"
import path from "path"
import Footer from "../components/Footer"
import NavbarBlog from "./components/Navbar";
import MostRead from "./components/MostRead";

export async function getServerSideProps() {

    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())

    return {
        props: {
            language_json
        }
    }
}

export default function Search({ language_json }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    const [showSearch, setShowSearch] = useState(false)
    const searchRef = useRef(null)
    useEffect(() => {
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
        (() => {
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
        })()

    }, [])
    return (
        <div>
            <Navbar active={"blog"} languageJson={languageJson} />
            <main id="main">
                <div className="container">
                    <NavbarBlog />
                    <div className="d-flex flex-column">
                        <div className="d-flex ">
                            <span><strong>Hasil Pencarian : </strong> Belajar Koding</span>
                        </div>

                    </div>
                    <div className="row p-0">
                        
                            <div className="d-flex col-md-8 flex-wrap ">
                                <div className="d-flex flex-wrap">
                                    <div className="d-flex col-md-6 pe-2 ">
                                        <div style={{ width: "100%", height: "320px" }} className="blog-item bg-dark d-flex flex-column overflow-hidden position-relative ">
                                            <img className="img-fluid darken-img" src="/assets/img/zulfikra-lahmudin.jpg" alt="" />
                                            <div className="position-absolute bottom-0 p-2">
                                                <span className="text-white">hello world</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex col-md-6 pe-2 ">
                                        <div style={{ width: "100%", height: "320px", }} className="blog-item bg-dark d-flex flex-column overflow-hidden position-relative ">
                                            <img className="darken-img" src="/assets/img/zulfikra-lahmudin.jpg" alt="" />
                                            <div className="position-absolute bottom-0 p-2">
                                                <span className="text-white">hello world</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        <MostRead />
                    </div>
                </div>
            </main>
        </div>
    )
}