import googleIcon from '../../assets/icons/google_icon.svg'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react';
import { useLogin } from '../../utils/hooks';
import type { LoginFormData } from '../../utils/types';
import { HashLoader } from "react-spinners";  

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const [ loading, setLoading ] = useState(false)
    const message = location.state?.message
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')


    const loginMutation = useLogin();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        loginMutation.mutate(formData, {
            onSuccess: () => {
                setTimeout(() => navigate('/dashboard'), 2000)
            },
            onError: (err) => {
                setLoading(false)
                setErrorMessage('Login failed. Please check your credentials and try again.')
                console.error('Network error:', err)
            }
        });
    }

    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">  
            <div className="w-full max-w-xl space-y-6">
                <div className="text-center">
                    <h2 className="text-black text-3xl font-bold">Login</h2>
                    <p className="text-gray-500 mt-2">You already have an account</p>
                </div>

                <div className="p-8">
                    {message && (
                        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                        {message}
                        </div>
                    )}  
                    {errorMessage && (
                        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-black font-medium">Email</label>
                            <input required type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-black font-medium">Password</label>
                            <input required name="password" id="password" type='password' value={formData.password} onChange={handleChange} className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                        </div>  

                        <p className="text-right md:text-left"><a href="#" className="text-sm text-right text-[#030213] hover:underline">Forgot password?</a></p>

                        <button type="submit" className={ `w-full ${loading ? 'bg-transparent border-2 border-[#030213] hover:bg-transparent' : 'bg-[#030213]'} text-white py-3 rounded-md font-medium hover:bg-[#1f1f46] transition duration-200` } disabled={loading}>
                            {loading ? <HashLoader size={15} color='#030213' /> : 'Login'}
                        </button>

                        <p className="text-gray-400 text-center text-sm">Don't have an account?  <a href="/" className="text-sm text-right text-[#030213] hover:underline">Register</a></p>

                       <div className="flex items-center space-x-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="text-gray-500 text-sm"> or </span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <a href={`${apiUrl}/auth/google`} className="flex items-center justify-center bg-white border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition duration-200">
                            <img src={googleIcon} alt="google" className="w-7 h-7" />
                            <span className="ml-3 text-gray-600 text-sm">Login with Google</span>
                        </a>
                    </form>
                </div>
            </div>
        </main>
    )
}