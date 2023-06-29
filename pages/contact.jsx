import Navbar from "./components/Navbar";
import path from "path"
import fs from "fs"
import { globalStore } from "../states/global";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
export async function getServerSideProps() {
    const dir = path.resolve(process.cwd(), "language.json")
    const language_json = JSON.parse(fs.readFileSync(dir).toString())

    return {
        props: {
            language_json
        }
    }
}

export default function Contact({ language_json }) {
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
            <Navbar active={"contact"} languageJson={languageJson} />
            <main id="main">
                <main id="main">

                    <section className="section pb-5">
                        <div className="container">

                            <div className="row mb-5 align-items-end">
                                <div className="col-md-6" data-aos="fade-up">
                                    <h2>{languageJson?.contact[language].contact}</h2>
                                    {/* <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut
                                        officiis explicabo inventore.
                                    </p> */}
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-5 mb-md-0" data-aos="fade-up">

                                    <form action="forms/contact.php" method="post" role="form" className="php-email-form">

                                        <div className="row gy-3">
                                            <div className="col-md-6 form-group">
                                                <label for="name">{languageJson?.contact[language].form.name}</label>
                                                <input type="text" name="name" className="form-control" id="name" required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label for="name">{languageJson?.contact[language].form.email}</label>
                                                <input type="email" className="form-control" name="email" id="email" required />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label for="name">Subject</label>
                                                <input type="text" className="form-control" name="subject" id="subject" required />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label for="name">{languageJson?.contact[language].form.message}</label>
                                                <textarea className="form-control" name="message" cols="30" rows="10" required></textarea>
                                            </div>

                                            <div className="col-md-12 my-3">
                                                <div className="loading">{languageJson?.contact[language].form.name}</div>
                                                <div className="error-message"></div>
                                                <div className="sent-message">Your message has been sent. Thank you!</div>
                                            </div>

                                            <div className="col-md-6 mt-0 form-group">
                                                <input type="submit" className="readmore d-block w-100" value={languageJson?.contact[language].form.send_message} />
                                            </div>
                                        </div>

                                    </form>

                                </div>

                                <div className="col-md-4 ml-auto order-2" data-aos="fade-up">
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <strong className="d-block mb-1">{languageJson?.contact[language].form.address}</strong>
                                            <span>Perum Pulubala blok D depan no 63, Jl. Dahlia, Kota tengah, Kota Gorontalo, Provinsi Gorontalo</span>
                                        </li>
                                        <li className="mb-3">
                                            <strong className="d-block mb-1">{languageJson?.contact[language].form.phone}</strong>
                                            <span>+62 851 5661 4335</span>
                                        </li>
                                        <li className="mb-3">
                                            <strong className="d-block mb-1">Email</strong>
                                            <span>zulfikralahmudin@gmail.com</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>

                    </section>

                </main>
            </main>
        </div>
    )
}