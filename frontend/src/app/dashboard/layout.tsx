import { nextAuthOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
    children: ReactNode
}
export default async function PrivateLayout({children}:PrivateLayoutProps) {
    const session = await getServerSession(nextAuthOption)
    if(!session){
        redirect('/auth/login')
    }

    return <>{children}</>
    
}