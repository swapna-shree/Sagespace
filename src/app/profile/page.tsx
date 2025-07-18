'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SaasNavbar from "@/components/SaasNavbar";

interface ProfileData {
    displayName: string
    avatarUrl: string
    username: string
    email: string
    isVerified: boolean
}

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [profileData, setProfileData] = useState<ProfileData>({
        displayName: '',
        avatarUrl: '',
        username: '',
        email: '',
        isVerified: false
    })

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push('/signin')
        } else {
            // Try to get isVerified from session, else fetch from backend
            let isVerified = false;
            if (session.user.isVerified !== undefined) {
                isVerified = session.user.isVerified;
                setProfileData({
                    displayName: session.user.displayName || '',
                    avatarUrl: session.user.avatarUrl || '',
                    username: session.user.username || '',
                    email: session.user.email || '',
                    isVerified
                })
                setIsLoading(false)
            } else {
                // Fetch from backend
                fetch('/api/profile')
                    .then(res => res.json())
                    .then(data => {
                        setProfileData(prev => ({
                            displayName: data.data?.displayName ?? prev.displayName ?? '',
                            avatarUrl: data.data?.avatarUrl ?? prev.avatarUrl ?? '',
                            username: data.data?.username ?? prev.username ?? '',
                            email: data.data?.email ?? prev.email ?? '',
                            isVerified: data.data?.isVerified ?? prev.isVerified ?? false
                        }))
                        setIsLoading(false)
                    })
            }
        }
    }, [session, status, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({ ...prev, [name]: value }))
        // Clear messages when user starts editing
        if (message || error) {
            setMessage('')
            setError('')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setMessage('')
        setError('')

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName: profileData.displayName,
                    avatarUrl: profileData.avatarUrl,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setMessage('Profile updated successfully!')
                // Update session data
                if (session) {
                    session.user.displayName = profileData.displayName
                    session.user.avatarUrl = profileData.avatarUrl
                }
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('An error occurred while updating your profile')
        } finally {
            setIsSaving(false)
        }
    }

    if (status === 'loading' || isLoading) {
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
        <div className="min-h-screen bg-gradient-to-b from-[#232323] to-[#2d2d2d] relative overflow-hidden">
            <SaasNavbar />
            <main className="max-w-2xl mx-auto pt-32 pb-16 px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-[#FFF9F3] mb-4 font-['General_Sans',_sans-serif]">Your Profile</h1>
                <p className="text-lg md:text-xl text-[#B6C9B3] leading-relaxed tracking-normal font-['Inter',_sans-serif] mb-8">Manage your account details, verification status, and preferences in a peaceful space.</p>
                {/* Add profile content here, using the same dark palette for headings, text, and buttons */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
                    <p className="text-gray-600">Manage your personal information and preferences</p>
                    <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${profileData.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {profileData.isVerified ? 'Verified Account' : 'Not Verified'}
                        </span>
                        <span className="ml-4 text-sm text-gray-700">Username: <span className="font-bold">{profileData.username}</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={profileData.username}
                                        disabled
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Username cannot be changed</p>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profileData.email}
                                        disabled
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        value={profileData.displayName}
                                        onChange={handleChange}
                                        placeholder="Enter your display name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">This is how others will see your name</p>
                                </div>

                                <div>
                                    <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                        Avatar URL
                                    </label>
                                    <input
                                        type="url"
                                        id="avatarUrl"
                                        name="avatarUrl"
                                        value={profileData.avatarUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com/avatar.jpg"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Link to your profile picture</p>
                                </div>

                                {error && (
                                    <div className="text-red-600 text-sm">{error}</div>
                                )}

                                {message && (
                                    <div className="text-green-600 text-sm">{message}</div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Profile Preview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Preview</h3>

                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {profileData.avatarUrl ? (
                                        <img
                                            src={profileData.avatarUrl}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none'
                                                e.currentTarget.nextElementSibling!.style.display = 'flex'
                                            }}
                                        />
                                    ) : null}
                                    <div className={`w-full h-full flex items-center justify-center text-2xl text-gray-500 ${profileData.avatarUrl ? 'hidden' : ''}`}>
                                        👤
                                    </div>
                                </div>

                                <h4 className="text-lg font-medium text-gray-900">
                                    {profileData.displayName || profileData.username}
                                </h4>
                                <p className="text-sm text-gray-500">@{profileData.username}</p>

                                <div className="mt-4 text-sm text-gray-600">
                                    <p>Email: {profileData.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/settings"
                                    className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    Account Settings
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    View Dashboard
                                </Link>
                                <Link
                                    href="/messages"
                                    className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    View Messages
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 