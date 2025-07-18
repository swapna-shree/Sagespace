'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                identifier,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError(result.error)
            } else {
                router.push('/home')
            }
        } catch (error) {
            setError('An error occurred during sign in')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: '/home' })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#232323] to-[#2d2d2d] relative overflow-hidden">
            <div className="fixed top-8 left-8 z-50">
                <span className="text-3xl font-extrabold tracking-tight text-[#FFF9F3] select-none font-['General_Sans',_sans-serif]">SageSpace</span>
            </div>
            <main className="max-w-md mx-auto pt-32 pb-16 px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-[#FFF9F3] mb-4 font-['General_Sans',_sans-serif]">Sign In</h1>
                <p className="text-lg md:text-xl text-[#B6C9B3] leading-relaxed tracking-normal font-['Inter',_sans-serif] mb-8">Sign in to your SageSpace account to continue.</p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        className="w-full px-4 py-3 rounded-md bg-[#232323] border border-[#B6C9B3] text-[#FFF9F3] placeholder-[#B6C9B3] focus:outline-none focus:ring-2 focus:ring-[#FAD4C0] transition"
                        placeholder="Username"
                        id="identifier"
                        name="identifier"
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <input
                        className="w-full px-4 py-3 rounded-md bg-[#232323] border border-[#B6C9B3] text-[#FFF9F3] placeholder-[#B6C9B3] focus:outline-none focus:ring-2 focus:ring-[#FAD4C0] transition"
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p className="text-[#E2AFAF] text-sm font-medium mt-2">{error}</p>
                    )}
                    <button
                        className="w-full py-3 rounded-md bg-[#B6C9B3] text-[#232323] font-semibold shadow hover:bg-[#A3C7B5] transition"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                    <button
                        className="w-full py-3 rounded-md bg-[#232323] border border-[#B6C9B3] text-[#B6C9B3] font-semibold opacity-60 cursor-not-allowed mt-2"
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled
                    >
                        Sign in with Google
                    </button>
                </form>
                <p className="mt-6 text-[#B6C9B3] text-sm">
                    Don't have an account? <Link href="/signup" className="underline text-[#FAD4C0]">Sign up</Link>
                </p>
            </main>
        </div>
    )
} 