"use client";
import Link from "next/link";
import SaasNavbar from "@/components/SaasNavbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      <SaasNavbar />
      <main className="flex-1 flex flex-col justify-center pb-24">
        {/* About Section */}
        <section className="w-full bg-transparent py-8 px-4 sm:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-wide text-[#111] mb-4 font-['General_Sans',_sans-serif]">
            A Space to Just Be
          </h1>
          <p className="text-lg md:text-xl text-[#222] leading-relaxed tracking-normal max-w-3xl mx-auto mb-8 font-['Inter',_sans-serif]">
            Discover comfort, support, and growth in a warm, judgment-free community. At SageSpace, you’re free to share your thoughts, connect with understanding people, and take steps toward healing—always with kindness and care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link
              href="/signup"
              className="rounded-full px-8 py-3 bg-[#B7D3C6] text-[#222] text-lg font-semibold tracking-wide shadow-md hover:scale-105 transition-transform duration-300 border border-[#EDEDED]"
            >
              Join SageSpace
            </Link>
          </div>
        </section>
        {/* Features Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 xl:gap-16">
            <div className="bg-[#B7D3C6]/60 rounded-2xl shadow-lg p-8 flex flex-col items-center aspect-[4/5] justify-between transition-transform hover:scale-105 hover:shadow-2xl">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B7D3C6]/80 border border-[#7CA08B] shadow-sm">
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <ellipse cx="14" cy="14" rx="10" ry="6" fill="#7CA08B" />
                    <ellipse cx="14" cy="14" rx="6" ry="3" fill="#B7D3C6" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-wide font-['General_Sans',_sans-serif] mb-2 text-[#357960]">Share Freely</h3>
              <p className="text-base md:text-lg text-[#357960] leading-relaxed font-['Inter',_sans-serif] text-center">
                Express yourself without fear of judgment in a safe, supportive environment.
              </p>
            </div>
            <div className="bg-[#F5D2C8]/60 rounded-2xl shadow-lg p-8 flex flex-col items-center aspect-[4/5] justify-between transition-transform hover:scale-105 hover:shadow-2xl">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5D2C8]/80 border border-[#E2AFAF] shadow-sm">
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <ellipse cx="14" cy="14" rx="10" ry="6" fill="#E2AFAF" />
                    <path d="M9 18c2-2 8-2 10 0" stroke="#C97B63" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-wide font-['General_Sans',_sans-serif] mb-2 text-[#A0522D]">Find Support</h3>
              <p className="text-base md:text-lg text-[#A0522D] leading-relaxed font-['Inter',_sans-serif] text-center">
                Connect with others who understand and offer genuine support and empathy.
              </p>
            </div>
            <div className="bg-[#E0DFF6]/60 rounded-2xl shadow-lg p-8 flex flex-col items-center aspect-[4/5] justify-between transition-transform hover:scale-105 hover:shadow-2xl">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E0DFF6]/80 border border-[#A3A0C7] shadow-sm">
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <ellipse cx="14" cy="14" rx="10" ry="6" fill="#A3A0C7" />
                    <path d="M14 20v-6M14 14c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z" stroke="#7CA08B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-wide font-['General_Sans',_sans-serif] mb-2 text-[#357960]">Grow & Heal</h3>
              <p className="text-base md:text-lg text-[#357960] leading-relaxed font-['Inter',_sans-serif] text-center">
                Take steps towards personal growth and healing in a nurturing community.
              </p>
            </div>
          </div>
        </section>
        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-[#111] mb-4 font-['General_Sans',_sans-serif]">
            Ready to find your quiet corner?
          </h3>
          <Link
            href="/signup"
            className="rounded-full px-8 py-3 bg-[#B7D3C6] text-[#111] text-lg font-medium shadow-md border border-[#EDEDED] transition-colors hover:bg-[#A3C7B5]"
          >
            Create Your Account
          </Link>
        </div>
      </main>
      <footer className="w-full py-5 bg-[#E0DFF6] bg-opacity-95 text-center text-[#4B6A5A] text-base font-medium border-t border-[#C7C6E6] shadow-sm">
        &copy; {new Date().getFullYear()} <span className="font-bold tracking-wide">SageSpace</span>. All rights reserved.
      </footer>
    </div>
  );
}
