'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Error() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const getErrorDetails = (errorCode: string | null) => {
        switch (errorCode) {
            case 'Configuration':
                return {
                    title: 'Server Error',
                    message: 'There is a problem with the server configuration.',
                    suggestion: 'Please try again later or contact support.'
                }
            case 'AccessDenied':
                return {
                    title: 'Access Denied',
                    message: 'You do not have permission to sign in.',
                    suggestion: 'Please contact an administrator if you believe this is an error.'
                }
            case 'Verification':
                return {
                    title: 'Verification Required',
                    message: 'Please verify your email address before signing in.',
                    suggestion: 'Check your email for a verification link or request a new one.'
                }
            case 'CredentialsSignin':
                return {
                    title: 'Invalid Credentials',
                    message: 'The email/username or password you entered is incorrect.',
                    suggestion: 'Please check your credentials and try again.'
                }
            case 'OAuthSignin':
                return {
                    title: 'OAuth Error',
                    message: 'There was an error during the OAuth sign-in process.',
                    suggestion: 'Please try signing in with a different method.'
                }
            case 'OAuthCallback':
                return {
                    title: 'OAuth Callback Error',
                    message: 'There was an error during the OAuth callback.',
                    suggestion: 'Please try signing in again.'
                }
            case 'OAuthCreateAccount':
                return {
                    title: 'Account Creation Error',
                    message: 'Could not create OAuth provider user in the database.',
                    suggestion: 'Please try signing in with a different method.'
                }
            case 'EmailCreateAccount':
                return {
                    title: 'Account Creation Error',
                    message: 'Could not create email provider user in the database.',
                    suggestion: 'Please try signing up again.'
                }
            case 'Callback':
                return {
                    title: 'Callback Error',
                    message: 'There was an error during the callback process.',
                    suggestion: 'Please try signing in again.'
                }
            case 'OAuthAccountNotLinked':
                return {
                    title: 'Account Not Linked',
                    message: 'This account is not linked to your existing account.',
                    suggestion: 'Please sign in with the same account you used originally.'
                }
            case 'EmailSignin':
                return {
                    title: 'Email Sign-in Error',
                    message: 'The email could not be sent.',
                    suggestion: 'Please check your email address and try again.'
                }
            case 'CredentialsSignup':
                return {
                    title: 'Sign-up Error',
                    message: 'There was an error during the sign-up process.',
                    suggestion: 'Please try signing up again.'
                }
            case 'SessionRequired':
                return {
                    title: 'Session Required',
                    message: 'You must be signed in to access this page.',
                    suggestion: 'Please sign in to continue.'
                }
            default:
                return {
                    title: 'An Error Occurred',
                    message: 'Something went wrong. Please try again.',
                    suggestion: 'If the problem persists, please contact support.'
                }
        }
    }

    const errorDetails = getErrorDetails(error)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {errorDetails.title}
                    </h1>
                    <p className="text-gray-600 mb-4">
                        {errorDetails.message}
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        {errorDetails.suggestion}
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/signin"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Try Signing In Again
                    </Link>

                    <Link
                        href="/signup"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Account
                    </Link>

                    <Link
                        href="/"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to Home
                    </Link>
                </div>

                {error && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md">
                        <p className="text-xs text-gray-600">
                            Error Code: <code className="bg-gray-200 px-1 rounded">{error}</code>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
} 