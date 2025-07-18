"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const result = await signIn("credentials", {
                identifier,
                password,
                redirect: false,
            });
            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/home");
            }
        } catch (error) {
            setError("An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <input
                type="text"
                placeholder="Email or Username"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
                className="border p-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
            </button>
            {error && <div className="mt-2 text-red-600">{error}</div>}
        </form>
    );
} 