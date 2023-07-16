import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(persist(
    (set, get) => ({
        session:"",
        setSession: (session) => set({ session })
    }),
    {
        name:"__session__"
    }
))