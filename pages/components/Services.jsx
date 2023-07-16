import { globalStore } from "../../states/global.js"


export default function Services({ languageJson }) {
  const { language, chooseLanguage } = globalStore()

    return (
        <div>
            {/* <!-- ======= Services Section ======= --> */}
            <section className="section services">
                <div className="container">
                    <div className="row justify-content-center text-center mb-4">
                        <div className="col-5">
                            <h3 className="h3 heading "><strong>{languageJson?.service[language].my_service}</strong></h3>
                            <p>{languageJson?.service[language].description}</p>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <i className="bi bi-globe-americas"></i>
                            <h4 className="h4 mb-2"><strong>{languageJson?.service[language].web_app.title}</strong></h4>
                            <p>{languageJson?.service[language].web_app.description}</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <i className="bi bi-phone"></i>
                            <h4 className="h4 mb-2"><strong>{languageJson?.service[language].mobile_app.title}</strong></h4>
                            <p>{languageJson?.service[language].mobile_app.description}</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <i className="bi bi-rulers"></i>
                            <h4 className="h4 mb-2"><strong>{languageJson?.service[language].cad.title}</strong></h4>
                            <p>{languageJson?.service[language].cad.description}</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <i className="bi bi-tools"></i>
                            <h4 className="h4 mb-2"><strong>{languageJson?.service[language].diy.title}</strong></h4>
                            <p>{languageJson?.service[language].diy.description}</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Services Section --> */}
        </div>
    )
}