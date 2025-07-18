'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Message {
    content: string
    createdAt: string
    isFromUser: boolean
    isAI: boolean
}

export default function Dashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAcceptingMessages, setIsAcceptingMessages] = useState(true)

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push('/signin')
        } else {
            setIsAcceptingMessages(session.user.isAcceptingMessages)
            fetchMessages()
        }
    }, [session, status, router])

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setMessages(data.messages || [])
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleMessageAcceptance = async () => {
        try {
            const response = await fetch('/api/toggle-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isAcceptingMessages: !isAcceptingMessages,
                }),
            })

            if (response.ok) {
                setIsAcceptingMessages(!isAcceptingMessages)
            }
        } catch (error) {
            console.error('Error toggling message acceptance:', error)
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
                            <span className="ml-4 text-sm text-gray-500">Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/home"
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/profile"
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Dashboard</h1>
                    <p className="text-gray-600">Manage your messages and account settings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="text-2xl text-indigo-600 mr-4">💌</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="text-2xl text-green-600 mr-4">✓</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Account Status</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {session.user.isVerified ? 'Verified' : 'Unverified'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="text-2xl text-blue-600 mr-4">🔔</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Message Settings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {isAcceptingMessages ? 'Accepting' : 'Paused'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Settings */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Message Settings</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-700">Accept messages from others</p>
                            <p className="text-sm text-gray-500">
                                When enabled, other users can send you messages
                            </p>
                        </div>
                        <button
                            onClick={toggleMessageAcceptance}
                            className={`px-4 py-2 rounded-md font-medium ${isAcceptingMessages
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                        >
                            {isAcceptingMessages ? 'Pause Messages' : 'Accept Messages'}
                        </button>
                    </div>
                </div>

                {/* Messages Section */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Messages</h2>
                    </div>

                    <div className="p-6">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">💭</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                                <p className="text-gray-600 mb-4">
                                    When you receive messages, they'll appear here
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                                    <p className="text-sm text-gray-600">
                                        Your public profile: <strong>sagespace.vercel.app/{session.user.username}</strong>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.slice(0, 10).map((message, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-gray-900">{message.content}</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {new Date(message.createdAt).toLocaleDateString()} at{' '}
                                                    {new Date(message.createdAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                {message.isAI ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        AI Response
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        User Message
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {messages.length > 10 && (
                                    <div className="text-center pt-4">
                                        <Link
                                            href="/messages"
                                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                                        >
                                            View all {messages.length} messages →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/profile"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                Edit Profile
                            </Link>
                            <Link
                                href="/settings"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                Account Settings
                            </Link>
                            <Link
                                href="/messages"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                View All Messages
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Username:</span>
                                <span className="font-medium">{session.user.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email Verified:</span>
                                <span className={session.user.isVerified ? 'text-green-600' : 'text-red-600'}>
                                    {session.user.isVerified ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Accepting Messages:</span>
                                <span className={isAcceptingMessages ? 'text-green-600' : 'text-red-600'}>
                                    {isAcceptingMessages ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 