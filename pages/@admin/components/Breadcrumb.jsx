import React from "react"
export default function Breadcrumb({ title }) {
    return (
        <nav  aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><a href="#">{title}</a></li>
            </ol>
        </nav>
    )
}