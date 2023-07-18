import React from "react";
import AdminMain from "../../components/Main";
import Sidebar from "../../components/Sidebar";
import { ContentState, EditorState, convertFromHTML, convertFromRaw, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import Swal from "sweetalert2";
// import { globalStore } from "../../../states/global";
import { userStore } from "../../../../states/Users";
import { categoryStores } from "../../../../states/Categories";
import Notfound from "../../../notfound";
import draftToHtml from "draftjs-to-html"
import { worksState } from "../../../../states/Works";
import{ useRouter } from "next/navigation"

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

/**
 * 
 * @param {SubmitEvent} e 
 * @param {*} callback 
 */
async function uptadeWorks(id, e, description, base_url, token, callback) {
    e.preventDefault()
    const data = {
        title: e.target[0].value,
        works_category_id: e.target[1].value,
        image_cover: e.target[3].value,
        meta_keywords: e.target[4].value,
        meta_description: e.target[5].value,
        tools: e.target[6].value,
        description: description,
        is_posted: /true/.test(e.target[7].value)
    }

    try {
        Swal.showLoading()
        const res = await fetch(`${base_url}/works/${id}`, {
            method: "PUT",
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

export async function getStaticProps(context) {
    return {
        props: {
            base_url: process.env.BASE_URL,
            id: context.params.id
        }
    }
}

export default function EditWorks({ base_url, id }) {
    const [editorState, onEditorStateChange] = useState(EditorState.createEmpty())
    const { session } = userStore()
    const { categories, getCategories } = categoryStores()
    const [_categories, setCategories] = useState([])
    const [_session, setSession] = useState(null)
    const [is_posted, setIsPosted] = useState(false)
    const { works_categories, getWorksCategories, getWorksDetail, works_detail } = worksState()
    const { push } = useRouter();
    useEffect(() => {
        setSession(session);
        (async () => {
            if (_categories.length === 0 && _categories.length !== works_categories.length) {
                getWorksCategories(base_url, session?.token)
                setCategories(works_categories)
            } else if (_categories.length === 0 && works_categories.length !== 0) {
                getWorksCategories(base_url, session?.token)
                setCategories(works_categories)
            } else if (_categories.length === 0) {
                getWorksCategories(base_url, session?.token)
                setCategories(works_categories)
            }

            await getWorksDetail(id, session.token,  base_url)
            setTimeout(() => {
                console.log("CHECK ", convertFromHTML(works_detail?.description))
                if(convertFromHTML(works_detail?.description).contentBlocks.length !== 0) {
                    onEditorStateChange(EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(works_detail?.description)
                        )
                    ))
                }
                
            },500)
            
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
                            uptadeWorks(works_detail.id, e, draftToHtml(convertToRaw(editorState.getCurrentContent())), base_url, session?.token, () => {
                                return push("/@admin/works")
                            })
                        }}>
                            <div className="container-fluid bg-white mt-4 p-4 text-dark">
                                <div className="form-group mb-4">
                                    <label htmlFor="">Judul Works</label>
                                    <input defaultValue={works_detail.title} required placeholder="Judul" type="text" className="form-control " />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="">Kategori</label>
                                    <div className="d-flex gap-2">
                                        <select defaultValue={works_detail.works_category_id} required name="" id="" className="form-control">
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
                                                if (res.isConfirmed && res.value !== "") {
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
                                    <input defaultValue={works_detail.image_cover} required type="text" placeholder="Link Gambar" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Meta Keywords</label>
                                    <input defaultValue={works_detail.meta_keywords}  required type="text" placeholder="Keywords dipisahkan dengan koma" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Meta Description</label>
                                    <input defaultValue={works_detail.meta_description}  required type="text" placeholder="meta description" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Tools</label>
                                    <input defaultValue={works_detail.tools}  required type="text" className="form-control" placeholder="tools" />
                                </div>
                                <Editor
                                    editorStyle={{ minHeight: "20em" }}
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