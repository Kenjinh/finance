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
            return await axios.post(
                "http://backend:8000/api/account/auth/",
                {"username": credentials?.username, "password": credentials?.password },
                {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error.response.data);
              throw new Error(error.response.data.error);
            }) || null;
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