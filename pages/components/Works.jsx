import React from "react"
import Link from "next/link.js"
import { globalStore } from "../../states/global.js"

export default function Works({ languageJson, categories, works }) {
    const { language, chooseLanguage } = globalStore()

    return (
        <div>
            {/* <!-- ======= Works Section ======= --> */}
            <section className="section site-portfolio">
                <div className="container">
                    <div className="row mb-5 align-items-center">
                        <div className="col-md-12 col-lg-6 mb-4 mb-lg-0" data-aos="fade-up">
                            <h2>{languageJson?.about[language].hi}, {languageJson?.about[language].name}</h2>
                            {/* <p className="mb-0">Freelance Creative &amp; Professional Graphics Designer</p> */}
                        </div>
                        <div className="col-md-12 col-lg-6 text-start text-lg-end" data-aos="fade-up" data-aos-delay="100">
                            <div id="filters" className="filters">
                                <a href="#" data-filter="*" className="active">All</a>
                                {categories?.map((e) => (
                                    <a key={e.id} href="#" data-filter={`.${e.title.replace(/\s/g, "-").toLowerCase()}`}>{e.title}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="portfolio-grid" className="row no-gutter" data-aos="fade-up" data-aos-delay="200">
                        {works?.map((e) => (
                            <div key={e.id} className={`item ${e.category.replace(/\s/g, "-").toLowerCase()} col-sm-6 col-md-4 col-lg-4 mb-4`}>
                                <Link href={"/works/" + e.id} className="item-wrap fancybox">
                                    <div className="work-info">
                                        <h3>{e.title}</h3>
                                        <span>{e.category}</span>
                                    </div>
                                    <div style={{ height: "230px" }} className="overflow-hidden">
                                        <img className="img-fluid" src={e.image_cover} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- End  Works Section --> */}
        </div>
    )
}