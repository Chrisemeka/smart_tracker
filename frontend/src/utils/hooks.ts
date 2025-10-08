import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginFormData, CreateBucketDTO } from './types';
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../pages/auth/ProtectedRoute";

interface DecodedToken {
    exp?: number;
    [key: string]: any;
}


const apiUrl = import.meta.env.VITE_API_URL


export function useLogin() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({     
                    email: data.email,  
                    password: data.password 
                })
            })
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }
            
            return result;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
        }
    })
}

export async function getBuckets() {
    const authenticatedFetch = useAuthenticatedFetch();
    
    const res = await authenticatedFetch(`${apiUrl}/bucket`)
    const response = await res.json();
    return response.data    
}

export function postBucket() {
    const queryClient = useQueryClient(); 
    const authenticatedFetch = useAuthenticatedFetch();

     return useMutation({
        mutationFn: async (data: CreateBucketDTO) => {
            const response = await authenticatedFetch(`${apiUrl}/bucket/create`, {
                method: 'POST',
                body: JSON.stringify({     
                    name: data.name,  
                    icon: data.icon, 
                    description: data.description,
                    fieldSchema: data.fieldSchema 
                })
            })
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Bucket creation failed');
            }
            
            return result;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['userBucket'], data.user)
        }
    })
}

export async function getBucketById(id: string) {
    const authenticatedFetch = useAuthenticatedFetch();

    const res = await authenticatedFetch(`${apiUrl}/bucket/${id}`)
    if (!res.ok) throw new Error('Failed to fetch bucket')
    
    const result = await res.json()
    return result.data 
}

export async function getRecordInBucket(id: string) {
    const authenticatedFetch = useAuthenticatedFetch();

    const res = await authenticatedFetch(`${apiUrl}/bucket/${id}/records`)
    const result = await res.json()
  
    return result.data  
}

export function postRecordInBucket() {
    const queryClient = useQueryClient(); 
    const authenticatedFetch = useAuthenticatedFetch();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await authenticatedFetch(`${apiUrl}/bucket/${id}/records`, {
                method: 'POST',
                body: JSON.stringify({     
                    data: data,  
                })
            })
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['bucketRecord'], data.user)
        }
    })
}

export async function deleteBucket(bucketId: string) {
    const authenticatedFetch = useAuthenticatedFetch();
    const res = await authenticatedFetch(`${apiUrl}/bucket/delete/${bucketId}`, {
        method: 'DELETE',
    });
    return res.json();
}

export const useAuthenticatedFetch = () => {
    const checkAndRefreshToken = async (): Promise<boolean> => {
        const token = localStorage.getItem('accessToken');
        if (!token) return false;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;
            
            // Refresh if token expires in less than 2 minutes (120 seconds)
            const bufferTime = 120;
            
            if (!tokenExpiration || tokenExpiration < (now + bufferTime)) {
                console.log('Token expiring soon, refreshing preemptively...');
                return await refreshAccessToken();
            }
            
            return true;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    };

    const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
        // Check and refresh token BEFORE making the API call
        const isValid = await checkAndRefreshToken();
        
        if (!isValid) {
            // Redirect to login if refresh failed
            window.location.href = '/login';
            throw new Error('Authentication failed');
        }

        const token = localStorage.getItem('accessToken');
        
        // Make the API call with the fresh token
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    };

    return authenticatedFetch;
};
