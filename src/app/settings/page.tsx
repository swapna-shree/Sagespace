'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SettingsData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
    isAcceptingMessages: boolean
}

export default function Settings() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [settingsData, setSettingsData] = useState<SettingsData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        isAcceptingMessages: true
    })

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push('/signin')
        } else {
            setSettingsData(prev => ({
                ...prev,
                isAcceptingMessages: session.user.isAcceptingMessages
            }))
            setIsLoading(false)
        }
    }, [session, status, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setSettingsData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Clear messages when user starts editing
        if (message || error) {
            setMessage('')
            setError('')
        }
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()

        if (settingsData.newPassword !== settingsData.confirmPassword) {
            setError('New passwords do not match')
            return
        }

        if (settingsData.newPassword.length < 6) {
            setError('New password must be at least 6 characters')
            return
        }

        setIsSaving(true)
        setMessage('')
        setError('')

        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: settingsData.currentPassword,
                    newPassword: settingsData.newPassword,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setMessage('Password changed successfully!')
                setSettingsData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }))
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('An error occurred while changing password')
        } finally {
            setIsSaving(false)
        }
    }

    const handleMessageSettingsChange = async () => {
        try {
            const response = await fetch('/api/toggle-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isAcceptingMessages: settingsData.isAcceptingMessages,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setMessage('Message settings updated successfully!')
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('An error occurred while updating message settings')
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Link href="/home" className="text-2xl font-bold text-gray-900 hover:text-indigo-600">
                                SageSpace
                            </Link>
                            <span className="ml-4 text-sm text-gray-500">Settings</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/home"
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
                    <p className="text-gray-600">Manage your account preferences and security</p>
                </div>

                <div className="space-y-8">
                    {/* Account Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={session.user.username}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={session.user.email || ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Account Status
                                </label>
                                <div className="flex items-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${session.user.isVerified
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {session.user.isVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Member Since
                                </label>
                                <p className="text-gray-900">
                                    {session.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Message Settings */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Message Settings</h2>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Accept Messages</h3>
                                <p className="text-sm text-gray-600">
                                    Allow other users to send you messages
                                </p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isAcceptingMessages"
                                    name="isAcceptingMessages"
                                    checked={settingsData.isAcceptingMessages}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isAcceptingMessages" className="ml-2 text-sm text-gray-700">
                                    {settingsData.isAcceptingMessages ? 'Enabled' : 'Disabled'}
                                </label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleMessageSettingsChange}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Update Message Settings
                            </button>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={settingsData.currentPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={settingsData.newPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={settingsData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
                                >
                                    {isSaving ? 'Changing Password...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
                        <h2 className="text-xl font-semibold text-red-900 mb-6">Danger Zone</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
                                    <p className="text-sm text-gray-600">
                                        Permanently delete your account and all associated data
                                    </p>
                                </div>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                            // Handle account deletion
                                            alert('Account deletion feature not implemented yet')
                                        }
                                    }}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-red-800 text-sm">{error}</p>
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <p className="text-green-800 text-sm">{message}</p>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link
                                href="/profile"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                Edit Profile
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
                            <Link
                                href="/home"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                Go to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 