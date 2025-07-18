"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        setMessage(data.message || data.error);
        if (data.message === "Verification successful") {
            setTimeout(() => {
                router.push("/home");
            }, 1500);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="border p-2"
            />
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Verify</button>
            {message && <div className="mt-2">{message}</div>}
        </form>
    );
} 