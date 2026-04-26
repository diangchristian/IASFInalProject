import { create } from "zustand";
import { Store } from "../types/store";
import { immer } from "zustand/middleware/immer";
import {  persist } from "zustand/middleware";

import {createAuthSlice} from "./authSlice";



export const useStore = create<Store>()(
    persist(
        immer((...a) => ({
            ...createAuthSlice(...a),
        }))
    , {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
      }),
    })
);