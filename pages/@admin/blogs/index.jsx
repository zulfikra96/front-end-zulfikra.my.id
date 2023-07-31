import React, { useEffect, useState } from "react"
import Link from "next/link"
import Sidebar from "../components/Sidebar"
import AdminMain from "../components/Main"
import Breadcrumb from "../components/Breadcrumb"
import { userStore } from "../../../states/Users"
import Notfound from "../../notfound"
import { blogStore } from "../../../states/Blogs"


export function getStaticProps() {
    return {
        props: {
            base_url: process.env.BASE_URL
        }
    }
}

export default function Blogs({ base_url }) {
    const { session } = userStore()
    const [_session, setSession] = useState(null)
    const { blogs, getBlogs, updateBlogStatus, updateBlogEditorChoice } = blogStore()
    const [page, setPage] = useState(1)
    useEffect(() => {
        setSession(session);
        (async () => {
            await getBlogs(base_url, session?.token, page)
        })()
    }, [])
    if (_session?.role !== "ADMIN") {
        return <Notfound />
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar active={"blog"} />
                    <AdminMain>
                        <div className="container-fluid bg-white text-dark mt-4 p-4">
                            <h4>Blog</h4>
                            <div className="d-flex justify-content-between">
                                <Breadcrumb />
                                <button className="btn btn-primary"><Link href={"/@admin/blogs/create"}>Buat</Link></button>
                            </div>
                            <table className="table table-hover bg-light">
                                <thead>
                                    <tr>
                                        <th>Judul</th>
                                        <th>Kategori</th>
                                        <th>Tag</th>
                                        <th>Status</th>
                                        <th>Pilihan Editor</th>
                                        <th>Dibuat Pada Tanggal</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs?.map((e) => (
                                        <tr key={e.id}>
                                            <td>{e.title}</td>
                                            <td>{e.name}</td>
                                            <td>{e.tags?.map((e) => (e.name + ", "))}</td>
                                            <td>
                                                <select onChange={async (_e) => await updateBlogStatus(e.id, _e.currentTarget.value, _session.token, base_url)} defaultValue={e.is_posted} className="form-control" name="" id="">
                                                    <option value={true}>Dipublis</option>
                                                    <option value={false}>Disimpan</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input defaultChecked={e.editor_choice} onChange={(_e) => updateBlogEditorChoice(e.id, _e.currentTarget.checked, _session.token, base_url)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label  className="form-check-label" htmlFor="flexCheckDefault">
                                                        Pilih
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{e.created_at}</td>
                                            <td>
                                                <button className="btn btn-primary"><Link href={`/@admin/blogs/${e.id}/edit`}>Update</Link></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AdminMain>
                </div>
            </div>
        </div>
    )
}