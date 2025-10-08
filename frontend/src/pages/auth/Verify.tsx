import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Verify() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [errorMessage, setErrorMessage] = useState('')


    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

        if (element.nextElementSibling && element.value) {
            (element.nextElementSibling as HTMLInputElement).focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && e.currentTarget.previousElementSibling) {
                (e.currentTarget.previousElementSibling as HTMLInputElement).focus()
            }
            setOtp([...otp.map((d, idx) => (idx === index ? '' : d))])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const otpCode = otp.join('')
        const email = localStorage.getItem('email')
        submitVerification(email!, otpCode)

    }

    const submitVerification = async (email: string, otp: string) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await fetch(`${apiUrl}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,       
                otp: otp,  
            })
            })

            if (response.ok) {
            const result = await response.json()
            console.log('Verification successful:', result)
            navigate('/login', { 
                state: { message: 'Email verified successfully!' }
            })

            } else {
                setErrorMessage('OTP Verification failed! Please confirm your otp and try again.')
                console.error('OTP Verification failed')
            }
        } catch (error) {
            console.error('Network error:', error)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">  
            <div className="w-full max-w-xl space-y-6">
                <div className="text-center">
                    <h2 className="text-black text-3xl font-medium">Code validation</h2>
                    <p className="text-gray-500 mt-2">Please enter the 6 digit code sent to your email</p>
                </div>

                {errorMessage && (
                    <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="p-8">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center space-x-3">
                            {otp.map((data, index) => (
                                <input key={index} type="text" maxLength={1} value={data} onChange={(e) => handleChange(e.target, index)} onKeyDown={(e) => handleKeyDown(e, index)} onFocus={(e) => e.target.select()} className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#030213] focus:border-transparent text-gray-600" placeholder='_'
                                />
                            ))}
                        </div>

                        <p className="text-gray-400 text-center text-sm">Didn't get the code?  <a href="#" className="text-sm text-right text-[#030213] hover:underline">Resend Code</a></p>

                        <button type="submit" className="w-full bg-[#030213] text-white py-3 rounded-md font-medium hover:bg-[#1f1f46] transition duration-200" disabled={otp.some(digit => digit === '')}
                        >
                           Verify
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}