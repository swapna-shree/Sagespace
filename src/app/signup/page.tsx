'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.username) {
            newErrors.username = 'Username is required'
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters'
        }
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsLoading(true)
        setMessage('')
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            })
            const data = await response.json()
            if (data.success) {
                setMessage('Account created successfully! Please check your email for verification.')
                setTimeout(() => {
                    router.push(`/verify?email=${encodeURIComponent(formData.email)}`)
                }, 2000)
            } else {
                setErrors({ general: data.message })
            }
        } catch (error) {
            setErrors({ general: 'An error occurred during sign up' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignUp = () => {
        signIn('google', { callbackUrl: '/home' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#232323] to-[#2d2d2d] relative overflow-hidden">
            <div className="fixed top-8 left-8 z-50">
                <span className="text-3xl font-extrabold tracking-tight text-[#FFF9F3] select-none font-['General_Sans',_sans-serif]">SageSpace</span>
            </div>
            <main className="max-w-lg mx-auto pt-32 pb-16 px-4 text-center relative z-10">
                <h1 className="text-5xl font-bold leading-tight tracking-wide text-[#FFF9F3] mb-4 font-['General_Sans',_sans-serif]">Create Your Account</h1>
                <p className="text-xl text-[#B6C9B3] leading-relaxed tracking-normal font-['Inter',_sans-serif] mb-8">Join SageSpace and start your journey in a supportive, calming community.</p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className="w-full px-4 py-3 text-lg rounded-md bg-[#232323] border border-[#B6C9B3] text-[#FFF9F3] placeholder-[#FFF9F3] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FAD4C0] transition"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username}</p>
                    )}
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 text-lg rounded-md bg-[#232323] border border-[#B6C9B3] text-[#FFF9F3] placeholder-[#FFF9F3] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FAD4C0] transition"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-4 py-3 text-lg rounded-md bg-[#232323] border border-[#B6C9B3] text-[#FFF9F3] placeholder-[#FFF9F3] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FAD4C0] transition"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full px-4 py-3 text-lg rounded-md bg-[#232323] border border-[#B6C9B3] text-[#FFF9F3] placeholder-[#FFF9F3] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FAD4C0] transition"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                    {errors.general && (
                        <div className="text-red-500 text-sm text-center">{errors.general}</div>
                    )}
                    {message && (
                        <div className="text-green-500 text-sm text-center">{message}</div>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 text-lg rounded-md bg-[#B6C9B3] text-[#232323] font-semibold shadow hover:bg-[#A3C7B5] transition"
                    >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>
                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-[#B6C9B3]" />
                        <span className="mx-4 text-[#B6C9B3] font-semibold">or</span>
                        <div className="flex-1 h-px bg-[#B6C9B3]" />
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="w-full py-3 text-lg rounded-md bg-[#232323] border border-[#B6C9B3] text-[#B6C9B3] font-semibold hover:bg-[#333] transition"
                    >
                        Sign up with Google
                    </button>
                    <div className="text-center mt-6">
                        <Link href="/signin" className="text-[#B6C9B3] hover:underline">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    )
} 