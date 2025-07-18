import Image from "next/image";

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (session) {
      router.push('/home')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SageSpace</h1>
              <p className="text-gray-600">Your quiet corner of the internet</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            A Space to Just Be
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            SageSpace is a judgment-free corner of the internet where you can share your thoughts,
            receive support, and find peace. No pressure, no judgment, just understanding.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium"
            >
              Join SageSpace
            </Link>
            <Link
              href="/signin"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md text-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">💭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Freely</h3>
            <p className="text-gray-600">
              Express yourself without fear of judgment in a safe, supportive environment.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🤗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Support</h3>
            <p className="text-gray-600">
              Connect with others who understand and offer genuine support and empathy.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow & Heal</h3>
            <p className="text-gray-600">
              Take steps towards personal growth and healing in a nurturing community.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to find your quiet corner?
          </h3>
          <Link
            href="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium"
          >
            Create Your Account
          </Link>
        </div>
      </main>
    </div>
  )
}
