import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();
                if (!credentials) return null;
                const identifier = (credentials as any).identifier;
                const password = (credentials as any).password;
                if (!identifier || !password) return null;
                const user = await User.findOne({
                    $or: [
                        { email: identifier },
                        { username: identifier },
                    ],
                });
                if (!user) return null;
                if (!user.isVerified) return null;
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) return null;
                // Return a plain object with required fields
                return {
                    id: String(user._id),
                    email: user.email,
                    name: user.username,
                } as NextAuthUser;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async session({ session, token }: any) {
            try {
                if (token) {
                    // Fetch user from DB to get more fields
                    await dbConnect();
                    const user = await User.findOne({ email: token.email });
                    if (user) {
                        session.user = {
                            id: String(user._id),
                            email: user.email,
                            username: user.username,
                            isVerified: user.isVerified,
                            avatarUrl: user.avatarUrl,
                            displayName: user.displayName,
                        };
                    } else {
                        session.user = {
                            id: token.sub,
                            email: token.email,
                            username: token.name,
                        };
                    }
                }
                return session;
            } catch (error) {
                console.error('Session callback error:', error);
                return session;
            }
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions }; 