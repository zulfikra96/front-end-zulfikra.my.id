import React from "react"
import Link from "next/link"

export default function Sidebar({ active}) {
    return (
        <div className="col-md-2 bg-light text-dark" >
            <ul className="list-group list-group-flush bg-light " style={{ backgroundColor: "white", height: "100vh" }}>
                <li className={`list-group-item ${(active === "dashboard") ? "active" : ""}`}><Link href={"/@admin/dashboard"}>Dashboard</Link></li>
                <li className={`list-group-item ${(active === "blog") ? "active" : ""}`}><Link href={"/@admin/blogs"}>Blog</Link></li>
                <li className={`list-group-item ${(active === "works") ? "active" : ""}`}><Link href={"/@admin/works"}>Works</Link></li>
                <li className={`list-group-item ${(active === "contact") ? "active" : ""}`}>Contact</li>
                <li className="list-group-item">Logout</li>
            </ul>
        </div>
    )
}