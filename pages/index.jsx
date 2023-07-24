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
import Head from 'next/head';


export async function getServerSideProps() {
  const dir = path.resolve(process.cwd(), "language.json")
  const language_json = JSON.parse(fs.readFileSync(dir).toString())
  let categories = []
  let works = []
  try {
    const res = await fetch(`${process.env.LOCAL_BASE_URL}/works/category`)
      .then((res) => res.json())
    categories = res.data;
    const works_res = await fetch(`${process.env.LOCAL_BASE_URL}/clients/works`)
      .then((res) => res.json())
    works = works_res.data
    setTimeout(() => {
      fetch(`${process.env.LOCAL_BASE_URL}/analytics/visitors`, {
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({
          path: "/"
        })
      })
    })
  } catch (error) {
    console.error(error)
  }
  return {
    props: {
      language_json,
      categories,
      works
    }
  }
}

export default function Home({ language_json, categories, works }) {
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
      <Head>

        {/* facebook meta tag */}
        <meta property="og:url" content="https://zulfikra.my.id" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="zulfikra.my.id" />
        <meta property="og:description" content="zulfikra.my.id merupakan website pribadi yang menyediakan informasi blog dan menyediakan jasa dibidang IT maupun Desain 3D" />
        <meta property="og:image" content="https://zulfikra-public-image.s3.us-east-005.backblazeb2.com/2023-06-27_12-09-transformed.png" />

        <meta name="description" content="zulfikra.my.id merupakan website pribadi yang menyediakan informasi blog dan menyediakan jasa dibidang IT maupun Desain 3D" />
        <meta name="keywords" content="HTML,CSS, javascript, ecmascript, php, node.js, next.js, nextjs, nodejs, postgresql, postgreSQL, CAD, Design, 3D Design" />
        <meta name="author" content="zulfikra l abdjul" />


      </Head>

      {/* <!-- ======= Navbar ======= --> */}

      <Navbar active={"home"} languageJson={languageJson} />
      <main id="main">


        <Works categories={categories} works={works} languageJson={languageJson} />

        {/* <!-- ======= Clients Section ======= --> */}
        {/* <section className="section">
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-5">
                <h3 className="h3 heading">My Clients</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit explicabo inventore.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4 col-sm-4 col-md-2">
                <a href="#" className="client-logo"><img src="assets/img/logo-adobe.png" alt="Image" className="img-fluid" /></a>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
                <a href="#" className="client-logo"><img src="assets/img/logo-uber.png" alt="Image" className="img-fluid" /></a>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
                <a href="#" className="client-logo"><img src="assets/img/logo-apple.png" alt="Image" className="img-fluid" /></a>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
                <a href="#" className="client-logo"><img src="assets/img/logo-netflix.png" alt="Image" className="img-fluid" /></a>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
                <a href="#" className="client-logo"><img src="assets/img/logo-nike.png" alt="Image" className="img-fluid" /></a>
              </div>
              <div className="col-4 col-sm-4 col-md-2">
                <a href="#" className="client-logo"><img src="assets/img/logo-google.png" alt="Image" className="img-fluid" /></a>
              </div>

            </div>
          </div>
        </section> */}
        {/* <!-- End Clients Section --> */}

        <Services languageJson={languageJson} />

      </main>
      {/* <!-- End #main --> */}

      {/* <!-- ======= Footer ======= --> */}
      <Footer />

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

    </div>
  )
}
