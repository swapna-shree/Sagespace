"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F0] to-[#FAFAFA] relative overflow-hidden">
      {/* SaaS-style header with nav links */}
      <header className="w-full bg-transparent border-b border-[#EDEDED] py-6 px-8 flex items-center justify-between z-20">
        <span className="text-4xl font-extrabold tracking-tight text-[#111] font-['General_Sans',_sans-serif] drop-shadow-sm">
          SageSpace
        </span>
        <nav className="flex gap-8 items-center">
          <Link href="/" className="text-[#111] font-medium hover:underline">Home</Link>
          <Link href="/dashboard" className="text-[#111] font-medium hover:underline">Dashboard</Link>
          <Link href="/messages" className="text-[#111] font-medium hover:underline">Messages</Link>
          <Link href="/profile" className="text-[#111] font-medium hover:underline">Profile</Link>
        </nav>
      </header>
      <main className="max-w-2xl mx-auto pt-40 pb-16 px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-[#111] mb-4 font-['General_Sans',_sans-serif]">
          A Space to Just Be
        </h1>
        <p className="text-lg md:text-xl text-[#222] leading-relaxed tracking-normal max-w-xl mx-auto mb-8 font-['Inter',_sans-serif]">
          Find comfort, support, and growth in a cozy, judgment-free community. SageSpace is a nurturing online space where you can express yourself freely, connect with others who understand, and take steps toward personal growth and healing. Whether you need to share, seek advice, or simply be heard, you’ll find a supportive environment here—no pressure, no judgment, just genuine care.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            href="/signup"
            className="rounded-full px-8 py-3 bg-[#B7D3C6] text-[#111] text-base md:text-lg font-medium tracking-wide shadow-md hover:scale-105 transition-transform duration-300 border border-[#EDEDED]"
          >
            Join SageSpace
          </Link>
          <Link
            href="/signin"
            className="rounded-full px-8 py-3 bg-[#E0DFF6] text-[#111] text-base md:text-lg font-medium tracking-wide shadow-md hover:scale-105 transition-transform duration-300 border border-[#EDEDED]"
          >
            Sign In
          </Link>
        </div>
        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center">
          <div>
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B7D3C6]/60 border border-[#7CA08B] shadow-sm">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <ellipse cx="14" cy="14" rx="10" ry="6" fill="#7CA08B" />
                  <ellipse cx="14" cy="14" rx="6" ry="3" fill="#B7D3C6" />
                </svg>
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide font-['General_Sans',_sans-serif] mb-2 text-[#111]">Share Freely</h3>
            <p className="text-sm md:text-base text-[#222] leading-relaxed font-['Inter',_sans-serif]">
              Express yourself without fear of judgment in a safe, supportive environment.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F5D2C8]/60 border border-[#E2AFAF] shadow-sm">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <ellipse cx="14" cy="14" rx="10" ry="6" fill="#E2AFAF" />
                  <path d="M9 18c2-2 8-2 10 0" stroke="#C97B63" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide font-['General_Sans',_sans-serif] mb-2 text-[#111]">Find Support</h3>
            <p className="text-sm md:text-base text-[#222] leading-relaxed font-['Inter',_sans-serif]">
              Connect with others who understand and offer genuine support and empathy.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E0DFF6]/60 border border-[#A3A0C7] shadow-sm">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <ellipse cx="14" cy="14" rx="10" ry="6" fill="#A3A0C7" />
                  <path d="M14 20v-6M14 14c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z" stroke="#7CA08B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide font-['General_Sans',_sans-serif] mb-2 text-[#111]">Grow & Heal</h3>
            <p className="text-sm md:text-base text-[#222] leading-relaxed font-['Inter',_sans-serif]">
              Take steps towards personal growth and healing in a nurturing community.
            </p>
          </div>
        </div>
        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-[#111] mb-4 font-['General_Sans',_sans-serif]">
            Ready to find your quiet corner?
          </h3>
          <Link
            href="/signup"
            className="bg-[#B7D3C6] text-[#111] px-8 py-3 rounded-md text-lg font-medium shadow-md border border-[#EDEDED] transition-colors hover:bg-[#A3C7B5]"
          >
            Create Your Account
          </Link>
        </div>
      </main>
    </div>
  );
}
