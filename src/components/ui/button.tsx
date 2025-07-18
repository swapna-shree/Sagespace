import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Profile() {
    const { data: session, status } = useSession();
    if (status === 'loading') return <div>Loading...</div>;
    if (!session) return null;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #FDF6F0 0%, #FAFAFA 100%)',
            color: '#333333',
            fontFamily: 'Inter, Manrope, Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <header style={{
                background: 'transparent',
                borderBottom: '1px solidrgb(219, 205, 205)',
                padding: '1.5rem 0 1rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(183, 211, 198, 0.04)'
            }}>
                <div style={{
                    maxWidth: '112rem',
                    margin: '0 auto',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: '2.8rem',
                        fontWeight: 800,
                        color: '#333333',
                        letterSpacing: '-0.02em',
                        fontFamily: 'Manrope, Inter, Arial, sans-serif', // Manrope will be used if loaded
                        textAlign: 'center',
                        userSelect: 'none'
                    }}>
                        SageSpace
                    </span>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginLeft: '2.5rem' }}>
                        <Link href="/" style={{ color: '#333333', fontWeight: 500, textDecoration: 'none' }}>Home</Link>
                        <Link href="/dashboard" style={{ color: '#333333', fontWeight: 500, textDecoration: 'none' }}>Dashboard</Link>
                        <Link href="/messages" style={{ color: '#333333', fontWeight: 500, textDecoration: 'none' }}>Messages</Link>
                        <Link href="/profile" style={{ color: '#B7D3C6', fontWeight: 500, textDecoration: 'none' }}>Profile</Link>
                    </nav>
                </div>
            </header>
            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                {/*profile content here */}
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Your Profile</h1>
            </main>
        </div>
    );
} 