import React from "react"
export default function Author() {
    return (
        <div style={{marginTop:"10em"}} className="container">
            <div className="row">
                <div style={{borderRadius:0}} className="card col-md-6 p-4  mb-5 bg-light">
                    <div className="row">
                        <div className="col-md-8">
                            <h5><strong>Zulfikra L Abdjul</strong></h5>
                            <span>seorang ayah dari 1 anak dan seorang suami dari keluarga kecil yang senang belajar hal baru. Seorang programmer, senang bermain musik instrument apapun dan juga senang dengan desain visual</span>
                            <br /><br />
                            <span>Software engineer di <a className="text-dark" href="https://qwork.my">Qwork.my</a></span>
                            <br />
                            <span>Sound Engineer di <strong>ZIF Studio</strong></span>
                            <br />
                            <br />
                            <span><strong>Support Me</strong></span>
                            <div className="row pt-2">
                                <div className="col-md-4">
                                    <a href="https://saweria.co/zulfikra"><img className="img-fluid" src="/assets/img/sawer.png" alt="" /></a>
                                </div>
                                <div className="col-md-4">
                                    <a href="teer.id/zulfikra"><img className="img-fluid" src="/assets/img/trakteer.png" alt="" /></a>
                                </div>
                                <div className="col-md-4">
                                    <a href="https://www.buymeacoffee.com/zulfikra"><img className="img-fluid" src="/assets/img/buy-me-coffee.png" alt="" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={"/assets/img/zulfikra-lahmudin.jpg"} className="img-thumbnail" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}