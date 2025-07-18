'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Verify() {
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const emailParam = searchParams.get('email')
        const codeParam = searchParams.get('code')

        if (emailParam) {
            setEmail(decodeURIComponent(emailParam))
        }
        if (codeParam) {
            setCode(codeParam)
            // Auto-verify if both email and code are provided
            handleVerify()
        }
    }, [searchParams])

    const handleVerify = async () => {
        if (!email || !code) {
            setError('Email and verification code are required')
            return
        }

        setIsLoading(true)
        setError('')
        setMessage('')

        try {
            const response = await fetch('/api/auth/[...nextauth]/verify-code', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    code,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setMessage('Email verified successfully! You can now sign in.')
                setTimeout(() => {
                    router.push('/signin')
                }, 2000)
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('An error occurred during verification')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendCode = async () => {
        if (!email) {
            setError('Email is required to resend verification code')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/resend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (data.success) {
                setMessage('Verification code resent successfully! Check your email.')
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('An error occurred while resending the code')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Verify Your Email
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the verification code sent to your email
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Verification Code
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                required
                                maxLength={6}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center text-lg tracking-widest"
                                placeholder="000000"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}

                    {message && (
                        <div className="text-green-600 text-sm text-center">{message}</div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={handleVerify}
                            disabled={isLoading || !email || !code}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Email'}
                        </button>

                        <button
                            onClick={handleResendCode}
                            disabled={isLoading || !email}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            Resend Code
                        </button>
                    </div>

                    <div className="text-center space-y-2">
                        <Link href="/signin" className="block text-indigo-600 hover:text-indigo-500">
                            Back to Sign In
                        </Link>
                        <Link href="/signup" className="block text-indigo-600 hover:text-indigo-500">
                            Create New Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 