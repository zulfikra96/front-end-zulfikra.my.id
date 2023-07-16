import React from "react"
import { useEffect } from "react"
import { globalStore } from "../../states/global"
import Swal from "sweetalert2"
import { isEmpty } from "lodash"
import { userStore } from "../../states/Users"
import { redirect, useRouter } from "next/navigation"
/**
 * 
 * @param {SubmitEvent} e 
 */
async function postLogin(e, base_url, callback) {
    e.preventDefault()
    const user = {
        email:e.currentTarget[0].value,
        password: e.currentTarget[1].value,
        role:"ADMIN"
    }
    if(isEmpty(user.email)) throw Swal.fire({
        text:"Email can not be empty",
        title:"Opss!",
        icon:"error"
    })
    if(isEmpty(user.password)) throw Swal.fire({
        text:"Password can not be empty",
        title:"Opss!",
        icon:"error"
    })
    try {
        const res = await fetch(`${base_url}/api/auth/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then((res) => res.json())
        if(res.status_code !== 200) throw res.message
        return callback(res);
    } catch (error) {
        console.error(error)
        throw Swal.fire({
            icon:"error",
            text:error
        })
    }
}

export function getStaticProps() {

    return {
        props: {
            base_url: process.env.BASE_URL
        }
    }
}



export default function Login({ base_url }) {
    const { setBaseUrl } = globalStore()
    const { setSession } = userStore()
    const { push } = useRouter()
    
    useEffect(() => {
        setBaseUrl(base_url)
    }, [base_url])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 offset-md-3" style={{ marginTop: "20em" }}>
                    <div className="card p-4 bg-light">
                        <form action="" onSubmit={(e) => postLogin(e, base_url, (args) => {
                            setSession(args?.data);
                            return push("/@admin/dashboard")
                        })}>
                            <label htmlFor="">Email</label>
                            <input name="email" type="text" className="form-control" placeholder="Your Email" />
                            <label htmlFor="">Password</label>
                            <input name="password" type="password" className="form-control" placeholder="Your Email" />
                            <div className="col">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}