import React from "react"
import Link from "next/link"
import Sidebar from "./components/Sidebar"
import AdminMain from "./components/Main"
export default function Dashboard() {
    return (
        <div id="main">
            <div className="container-fuild">
                <Sidebar active={"dashboard"}/>
                <AdminMain>
                    <div className="container bg-light">
                        
                    </div>
                </AdminMain>
            </div>
        </div>
    )
}