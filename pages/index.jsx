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
  const dir = path.resolve(process.cwd(),"language.json")
  const language_json = JSON.parse(fs.readFileSync(dir).toString())
 
  return {
    props:{
      language_json
    }
  }
}

export default function Home({ language_json }) {
  const { language, chooseLanguage } = globalStore()
  const [languageJson, setLanguageJson] = useState()
  useEffect(() => {
    // console.log(language === "")
    setLanguageJson(language_json);
    if (isEmpty(language)) {
      chooseLanguage("indonesia");
    }

  },[])
  return (
    <div>
      {/* <!-- ======= Navbar ======= --> */}
      
      <Navbar active={"home"} languageJson={languageJson}/>
      <main id="main">

       
        <Works languageJson={languageJson}/>

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

        <Services languageJson={languageJson}/>

      </main>
      {/* <!-- End #main --> */}

      {/* <!-- ======= Footer ======= --> */}
      <Footer/>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

    </div>
  )
}
