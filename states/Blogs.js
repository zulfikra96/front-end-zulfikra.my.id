import { isEmpty } from "lodash";
import Swal from "sweetalert2";
import { create } from "zustand";

export const blogStore = create((set, get) => ({
    blogs: [],
    latest_blogs: [],
    editor_choice: [],
    most_popular: [],
    blog_detail: {},
    getBlogs: async (base_url, token, page) => {
        try {
            const res = await fetch(`${base_url}/blogs?page=${(page) ? page : 1}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            set({ blogs: res.data })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    getClientBlogs: async (base_url, token, search) => {
        try {
            let query = `${base_url}/clients/blogs`
            if(!isEmpty(search)) {
                query+=`?search=${search}` 
            }
            const res = await fetch(query, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            const { latest_blogs, editor_choice, most_popular } = res.data
            set({ latest_blogs, editor_choice, most_popular })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    getClientBlogByCategory: async (base_url, name) => {
        try {
            let query = `${base_url}/clients/blogs/category/${name}`
            const res = await fetch(query, {
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            const latest_blogs = res.data
            set({ latest_blogs })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    getClientBlogDetail: async (slug, base_url) => {
        try {
            const res = await fetch(`${base_url}/clients/blogs/${slug}`).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            res.data
            set({ blog_detail: res.data })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    updateBlogStatus: async (id, status, token, base_url) => {

        try {
            const res = await fetch(`${base_url}/blogs/${id}/is-posted`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    is_posted: status
                })
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
        } catch (error) {
            console.error(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    updateBlogEditorChoice: async (id, status, token, base_url) => {
        try {
            const res = await fetch(`${base_url}/blogs/${id}/editor-choice`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    status: status
                })
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
        } catch (error) {
            console.error(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    }
}))