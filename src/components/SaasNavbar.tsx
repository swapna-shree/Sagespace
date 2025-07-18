import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SaasNavbar() {
    const { data: session, status } = useSession();
    const isAuthenticated = !!session;
    return (
        <nav className="sticky top-0 w-full bg-[#F8F6F2]/80 backdrop-blur border-b border-[#EDEDED] py-4 px-8 flex items-center justify-between z-30 shadow-sm">
            <span className="text-3xl font-extrabold tracking-tight text-[#2F2F2F] font-['General_Sans',_sans-serif] drop-shadow-sm">
                SageSpace
            </span>
            <div className="flex gap-8 items-center">
                <Link href="/home" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link href="/messages" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Messages</Link>
                        <Link href="/profile" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Profile</Link>
                    </>
                ) : (
                    <>
                        <Link href="/signin" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Sign In</Link>
                        <Link href="/signup" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
} 