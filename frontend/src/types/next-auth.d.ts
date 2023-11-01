import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user: {
            id: String
            username: String
            token: String
        }
    }
}