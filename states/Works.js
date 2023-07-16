import Swal from "sweetalert2";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const worksState = create((set, get) => ({
    works:[],
    works_categories:[],
    works_detail:{},
    getWorks: async (base_url, token, page) => {
        try {
            const res = await fetch(`${base_url}/works?page=${(page) ? page : 1}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            set({ works: res.data })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    getClientWorks: async (base_url) => {
        try {
            const res = await fetch(`${base_url}/clients/works`).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            set({ works: res.data })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    getWorksCategories: async (base_url, token) => {
        try {
            const res = await fetch(`${base_url}/works/category`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            set({ works_categories: res.data })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    },
    getClientWorksDetail: async (id, base_url) => {
        try {
            const res = await fetch(`${base_url}/clients/works/${id}`).then((res) => res.json())
            if (res.status_code !== 200) throw res.message
            set({ works_detail: res.data })
        } catch (error) {
            console.log(error)
            throw Swal.fire({
                toast: true,
                title: error
            })
        }
    }
}))