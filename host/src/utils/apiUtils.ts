import { store } from '../redux/store';
import { logout } from '../redux/features/auth/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL
console.log(BASE_URL)

export async function makePostRequest(endpoint:string, body?:any) :Promise<Response> {
    const dispatch = store.dispatch;
    const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        // ...(getJWT() ? { 'Authorization': `Bearer ${getJWT()}` } : {})
        },
        body: JSON.stringify(body),
        credentials: "include"
    })

    if(response.status == 401) {
        dispatch(logout());
        throw new Error("UNAUTHORIZED: Session expired!");
    }

    if (!response.ok) {
        const errorText = await response.text();
    
        throw new Error(errorText);
    }

    return response;
}

export async function makeGetRequest(endpoint:string) :Promise<Response> {
    const dispatch = store.dispatch;
    const response = await fetch(`${endpoint}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        // ...(getJWT() ? { 'Authorization': `Bearer ${getJWT()}` } : {})
        },
        credentials: "include"
    })

    if(response.status == 401) {
        dispatch(logout());
        throw new Error("UNAUTHORIZED: Session expired!");
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'POST request failed');
    }

    return response;
}