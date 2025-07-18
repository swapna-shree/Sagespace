'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SaasNavbar from "@/components/SaasNavbar";

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === 'loading') return
        if (!session) {
            router.push('/signin')
        } else {
            setIsLoading(false)
        }
    }, [session, status, router])

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }

    if (isLoading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!session) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8F6F2] to-[#FDF6F0] relative overflow-hidden">
            <SaasNavbar />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Your Quiet Corner of the Internet
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Welcome to SageSpace, a judgment-free space to just be, feel, and heal.
                        Here you can share your thoughts, receive support, and find peace.
                    </p>
                </div>
                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-indigo-600 text-3xl mb-4">💭</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Thoughts</h3>
                        <p className="text-gray-600">
                            Express yourself freely in a safe, supportive environment where your voice matters.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-indigo-600 text-3xl mb-4">🤗</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Receive Support</h3>
                        <p className="text-gray-600">
                            Connect with others who understand and offer genuine support without judgment.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-indigo-600 text-3xl mb-4">🌱</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow & Heal</h3>
                        <p className="text-gray-600">
                            Take steps towards personal growth and healing in a nurturing community.
                        </p>
                    </div>
                </div>
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link
                            href="/profile"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                        >
                            <div className="text-2xl mb-2">👤</div>
                            <span className="font-medium text-gray-900">Profile</span>
                        </Link>
                        <Link
                            href="/messages"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                        >
                            <div className="text-2xl mb-2">💌</div>
                            <span className="font-medium text-gray-900">Messages</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                        >
                            <div className="text-2xl mb-2">⚙️</div>
                            <span className="font-medium text-gray-900">Settings</span>
                        </Link>
                    </div>
                </div>
                {/* User Status */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Account Status</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Username:</span>
                            <span className="font-medium">{session.user.username}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Email Verified:</span>
                            <span className={`font-medium ${session.user.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                                {session.user.isVerified ? '✓ Verified' : '✗ Not Verified'}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-600 w-32">Accepting Messages:</span>
                            <span className={`font-medium ${session.user.isAcceptingMessages ? 'text-green-600' : 'text-red-600'}`}>
                                {session.user.isAcceptingMessages ? '✓ Yes' : '✗ No'}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 