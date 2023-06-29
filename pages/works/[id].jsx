import Navbar from "../components/Navbar";

export default function Detail() {
    return (
        <div>
            <Navbar />
            <main id="main">

                <section className="section">


                    <div className="site-section pb-0">
                        <div className="container">
                            <div className="row align-items-stretch">
                                <div className="col-md-8" data-aos="fade-up">
                                    <div className="col-md-12 mb-4">
                                        <img src="/assets/img/software.png" alt="Image" className="img-fluid" />
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <img src="/assets/img/software.png" alt="Image" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-md-3 ml-auto" data-aos="fade-up" data-aos-delay="100">
                                    <div className="sticky-content">
                                        <h3 className="h3">Aplikasi Kasir</h3>
                                        <p className="mb-4"><span className="text-muted">Design</span></p>

                                        <div className="mb-5">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores illo, id recusandae molestias
                                                illum unde pariatur, enim tempora.</p>

                                        </div>

                                        <h4 className="h4 mb-3">What I did</h4>
                                        <ul className="list-unstyled list-line mb-5">
                                            <li>Design</li>
                                            <li>HTML5/CSS3</li>
                                            <li>CMS</li>
                                            <li>Logo</li>
                                        </ul>

                                        <p><a href="#" className="readmore">Visit Website</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}