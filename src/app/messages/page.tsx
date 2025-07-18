'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SaasNavbar from "@/components/SaasNavbar";

interface Message {
    content: string
    createdAt: string
    isFromUser: boolean
    isAI: boolean
}

export default function Messages() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'user' | 'ai'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const messagesPerPage = 20

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push('/signin')
        } else {
            fetchMessages()
        }
    }, [session, status, router, currentPage])

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/messages?page=${currentPage}&limit=${messagesPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                setMessages(data.messages || [])
                setTotalPages(Math.ceil((data.total || 0) / messagesPerPage))
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredMessages = messages.filter(message => {
        if (filter === 'all') return true
        if (filter === 'user') return !message.isAI
        if (filter === 'ai') return message.isAI
        return true
    })

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading messages...</p>
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
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-[#FFF9F3] mb-4 font-['General_Sans',_sans-serif]">Your Messages</h1>
                <p className="text-lg md:text-xl text-[#B6C9B3] leading-relaxed tracking-normal font-['Inter',_sans-serif] mb-8">View and manage all your messages in a supportive, calming environment.</p>
                {/* Add messages content here, using the same dark palette for headings, text, and buttons */}

                {/* Stats and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">User Messages</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {messages.filter(m => !m.isAI).length}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">AI Responses</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {messages.filter(m => m.isAI).length}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">Filter:</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as 'all' | 'user' | 'ai')}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="all">All Messages</option>
                                <option value="user">User Messages</option>
                                <option value="ai">AI Responses</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Messages List */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {filter === 'all' ? 'All Messages' : filter === 'user' ? 'User Messages' : 'AI Responses'}
                        </h2>
                    </div>

                    <div className="p-6">
                        {filteredMessages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">💭</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                                <p className="text-gray-600 mb-4">
                                    {filter === 'all'
                                        ? "You haven't received any messages yet."
                                        : filter === 'user'
                                            ? "No user messages found."
                                            : "No AI responses found."
                                    }
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                                    <p className="text-sm text-gray-600">
                                        Your public profile: <strong>sagespace.vercel.app/{session.user.username}</strong>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredMessages.map((message, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    {message.isAI ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            AI Response
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            User Message
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(message.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-900 whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Settings</h3>
                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                Manage Message Settings
                            </Link>
                            <Link
                                href="/profile"
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Username:</span>
                                <span className="font-medium">{session.user.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Messages:</span>
                                <span className="font-medium">{messages.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Accepting Messages:</span>
                                <span className={session.user.isAcceptingMessages ? 'text-green-600' : 'text-red-600'}>
                                    {session.user.isAcceptingMessages ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 