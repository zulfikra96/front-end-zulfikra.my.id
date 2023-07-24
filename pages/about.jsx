import React from "react"
import Navbar from "./components/Navbar"
import Image from "next/image"
import { globalStore } from "../states/global.js"
import path from "path"
import fs from "fs"
import { useState, useEffect } from "react"
import _, { isEmpty } from "lodash"
export async function getServerSideProps() {
    // console.log(language_json)
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
    setTimeout(() => {
        fetch(`${process.env.LOCAL_BASE_URL}/analytics/visitors`, {
          method: "POST",
          headers:{
            "Content-type":"application/json"
          },
          body: JSON.stringify({
            path: "/about"
          })
        })
      })
    return {
        props: {
            language_json
        }
    }
}

export default function About({ language_json }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    useEffect(() => {
        // console.log(language === "")
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }

    }, [])
    return (
        <div>
            <Navbar active={"about"} languageJson={languageJson} />

            <main id="main">
                <section className="section pb-5">
                    <div className="container">
                        <div className="row mb-5 align-items-end">
                            <div className="col-md-6" data-aos="fade-up">

                                <h2>{languageJson?.about_me[language].about}</h2>
                                <p className="mb-0">{languageJson?.about_me[language].description}</p>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-4 ml-auto order-2" data-aos="fade-up">
                                <h3 className="h3 mb-4">Skills</h3>
                                <ul className="list-unstyled">
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Node.js</strong>
                                            <span className="ml-4">9/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Express.js</strong>
                                            <span className="ml-auto">9/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="96" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>HTML5/CSS3</strong>
                                            <span className="ml-auto">7/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Next.js</strong>
                                            <span className="ml-auto ">7/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>React Native</strong>
                                            <span className="ml-auto ">8/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>React</strong>
                                            <span className="ml-auto">8/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Socket.IO</strong>
                                            <span className="ml-auto">9/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>PostgreSQL</strong>
                                            <span className="ml-auto">8/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>MongoDB</strong>
                                            <span className="ml-auto">7/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Prisma ORM</strong>
                                            <span className="ml-auto">7/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Linux Ubuntu / Debian</strong>
                                            <span className="ml-auto">8/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Nginx</strong>
                                            <span className="ml-auto">7/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li className="mb-3">
                                        <div className="d-flex mb-1 justify-content-between">
                                            <strong>Figma</strong>
                                            <span className="ml-auto">7/10</span>
                                        </div>
                                        <div className="progress custom-progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-7 mb-5 mb-md-0" data-aos="fade-up">
                                <div className="row">
                                    <div className="img-fluid justify-content-center mb-4 col-lg-6" >
                                        <img className="col-12 co-md-6" src={"/assets/img/zulfikra-lahmudin.jpg"} />
                                    </div>
                                    <div className="row mb-4">
                                        <h4><strong>Work Experience</strong></h4>
                                        <div className="d-flex flex-column mb-2">
                                            <p className="mb-0"><strong>Senior Software Engineer</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>Qwork.my - Malaysia</i></span>
                                                <span>Mar 2020 - Present</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="mb-0"><strong>Part Time Mobile Developer</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>Qwork.my - Malaysia</i></span>
                                                <span>Jan 2020 - Mar 2020</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="mb-0"><strong>Android Developer</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>Zevitsoft - Yogyakarta, Indonesia</i></span>
                                                <span>Nov 2019 - Feb 2020</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="mb-0"><strong>Software Developer</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>PT. Cross Network Indonesia - Surabaya, East Java, Indonesia</i></span>
                                                <span>Dec 2017 - Sep 2019</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="mb-0"><strong>Junior Software Developer</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>PT. Get Dekor Indonesia, Sidoarjo, East Java, Indonesia</i></span>
                                                <span>Feb 2017 - Mar 2017</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <h4><strong>Education</strong></h4>
                                        <div className="d-flex flex-column mb-2">
                                            <p className="mb-0"><strong>Universitas 17 Agustus 1945 Surabaya</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>Bachelor's degree Computer Science & Informatic engineering</i></span>
                                                <span>2014-2019, Grade 3,21</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="mb-0"><strong>SMK Negeri 3 Gorontalo , Vacational High School of 3 Gorontalo</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>Senior High School, Electronic Engineering</i></span>
                                                <span>2011-2014</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h4><strong>Licenses & certificates</strong></h4>
                                        <div className="d-flex flex-column mb-2">
                                            <p className="mb-0"><strong>Make Your Application - Android Training</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>University of 17 Agustus 1945 Surabaya</i></span>
                                                <span>Credential ID 77/AT/2015 - 2015</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <p className="mb-0"><strong>Certificate of competency of electronics engineering</strong></p>
                                            <div className="d-flex flex-column">
                                                <span><i>State Vocational school 3 of Gorontalo</i></span>
                                                <span>Credential ID 01.003.c.1174. 204-5 - 2015</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p><a href="#" class="readmore">Download my CV</a></p> */}
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </div>
    )
}