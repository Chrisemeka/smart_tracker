import googleIcon from '../../assets/icons/google_icon.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react';
import type { RegisterFormData } from '../../utils/types';
import { HashLoader } from "react-spinners";  



export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: ''
    })
    const [ loading, setLoading ] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const apiUrl = import.meta.env.VITE_API_URL

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        submitRegisterData(formData)
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const submitRegisterData = async (data: RegisterFormData) => {
        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,       
                email: data.email,  
                password: data.password 
            })
            })

            if (response.ok) {
            const result = await response.json()
            console.log('Registration successful:', result)
            localStorage.setItem('email', data.email)
            navigate('/verify-otp', { 
                state: { message: 'Email verified successfully!' }
            })

            } else {
                setErrorMessage('Registration failed! Please confirm your details and try again.')
                console.error('Registration failed')
            }
            setLoading(false)
        } catch (error) {
            console.error('Network error:', error)
        }
    }
    
    return (
        <main className="min-h-screen flex items-center justify-center px-4">  
            <div className="w-full max-w-xl space-y-6">
                <div className="text-center">
                    <h2 className="text-black text-3xl font-bold">Sign Up</h2>
                    <p className="text-gray-500 mt-2">Enter your details below & free sign up</p>
                </div>

                <div className="p-8">
                    {errorMessage && (
                        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className="text-black font-medium">Username</label>
                            <input required type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-black font-medium">Email</label>
                            <input required type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-black font-medium">Password</label>
                            <input required type="password" name="password"  id="password" value={formData.password} onChange={handleChange} className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder='Min 8 chars, 1 upper, 1 lower, 1 number, 1 special' 
                            />
                        </div>  

                        <button type="submit" className={ `w-full ${loading ? 'bg-transparent border-2 border-[#030213] hover:bg-transparent' : 'bg-[#030213]'} text-white py-3 rounded-md font-medium hover:bg-[#1f1f46] transition duration-200` } disabled={loading}>
                            {loading ? <HashLoader size={15} color='#030213' /> : 'Create Account'}
                        </button>

                        <p className="text-gray-400 text-center text-sm">Already have an account?  <a href="/login" className="text-sm text-right text-[#030213] hover:underline">Login</a></p>

                       <div className="flex items-center space-x-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="text-gray-500 text-sm"> or </span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <a href={`${apiUrl}/auth/google`} className="flex items-center justify-center bg-white border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition duration-200">
                            <img src={googleIcon} alt="google" className="w-7 h-7" />
                            <span className="ml-3 text-gray-600 text-sm">Sign up with Google</span>
                        </a>
                    </form>
                </div>
            </div>
        </main>
    )
}