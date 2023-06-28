import { useEffect, useRef, useState } from "react";
import { globalStore } from "../../states/global";
import { isEmpty } from "lodash";
import Script from "next/script"
import Navbar from "../components/Navbar";
import fs from "fs"
import path from "path"
import Footer from "../components/Footer"
import NavbarBlog from "./components/Navbar";
import MostRead from "./components/MostRead";


export async function getServerSideProps() {
    // console.log(language_json)
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
    // console.log(typeof language_json)
    // console.log(dir)
    return {
        props: {
            language_json
        }
    }
}

export default function Blogs({ language_json }) {
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
                    <NavbarBlog/>
                    <div className="">

                    </div>
                    <div className="d-flex gap-2 mb-4">
                        {/* Banner blog */}
                        <div className="swiper-blog overflow-hidden col-md-6">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide slider-blog ">
                                    <img className="darken-image" src="assets/img/zulfikra-lahmudin.jpg" alt="" />
                                    <div className="position-absolute bottom-0 p-2">
                                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus eos, inventore amet nesciunt impedit expedita earum qui odio tempora. Temporibus voluptatem deserunt accusantium tempore nostrum ipsam accusamus enim rerum esse?</span>

                                    </div>
                                </div>
                                <div className="swiper-slide slider-blog" style={{ width: "200px" }}>
                                    <img src="assets/img/zulfikra-lahmudin.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        {/* editor choice */}
                        <div className="d-flex flex-column col-md-6">
                            <div className="d-flex flex-row gap-2 mb-2">
                                <div className="img col-md-1">
                                    <img className="img-fluid" src="/assets/img/zulfikra-lahmudin.jpg" alt="" />
                                </div>
                                <div className="content col-md-10">
                                    <span>Hebohnya kurban 2023</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-2 mb-2">
                                <div className="img col-md-1">
                                    <img className="img-fluid" src="/assets/img/zulfikra-lahmudin.jpg" alt="" />
                                </div>
                                <div className="content col-md-10">
                                    <span>Kemeriahan malam pasang lampu di bolaang mongondow</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-2 mb-2">
                                <div className="img col-md-1">
                                    <img className="img-fluid" src="/assets/img/zulfikra-lahmudin.jpg" alt="" />
                                </div>
                                <div className="content col-md-10">
                                    <span>Hebohnya kurban 2023</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-2 mb-2">
                                <div className="img col-md-1">
                                    <img className="img-fluid" src="/assets/img/zulfikra-lahmudin.jpg" alt="" />
                                </div>
                                <div className="content col-md-10">
                                    <span>Kemeriahan malam pasang lampu di bolaang mongondow</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="d-flex col-md-8 flex-wrap ">
                            <div className="d-flex">
                                <h4><strong>Terbaru</strong></h4>
                            </div>
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
                        <MostRead/>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}