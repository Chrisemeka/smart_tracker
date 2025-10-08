import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";  

interface DecodedToken {
    exp?: number;
    [key: string]: any;
}

export const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.log('No refresh token found');
        return false;
    }

    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log('Attempting to refresh token...');
        
        const response = await fetch(`${apiUrl}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Token refresh successful');
            localStorage.setItem('accessToken', data.accessToken);
            return true;
        } else {
            console.log('Token refresh failed:', response.status);
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            return false;
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
};

export function ProtectedRoute() {  
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            console.log('No refresh token found');
            setIsAuthorized(false);
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            console.log('Attempting to refresh token...');
            
            const response = await fetch(`${apiUrl}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Token refresh successful');
                
                localStorage.setItem('accessToken', data.accessToken);
                setIsAuthorized(true); 
            } else {
                console.log('Token refresh failed:', response.status);
                setIsAuthorized(false);
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            setIsAuthorized(false); 
        }
    };

    const auth = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log('No access token found');
            setIsAuthorized(false); 
            return;
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000; 

            console.log('Token expiration:', tokenExpiration);
            console.log('Current time:', now);
            console.log('Token expired:', !tokenExpiration || tokenExpiration < now);

            if (!tokenExpiration || tokenExpiration < now) {
                console.log('Token expired, attempting refresh...');
                await refreshToken();
            } else {
                console.log('Token still valid');
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error('Token decode error:', error);
            setIsAuthorized(false);
            localStorage.removeItem('accessToken');
        }
    };

    if (isAuthorized === null) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[400px]">
                <HashLoader color="#030213" size={50} />
                <p className="text-gray-600 mt-4 text-sm font-medium">Loading</p>
            </div>
        )
    }

    return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />; 
}