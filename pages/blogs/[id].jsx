import Navbar from "../components/Navbar";
import fs from "fs";
import path from "path";
import { globalStore } from "../../states/global";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
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

export default function Detail({ language_json }) {
    const { language, chooseLanguage } = globalStore()
    const [languageJson, setLanguageJson] = useState()
    useEffect(() => {
        setLanguageJson(language_json);
        if (isEmpty(language)) {
            chooseLanguage("indonesia");
        }
    })
    return (
        <div>
            <Navbar active={"blog"} languageJson={languageJson} />
            <main id="main">
                <div className="container">
                    <NavbarBlog />
                    <div className="row">
                        <div className="d-flex col-md-8">
                            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, sint. Neque dicta quaerat, ab delectus id pariatur voluptatibus, dolorem illum adipisci ut doloribus earum quos? Repellendus dolore dicta magni facilis?</span>
                        </div>
                        <MostRead/>
                    </div>
                </div>
            </main>
        </div>
    )
}