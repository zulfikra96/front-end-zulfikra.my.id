import React from "react"
import { useEffect, useState } from "react"
import fs from "fs"
import path from "path"
import { globalStore } from "../states/global.js"
import _, { isEmpty } from "lodash"
import Navbar from "./components/Navbar"
import Works from "./components/Works.jsx"
import Services from "./components/Services.jsx"
import Footer from "./components/Footer.jsx"

export async function getServerSideProps() {
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())
    setTimeout(async () => {
        const apify = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        fetch(`${process.env.LOCAL_BASE_URL}/analytics/visitors`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            path: "/service",
            ip:apify.ip
          })
        })
      })
    return {
        props: {
            language_json
        }
    }
}


export default function Service({ language_json }) {
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
            <Navbar languageJson={languageJson} active={"services"} />
            <main id="main">
                <section className="section">
                    <div className="container">
                        <div className="row mb-4 align-items-center">
                            <div className="col-md-6" data-aos="fade-up">

                                <h2>My Services</h2>
                                <p>{languageJson?.services[language].description}</p>

                            </div>

                        </div>
                    </div>

                    <div className="site-section pb-0 services">
                        <div className="container">
                            <div className="row">

                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
                                    <i className="bi bi-card-checklist"></i>
                                    <h4 className="h4 mb-2">{languageJson?.services[language].web_app.title}</h4>
                                    <p>{languageJson?.services[language].web_app.description}</p>
                                    <ul className="list-unstyled list-line">
                                        {languageJson?.services[language].web_app.products.map((e) => (
                                            <li key={e}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">
                                    <i className="bi bi-binoculars"></i>
                                    <h4 className="h4 mb-2">{languageJson?.services[language].cad.title}</h4>
                                    <p>{languageJson?.services?.[language].cad.description}</p>
                                    <ul className="list-unstyled list-line">
                                        {languageJson?.services?.[language].cad.products.map((e) => (
                                            <li key={e}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
                                    <i className="bi bi-brightness-high"></i>
                                    <h4 className="h4 mb-2">{languageJson?.services[language].diy.title}</h4>

                                    <p>{languageJson?.services?.[language].diy.description}</p>

                                    <ul className="list-unstyled list-line">
                                        {languageJson?.services?.[language].diy.products.map((e) => (
                                            <li key={e}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">
                                    <i className="bi bi-calendar4-week"></i>
                                    <h4 className="h4 mb-2">{languageJson?.services[language].diy.music}</h4>

                                    <p>{languageJson?.services?.[language].music.description}</p>

                                    
                                    <ul className="list-unstyled list-line">
                                        {languageJson?.services?.[language].music.products.map((e) => (
                                            <li key={e}>{e}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </main>
        </div>
    )
}