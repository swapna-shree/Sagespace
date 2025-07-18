'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from 'use-debounce'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

// Enhanced validation schema
const signUpSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z
        .string()
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type SignUpFormData = z.infer<typeof signUpSchema>

interface UsernameCheckResult {
    available: boolean
    loading: boolean
}

export default function SignUpEnhanced() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [usernameCheck, setUsernameCheck] = useState<UsernameCheckResult>({
        available: false,
        loading: false
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        setError,
        clearErrors
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange'
    })

    const watchedUsername = watch('username')
    const [debouncedUsername] = useDebounce(watchedUsername, 500)

    // Debounced username availability check
    const checkUsernameAvailability = async (username: string) => {
        if (!username || username.length < 3) {
            setUsernameCheck({ available: false, loading: false })
            return
        }

        setUsernameCheck({ available: false, loading: true })

        try {
            const response = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`)
            const data = await response.json()

            setUsernameCheck({
                available: data.success,
                loading: false
            })

            if (!data.success) {
                setError('username', { message: 'Username is already taken' })
            } else {
                clearErrors('username')
            }
        } catch (error) {
            setUsernameCheck({ available: false, loading: false })
        }
    }

    // Check username when debounced value changes
    useEffect(() => {
        if (debouncedUsername) {
            checkUsernameAvailability(debouncedUsername)
        }
    }, [debouncedUsername])

    const onSubmit = async (data: SignUpFormData) => {
        setIsSubmitting(true)
        setSubmitMessage('')

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            })

            const result = await response.json()

            if (result.success) {
                setSubmitMessage('Account created successfully! Please check your email for verification.')
                setTimeout(() => {
                    router.push(`/verify?email=${encodeURIComponent(data.email)}`)
                }, 2000)
            } else {
                setSubmitMessage(result.message)
            }
        } catch (error) {
            setSubmitMessage('An error occurred during sign up')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Join SageSpace
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create your quiet corner of the internet
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    {...register('username')}
                                    className={errors.username ? 'border-red-500' : ''}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {usernameCheck.loading && (
                                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                    )}
                                    {!usernameCheck.loading && watchedUsername && watchedUsername.length >= 3 && (
                                        <>
                                            {usernameCheck.available ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-red-500" />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register('password')}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register('confirmPassword')}
                                className={errors.confirmPassword ? 'border-red-500' : ''}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                        <div className={`text-sm text-center p-3 rounded-md ${submitMessage.includes('successfully')
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {submitMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid || usernameCheck.loading}
                        className="w-full"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Create account'
                        )}
                    </Button>

                    {/* Sign In Link */}
                    <div className="text-center">
                        <Link href="/signin" className="text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
} 