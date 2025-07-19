'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SaasNavbar from "@/components/SaasNavbar";
import Image from 'next/image';

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
        <div className="min-h-screen bg-gradient-to-b from-[#FDF6F0] to-[#E0DFF6] relative overflow-hidden flex flex-col">
            <SaasNavbar />
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 sm:px-8 bg-transparent">
                {/* Abstract SVG background */}
                <svg className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-40" width="900" height="300" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="450" cy="150" rx="400" ry="100" fill="#B7D3C6" />
                    <ellipse cx="450" cy="180" rx="300" ry="60" fill="#E0DFF6" />
                </svg>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#2F2F2F] mb-4 font-['General_Sans',_sans-serif] drop-shadow-sm">Welcome Back to SageSpace</h1>
                <p className="text-xl md:text-2xl text-[#4B6A5A] max-w-2xl mx-auto mb-8 font-['Inter',_sans-serif]">A safe, modern space to share, heal, and grow. Here, your thoughts matter and support is always near.</p>
            </section>
            <main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-[#B7D3C6]/60 rounded-2xl shadow-lg p-8 transition-transform hover:scale-105 hover:shadow-2xl">
                        <div className="text-4xl mb-4">💭</div>
                        <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">Share Your Thoughts</h3>
                        <p className="text-[#4B6A5A]">Express yourself freely in a safe, supportive environment where your voice matters.</p>
                    </div>
                    <div className="bg-[#F5D2C8]/60 rounded-2xl shadow-lg p-8 transition-transform hover:scale-105 hover:shadow-2xl">
                        <div className="text-4xl mb-4">🤗</div>
                        <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">Receive Support</h3>
                        <p className="text-[#C97B63]">Connect with others who understand and offer genuine support without judgment.</p>
                    </div>
                    <div className="bg-[#E0DFF6]/60 rounded-2xl shadow-lg p-8 transition-transform hover:scale-105 hover:shadow-2xl">
                        <div className="text-4xl mb-4">🌱</div>
                        <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">Grow & Heal</h3>
                        <p className="text-[#7CA08B]">Take steps towards personal growth and healing in a nurturing community.</p>
                    </div>
                </div>
                {/* AI Suggestion Section */}
                <div className="mb-12 flex flex-col items-center justify-center">
                    <div className="bg-[#E0DFF6] rounded-xl shadow p-6 max-w-xl w-full flex flex-col items-center">
                        <span className="text-2xl mb-2">✨</span>
                        <span className="text-lg font-semibold text-[#4B6A5A] mb-1">Affirmation of the Day</span>
                        <span className="text-[#2F2F2F] text-base text-center">You are valued, and your feelings matter. Every step you take is a step toward healing.</span>
                    </div>
                </div>
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <h3 className="text-2xl font-bold text-[#2F2F2F] mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/profile" className="flex flex-col items-center p-6 bg-[#B7D3C6]/40 rounded-xl hover:bg-[#B7D3C6]/70 transition-colors shadow">
                            <div className="text-3xl mb-2">👤</div>
                            <span className="font-medium text-[#2F2F2F]">Profile</span>
                        </Link>
                        <Link href="/messages" className="flex flex-col items-center p-6 bg-[#E0DFF6]/40 rounded-xl hover:bg-[#E0DFF6]/70 transition-colors shadow">
                            <div className="text-3xl mb-2">💌</div>
                            <span className="font-medium text-[#2F2F2F]">Messages</span>
                        </Link>
                        <Link href="/settings" className="flex flex-col items-center p-6 bg-[#F5D2C8]/40 rounded-xl hover:bg-[#F5D2C8]/70 transition-colors shadow">
                            <div className="text-3xl mb-2">⚙️</div>
                            <span className="font-medium text-[#2F2F2F]">Settings</span>
                        </Link>
                    </div>
                </div>
                {/* User Status */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-20 h-20 rounded-full bg-[#E0DFF6] flex items-center justify-center mb-4 overflow-hidden">
                            {/* Avatar placeholder, replace with user image if available */}
                            <span className="text-4xl">👤</span>
                        </div>
                        <span className="text-lg font-bold text-[#2F2F2F]">{session.user.username}</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Email Verified:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${session.user.isVerified ? 'bg-[#B7D3C6] text-[#2F2F2F]' : 'bg-[#F5D2C8] text-[#C97B63]'}`}>
                                {session.user.isVerified ? 'Verified' : 'Not Verified'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Accepting Messages:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${session.user.isAcceptingMessages ? 'bg-[#B7D3C6] text-[#2F2F2F]' : 'bg-[#F5D2C8] text-[#C97B63]'}`}>
                                {session.user.isAcceptingMessages ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Testimonials Section */}
                <div className="mt-16 mb-12">
                    <h3 className="text-2xl font-bold text-[#2F2F2F] mb-6 text-center">What Our Users Say</h3>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <div className="bg-[#B7D3C6]/60 rounded-xl shadow p-6 max-w-xs">
                            <span className="text-lg text-[#4B6A5A]">“SageSpace helped me find my voice and feel heard.”</span>
                            <div className="mt-4 text-sm text-[#2F2F2F] font-semibold">— Alex</div>
                        </div>
                        <div className="bg-[#E0DFF6]/60 rounded-xl shadow p-6 max-w-xs">
                            <span className="text-lg text-[#4B6A5A]">“The community is so supportive and kind!”</span>
                            <div className="mt-4 text-sm text-[#2F2F2F] font-semibold">— Jamie</div>
                        </div>
                        <div className="bg-[#F5D2C8]/60 rounded-xl shadow p-6 max-w-xs">
                            <span className="text-lg text-[#C97B63]">“I love the daily affirmations and positive vibes.”</span>
                            <div className="mt-4 text-sm text-[#2F2F2F] font-semibold">— Taylor</div>
                        </div>
                    </div>
                </div>
                {/* Resources Section */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-[#2F2F2F] mb-6 text-center">Helpful Resources</h3>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <a href="https://www.mhanational.org/" target="_blank" rel="noopener noreferrer" className="bg-[#B7D3C6]/60 rounded-xl shadow p-6 max-w-xs hover:bg-[#B7D3C6]/80 transition-colors text-[#2F2F2F] font-medium">Mental Health America</a>
                        <a href="https://www.betterhelp.com/advice/" target="_blank" rel="noopener noreferrer" className="bg-[#E0DFF6]/60 rounded-xl shadow p-6 max-w-xs hover:bg-[#E0DFF6]/80 transition-colors text-[#2F2F2F] font-medium">BetterHelp Advice</a>
                        <a href="https://www.nami.org/Home" target="_blank" rel="noopener noreferrer" className="bg-[#F5D2C8]/60 rounded-xl shadow p-6 max-w-xs hover:bg-[#F5D2C8]/80 transition-colors text-[#2F2F2F] font-medium">NAMI</a>
                    </div>
                </div>
            </main>
            <footer className="w-full py-5 bg-[#E0DFF6] bg-opacity-95 text-center text-[#4B6A5A] text-base font-medium border-t border-[#C7C6E6] shadow-sm fixed left-0 bottom-0 z-30">
                &copy; {new Date().getFullYear()} <span className="font-bold tracking-wide">SageSpace</span>. All rights reserved.
            </footer>
        </div>
    )
} 