import { create } from "zustand"
import { persist } from "zustand/middleware"

export const globalStore = create(persist(
    (set, get) => ({
        language:"",
        chooseLanguage: (value) => set({ language: value })
    }),
    {
        name:"language",
    }
))