import axios from 'axios';
import { apiClient } from './apiClient';


export const logIn = async (email: string, password: string) => {
    try {

        const {data} = await apiClient.post('/api/auth/login', {email, password});
        console.log('Login :', data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = (error.response?.data as { error?: string; message?: string } | undefined)?.error
                ?? (error.response?.data as { error?: string; message?: string } | undefined)?.message
                ?? 'Unable to log in';
            throw new Error(message, { cause: error });
        }

        throw new Error('Unable to log in', { cause: error });
    }

}


export const signUp = async (name: string, email: string, password: string) => {
    try {

        const {data} = await apiClient.post('/api/auth/register', {name, email, password});
          console.log('Sign-up successful:', data);
        
          return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = (error.response?.data as { error?: string; message?: string } | undefined)?.error
                ?? (error.response?.data as { error?: string; message?: string } | undefined)?.message
                ?? 'Unable to create account';
            throw new Error(message, { cause: error });
        }

        throw new Error('Unable to create account', { cause: error });
    }
}




