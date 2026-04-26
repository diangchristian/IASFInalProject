import {type StateCreator} from 'zustand';
import { logIn, signUp} from '../api/auth-api';

type AuthState = {
    isAuthenticated: boolean;
    token: string,
    user: null;
} 

type LogInData = {
    name: string;
    email: string;
    password: string;

} 

type AuthActions = {
    logIn: ({email, password}: {email: string; password: string}) => Promise<void>;
    signUp: ({name, email, password}: LogInData) => Promise<void>;
    signOut: () => void; 
}


export type AuthSlice = AuthState & AuthActions;


export const createAuthSlice: StateCreator<AuthSlice, [['zustand/immer', never]], [], AuthSlice> = (set) => ({
    isAuthenticated: false,
    user: null,
    token: '',
    logIn: async ({ email, password }) => {
        try {
            const data = await logIn(email, password) // your API function
            set({ user: data.user }) 
            set({ isAuthenticated: true })
            set({ token: data.token })
            
            console.log("Signed in user:", data)

            return data
        } catch (error) {
            console.error("Sign-in failed", error)
            throw error
        }
     },
    signUp: async ({ email, password, name }) => { 
        try {
            const data = await signUp(name, email, password) // your API function
            set({ user: data.user }) 
            set({ isAuthenticated: true })
            set({ token: data.token })
            console.log("Signed in user:", data)

            return data
        } catch (error) {
            console.error("Sign-in failed", error)
            throw error
        }
    },
    signOut: () => set((state) => {
        state.user = null
        state.isAuthenticated = false
        state.token = ''
        localStorage.removeItem('auth-storage');
    })

})