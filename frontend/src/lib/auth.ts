import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";

const nextAuthOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const response = await axios.post(
                "http://backend:8000/api/account/auth/",
                {"username": credentials?.username, "password": credentials?.password },
                {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                }
            )
            const data = response.data
            if (response.status == 200 && data.id) {
              return data;
            }
            return null
          }
        })
    ],
    pages: {
      signIn: '/auth/login'
    },
    callbacks:{
        async jwt({token, user}){
            user && (token.user = user)
            return token
        },
        async session({session, token}){
            session.user = token.user as any
            return session
        }
            
    }
}

export { nextAuthOption }