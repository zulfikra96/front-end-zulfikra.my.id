import React from "react";
import { useEffect, useRef, useState } from "react";
import { categoryStores } from "../../../states/Categories";


export default function NavbarBlog({ base_url }) {
    const [showSearch, setShowSearch] = useState(false)
    const searchRef = useRef(null)
    const { categories, getClientCategories } = categoryStores()

    useEffect(() => {
        (async () => {
            await getClientCategories(base_url)
            
        })()
    },[])
    return (
        <div className="bg-dark d-flex flex-row  p-2  mb-2 justify-content-between">
            <div className="d-flex col-md-6 ">
                <div className={`${(showSearch) ? 'd-none' : 'd-flex'} flex-row gap-2 `} style={{paddingTop:6}}>
                    {categories.map((e) => (
                        <span key={e.name}><a href={`/blogs/category/${e.name}`}>{e.name}</a></span>
                    ))}
                </div>
                <div hidden={showSearch === false} className="col-md-8 position-relative overflow-hidden">
                    <input onChange={(e) => {
                        // console.log()
                    }} ref={searchRef} type="text" style={{ backgroundColor: "transparent", width: "100%", border: "none", outline: "none", color: "#A2FF86" }} />
                </div>
            </div>
            <div className="d-flex ">
                <button onClick={() => {
                    setTimeout(() => {
                        if(searchRef.current.value === ""){
                            searchRef.current.focus()
                        }else {
                            window.location.href = "/blogs/search?s=" + searchRef.current.value
                        }
                    }, 200)

                    if (showSearch) {
                        setShowSearch(false)
                    } else {
                        setShowSearch(true)
                    }
                }} className="btn btn-green ">
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>
    )
}