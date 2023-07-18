import React, { useEffect, useState } from "react"
import Link from "next/link"
import Sidebar from "../components/Sidebar"
import AdminMain from "../components/Main"
import Breadcrumb from "../components/Breadcrumb"
import { userStore } from "../../../states/Users"
import Notfound from "../../notfound"
import { worksState } from "../../../states/Works"


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
    const { works, getWorks } = worksState()
    const [page, setPage] = useState(1)
    useEffect(() => {
        setSession(session);
        (async () => {
            await getWorks(base_url, session?.token, page)
        })()
    }, [])
    if (_session?.role !== "ADMIN") {
        return <Notfound />
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar active={"works"} />
                    <AdminMain>
                        <div className="container-fluid bg-white text-dark mt-4 p-4">
                            <h4>Works</h4>
                            <div className="d-flex justify-content-between">
                                <Breadcrumb title={"Works"} />
                                <button className="btn btn-primary"><Link href={"/@admin/works/create"}>Buat</Link></button>
                            </div>
                            <table className="table table-hover bg-light">
                                <thead>
                                    <tr>
                                        <th>Judul</th>
                                        <th>Kategori</th>
                                        <th>Dibuat Pada Tanggal</th>
                                        <th>Status Posting</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {works?.map((e) => (
                                        <tr key={e.id}>
                                            <td>{e.title}</td>
                                            <td>{e.category}</td>
                                            <td>{e.created_at}</td>

                                            <td>
                                                <select onChange={async (_e) => await updateBlogStatus(e.id, _e.currentTarget.value, _session.token, base_url)} defaultValue={e.is_posted} className="form-control" name="" id="">
                                                    <option value={true}>Dipublis</option>
                                                    <option value={false}>Disimpan</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-secondary"><Link href={`/@admin/works/${e.id}/edit`}>Edit</Link></button>
                                                    <button className="btn btn-danger">Hapus</button>
                                                </div>
                                            </td>
                                            <td></td>
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