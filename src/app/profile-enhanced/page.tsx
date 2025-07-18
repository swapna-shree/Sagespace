'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

// Profile validation schema
const profileSchema = z.object({
    displayName: z
        .string()
        .min(1, 'Display name is required')
        .max(50, 'Display name must be less than 50 characters')
        .optional(),
    avatarUrl: z
        .string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfileEnhanced() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [avatarError, setAvatarError] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
        reset,
        setValue
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: 'onChange'
    })

    const watchedAvatarUrl = watch('avatarUrl')

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push('/signin')
        } else {
            // Set initial form values
            setValue('displayName', session.user.displayName || '')
            setValue('avatarUrl', session.user.avatarUrl || '')
            setIsLoading(false)
        }
    }, [session, status, router, setValue])

    const onSubmit = async (data: ProfileFormData) => {
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
                    displayName: data.displayName || '',
                    avatarUrl: data.avatarUrl || '',
                }),
            })

            const result = await response.json()

            if (result.success) {
                setMessage('Profile updated successfully!')
                reset(data) // Reset form with new values
                // Update session data
                if (session) {
                    session.user.displayName = data.displayName || ''
                    session.user.avatarUrl = data.avatarUrl || ''
                }
            } else {
                setError(result.message)
            }
        } catch (error) {
            setError('An error occurred while updating your profile')
        } finally {
            setIsSaving(false)
        }
    }

    const handleAvatarError = () => {
        setAvatarError(true)
    }

    const handleAvatarLoad = () => {
        setAvatarError(false)
    }

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-indigo-600" />
                    <p className="text-gray-600">Loading...</p>
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
                            <span className="ml-4 text-sm text-gray-500">Profile</span>
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
                    <p className="text-gray-600">Manage your personal information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your display name and profile picture
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            value={session.user.username}
                                            disabled
                                            className="bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Username cannot be changed</p>
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={session.user.email}
                                            disabled
                                            className="bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                                    </div>

                                    <div>
                                        <Label htmlFor="displayName">Display Name</Label>
                                        <Input
                                            id="displayName"
                                            type="text"
                                            placeholder="Enter your display name"
                                            {...register('displayName')}
                                            className={errors.displayName ? 'border-red-500' : ''}
                                        />
                                        {errors.displayName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
                                        )}
                                        <p className="mt-1 text-sm text-gray-500">This is how others will see your name</p>
                                    </div>

                                    <div>
                                        <Label htmlFor="avatarUrl">Avatar URL</Label>
                                        <Input
                                            id="avatarUrl"
                                            type="url"
                                            placeholder="https://example.com/avatar.jpg"
                                            {...register('avatarUrl')}
                                            className={errors.avatarUrl ? 'border-red-500' : ''}
                                        />
                                        {errors.avatarUrl && (
                                            <p className="mt-1 text-sm text-red-600">{errors.avatarUrl.message}</p>
                                        )}
                                        <p className="mt-1 text-sm text-gray-500">Link to your profile picture</p>
                                    </div>

                                    {error && (
                                        <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-md">
                                            {error}
                                        </div>
                                    )}

                                    {message && (
                                        <div className="text-green-600 text-sm p-3 bg-green-50 border border-green-200 rounded-md">
                                            {message}
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => reset()}
                                            disabled={!isDirty}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSaving || !isValid || !isDirty}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Preview */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <Avatar className="w-24 h-24 mx-auto mb-4">
                                        <AvatarImage
                                            src={watchedAvatarUrl || session.user.avatarUrl}
                                            alt="Avatar"
                                            onError={handleAvatarError}
                                            onLoad={handleAvatarLoad}
                                        />
                                        <AvatarFallback>
                                            {session.user.displayName?.charAt(0) || session.user.username?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>

                                    <h4 className="text-lg font-medium text-gray-900">
                                        {watchedAvatarUrl ? (watch('displayName') || session.user.username) : (session.user.displayName || session.user.username)}
                                    </h4>
                                    <p className="text-sm text-gray-500">@{session.user.username}</p>

                                    <div className="mt-4 text-sm text-gray-600">
                                        <p>Email: {session.user.email}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Link
                                        href="/settings"
                                        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        Account Settings
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        View Dashboard
                                    </Link>
                                    <Link
                                        href="/messages"
                                        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        View Messages
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
} 