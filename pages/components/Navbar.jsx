import React from "react"
import { globalStore } from "../../states/global.js"
import Link from "next/link"
import Images from "next/image"

export default function Navbar({ languageJson, active }) {
    const { language, chooseLanguage } = globalStore()

    return (
        <div>
            <div className="collapse navbar-collapse custom-navmenu" id="main-navbar">
                <div className="container py-2 py-md-5">
                    <div className="row align-items-start">
                        <div className="col-md-2">
                            <ul className="custom-menu">
                                <li className={(active === 'home') ? 'active' : ''}><a href="/">{languageJson?.navbar[language]?.home}</a></li>
                                <li className={(active === 'blog') ? 'active' : ''}><Link href="/blogs">{languageJson?.navbar[language]?.blog}</Link></li>
                                <li className={(active === 'about') ? 'active' : ''}><Link href="/about">{languageJson?.navbar[language]?.about}</Link></li>
                                <li className={(active === 'services') ? 'active' : ''}><Link href="/service">{languageJson?.navbar[language]?.services}</Link></li>
                                <li className={(active === 'works') ? 'active' : ''}><Link href="/works">{languageJson?.navbar[language]?.works}</Link></li>
                                <li className={(active === 'contact') ? 'active' : ''}><Link href="/contact">{languageJson?.navbar[language]?.contact}</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-8 d-none d-md-block">
                            <h3>{languageJson?.hire[language]?.hire_me}</h3>
                            <p>{languageJson?.hire[language]?.description} <br /> <a href="#">zulfikralahmudin@gmail.com</a></p>
                        </div>
                        <div className="col-md-2 ">
                            <select onChange={(value) => chooseLanguage(value.currentTarget.value)} value={language} className="form-select" aria-label="Default select example">
                                <option value="indonesia">Indonesia</option>
                                <option value="english">English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-light custom-navbar">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <div style={{ width: "200px", height: "100px", position:"relative" }}>
                            <Images fill src={"/assets/img/zulfikra.png"} />
                        </div>
                    </a>
                    <a href="#" className="burger" data-bs-toggle="collapse" data-bs-target="#main-navbar">
                        <span></span>
                    </a>
                </div>
            </nav>
        </div>
    )
}