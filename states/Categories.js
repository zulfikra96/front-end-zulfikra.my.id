import { create } from "zustand";
import { persist } from "zustand/middleware";

export const categoryStores = create((set, get) => ({
    categories: [],
    getCategories: async (base_url, token) => {
        const res = await fetch(`${base_url}/categories`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .catch((res) => res.json())
        set({
            categories: res.data
        })
    },
    getClientCategories: async (base_url) => {
        const res = await fetch(`${base_url}/clients/categories`, {
        })
            .then((res) => res.json())
        set({
            categories: res.data
        })
    }
}))