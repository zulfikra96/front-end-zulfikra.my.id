import React from "react";
import AdminMain from "../../components/Main";
import Sidebar from "../../components/Sidebar";
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import Swal from "sweetalert2";
import { globalStore } from "../../../../states/global";
import { userStore } from "../../../../states/Users";
import { categoryStores } from "../../../../states/Categories";
import Notfound from "../../../notfound";
import draftToHtml from "draftjs-to-html"
import { blogStore } from "../../../../states/Blogs";

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
async function postBlog(e, description, base_url, token, id, callback) {
    e.preventDefault()
    const data = {
        title: e.target[0].value,
        category_id: e.target[1].value,
        tags: (/[,]/g.test(e.target[3].value)) ? e.target[3].value.split(",") : [e.target[3].value],
        image_cover: e.target[4].value,
        meta_keywords: e.target[5].value,
        meta_description: e.target[6].value,
        description: description,
        is_posted: /true/.test(e.target[7].value)
    }
    try {
        Swal.showLoading()
        const res = await fetch(`${base_url}/blogs/${id}`, {
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
        }).then((res) => {
            if (res.isConfirmed) {
                window.location.href = "/@admin/blogs"
            }
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

export function getStaticProps(context) {
    return {
        props: {
            base_url: process.env.BASE_URL,
            id: context.params.id
        }
    }
}

export default function CreateBlog({ base_url, id }) {
    // alert(id)
    const [editorState, onEditorStateChange] = useState(EditorState.createEmpty())
    const { session } = userStore()
    const { categories, getCategories } = categoryStores()
    const [_categories, setCategories] = useState([])
    const [_session, setSession] = useState(null)
    const [is_posted, setIsPosted] = useState(false)
    const { getBlogDetail, blog_detail } = blogStore()
    const [category, setCategory] = useState(null)
    useEffect(() => {
        setSession(session);
        (async () => {
            if (categories.length === 0 || _categories.length !== categories.length) {
                getCategories(base_url, session?.token)
                setCategories(categories)
            }
            await getBlogDetail(base_url, session.token, id)
            setCategory(blog_detail.category_id)
            setTimeout(() => {
                // console.log("CHECK ", convertFromHTML(works_detail?.description))
                if (blog_detail?.description !== undefined && convertFromHTML(blog_detail?.description).contentBlocks.length !== 0) {
                    try {
                        onEditorStateChange(EditorState.createWithContent(
                            convertFromRaw(JSON.parse(blog_detail?.description))
                        ))
                        // onEditorStateChange(convertFromRaw(blog_detail?.description))

                    } catch (error) {
                        console.log(error)
                        if(convertFromHTML(works_detail?.description).contentBlocks.length !== 0) {
                            onEditorStateChange(EditorState.createWithContent(
                                ContentState.createFromBlockArray(
                                    convertFromHTML(works_detail?.description)
                                )
                            ))
                        }
                    }
                }

            }, 500)
        })()

    }, [categoryStores.getState().categories, blog_detail.description])
    if (_session?.role !== "ADMIN") {
        return <Notfound />
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar active={"blog"} />
                    <AdminMain>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            // console.log(convertToRaw(editorState.getCurrentContent()))
                            postBlog(e, convertToRaw(editorState.getCurrentContent()), base_url, session?.token, id, () => {

                            })
                        }}>
                            <div className="container-fluid bg-white mt-4 p-4 text-dark">
                                <div className="form-group mb-4">
                                    <label htmlFor="">Judul Blog</label>
                                    <input defaultValue={blog_detail?.title} required placeholder="Judul" type="text" className="form-control " />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="">Kategori</label>
                                    <div className="d-flex gap-2">
                                        <select value={category} onChange={(e) => setCategory(e.currentTarget.value)} required name="" id="" className="form-control">
                                            <option value=""></option>
                                            {categories.map((e) => (
                                                <option key={e.id} value={e.id}>{e.name} </option>
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
                                                        const _res = await fetch(`${base_url}/categories`, {
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
                                                        await getCategories(base_url, session?.token)
                                                        setCategories(categoryStores.getState().categories)
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
                                    <label htmlFor="">Tag</label>
                                    <input defaultValue={blog_detail?.tags?.map((e) => e.name).toString()} required type="text" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Gambar Sampul</label>
                                    <input defaultValue={blog_detail?.image_cover} required type="text" placeholder="Link Gambar" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Meta Keywords</label>
                                    <input defaultValue={blog_detail?.meta_keywords} type="text" required className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="">Meta Description</label>
                                    <input defaultValue={blog_detail?.meta_description} type="text" required className="form-control" />
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