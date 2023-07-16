import { create } from "zustand"
import { persist } from "zustand/middleware"

export const globalStore = create(persist(
    (set, get) => ({
        language:"",
        chooseLanguage: (value) => set({ language: value }),
        base_url:"",
        setBaseUrl:(value) => set({ base_url: value })
    }),
    {
        name:"language",
    }
))