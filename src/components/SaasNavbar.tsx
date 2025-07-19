import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function SaasNavbar() {
    const { data: session, status } = useSession();
    const isAuthenticated = !!session;
    const pathname = usePathname();
    const router = useRouter();
    return (
        <nav className="sticky top-0 w-full bg-[#F8F6F2]/80 backdrop-blur border-b border-[#EDEDED] py-4 px-8 flex items-center justify-between z-30 shadow-sm">
            <span className="text-3xl font-extrabold tracking-tight text-[#2F2F2F] font-['General_Sans',_sans-serif] drop-shadow-sm">
                SageSpace
            </span>
            <div className="flex gap-8 items-center">
                {pathname === '/' ? (
                    isAuthenticated ? (
                        <>
                            <Link href="/home" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Home</Link>
                            <Link href="/messages" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Messages</Link>
                            <Link href="/profile" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Profile</Link>
                            <button
                                onClick={async () => {
                                    await signOut({ callbackUrl: '/' });
                                    router.refresh();
                                }}
                                className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition bg-transparent border-none cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" className="rounded-full px-5 py-2 bg-[#B7D3C6] text-[#222] font-semibold shadow hover:bg-[#A0C5B6] transition">Sign In</Link>
                            <Link href="/signup" className="rounded-full px-5 py-2 bg-[#E0DFF6] text-[#222] font-semibold shadow hover:bg-[#A3A0C7] transition">Sign Up</Link>
                        </>
                    )
                ) : (
                    isAuthenticated ? (
                        <>
                            <Link href="/home" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Home</Link>
                            <Link href="/messages" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Messages</Link>
                            <Link href="/profile" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Profile</Link>
                            <button
                                onClick={async () => {
                                    await signOut({ callbackUrl: '/' });
                                    router.refresh();
                                }}
                                className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition bg-transparent border-none cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Sign In</Link>
                            <Link href="/signup" className="text-[#2F2F2F] font-medium hover:text-[#A0C5B6] transition">Sign Up</Link>
                        </>
                    )
                )}
            </div>
        </nav>
    );
} 