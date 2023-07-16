import React from "react";
import AdminMain from "../components/Main";
import Sidebar from "../components/Sidebar";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import Swal from "sweetalert2";
import { globalStore } from "../../../states/global";
import { userStore } from "../../../states/Users";
import { categoryStores } from "../../../states/Categories";
import Notfound from "../../notfound";
import draftToHtml from "draftjs-to-html"
import { worksState } from "../../../states/Works";

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

/**
 * 
 * @param {SubmitEvent} e 
 * @param {*} callback 
 */
async function postWorks(e, description, base_url, token, callback) {
    e.preventDefault()
    const data = {
        title: e.target[0].value,
        works_category_id: e.target[1].value,
        image_cover: e.target[3].value,
        description: description,
        is_posted: /true/.test(e.target[4].value)
    }
    try {
        Swal.showLoading()
        const res = await fetch(`${base_url}/works`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
        if (res.status_code !== 200) throw res.message
        Swal.fire({
            toast: true,
            title: "Sukses",
            text: res.message
        })
        return callback()

    } catch (error) {
        console.error(error)
        throw Swal.fire({
            icon: "error",
            text: error
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

export default function CreateWorks({ base_url }) {
    const [editorState, onEditorStateChange] = useState(EditorState.createEmpty())
    const { session } = userStore()
    const { categories, getCategories } = categoryStores()
    const [_categories, setCategories] = useState([])
    const [_session, setSession] = useState(null)
    const [is_posted, setIsPosted] = useState(false)
    const { works_categories, getWorksCategories } = worksState()
    useEffect(() => {
        setSession(session);
        (async () => {
            if (_categories.length === 0 || _categories.length !== works_categories.length) {
                getWorksCategories(base_url, session?.token)
                setCategories(works_categories)
            }

        })()
    }, [worksState.getState().works_categories])
    if (_session?.role !== "ADMIN") {
        return <Notfound />
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar active={"works"} />
                    <AdminMain>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            // console.log(convertToRaw(editorState.getCurrentContent()))
                            postWorks(e, draftToHtml(convertToRaw(editorState.getCurrentContent())), base_url, session?.token, () => {

                            })
                        }}>
                            <div className="container-fluid bg-white mt-4 p-4 text-dark">
                                <div className="form-group mb-4">
                                    <label htmlFor="">Judul Works</label>
                                    <input required placeholder="Judul" type="text" className="form-control " />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="">Kategori</label>
                                    <div className="d-flex gap-2">
                                        <select required name="" id="" className="form-control">
                                            <option value=""></option>
                                            {_categories.map((e) => (
                                                <option key={e.id} value={e.id}>{e.title} </option>
                                            ))}
                                        </select>
                                        <button onClick={() => {
                                            Swal.fire({
                                                title: "Kategori Baru",
                                                icon: "question",
                                                input: "text",
                                            }).then(async (res) => {
                                                if (res.isConfirmed) {
                                                    try {
                                                        const _res = await fetch(`${base_url}/works/category`, {
                                                            method: "POST",
                                                            headers: {
                                                                "content-type": "application/json",
                                                                "Authorization": "Bearer " + _session.token
                                                            },
                                                            body: JSON.stringify({
                                                                name: res.value
                                                            })
                                                        }).then((res) => res.json())
                                                        if (_res.status_code !== 200) throw _res.message
                                                        await getWorksCategories(base_url, session?.token)
                                                        setCategories(worksState.getState().works_categories)
                                                    } catch (error) {
                                                        console.error(error)
                                                        Swal.fire({
                                                            icon: "error",
                                                            text: error
                                                        })
                                                    }
                                                }
                                            })
                                        }} className="btn btn-secondary">Tambah Kategori</button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Gambar Sampul</label>
                                    <input required type="text" placeholder="Link Gambar" className="form-control" />
                                </div>
                                <Editor
                                    editorStyle={{ height: "20em" }}
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                />
                                <input type="hidden" value={is_posted} />
                                <div className="d-flex gap-2">
                                    <button type="submit" onClick={(e) => {
                                        setIsPosted(false)
                                    }} className="btn btn-primary">Simpan</button>
                                    <button type="submit" onClick={(e) => {
                                        setIsPosted(true)
                                    }} className="btn btn-secondary">Publis</button>
                                </div>
                            </div>
                        </form>

                    </AdminMain>
                </div>
            </div>
        </div>
    )
}