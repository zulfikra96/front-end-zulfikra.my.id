import { useEffect, useRef, useState } from "react";

export default function NavbarBlog() {
    const [showSearch, setShowSearch] = useState(false)
    const searchRef = useRef(null)
    return (
        <div className="bg-dark d-flex flex-row  p-2  mb-2 justify-content-between">
            <div className="d-flex col-md-6 ">
                <div className={`${(showSearch) ? 'd-none' : 'd-flex'} flex-row gap-2 `} style={{paddingTop:6}}>
                    <span><a href="">Teknologi</a></span>
                    <span><a href="">Hiburan</a></span>
                    <span><a href="">Informasi</a></span>
                    <span><a href="">Berita</a></span>
                </div>
                <div hidden={showSearch === false} className="col-md-8 position-relative overflow-hidden">
                    <input ref={searchRef} type="text" style={{ backgroundColor: "transparent", width: "100%", border: "none", outline: "none", color: "#A2FF86" }} />
                </div>
            </div>
            <div className="d-flex ">
                <button onClick={() => {
                    setTimeout(() => {
                        searchRef.current.focus()
                    }, 200)

                    if (showSearch) {
                        setShowSearch(false)
                    } else {
                        setShowSearch(true)
                    }
                }} className="btn btn-green ">
                    <i class="bi bi-search"></i>
                </button>
            </div>
        </div>
    )
}