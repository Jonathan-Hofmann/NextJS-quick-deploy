"use client"

import { AuthProvider } from "@/contexts/auth"
import { Navbar } from "../navigation/navbar"
import { Footer } from "../navigation/footer"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import { AppSidebar } from "../navigation/sidebar"

export const ClientProviders = ({ children }: { children: any }) => {
    const path = usePathname();
    return (
        <SidebarProvider>
            <AuthProvider>
                {path.includes("/app") ?
                    <>
                        <AppSidebar />
                        <div className="w-full bg-zinc-100 dark:bg-zinc-900">
                            <SidebarTrigger />
                            <div className="container mx-auto">
                                {children}
                            </div>
                        </div>
                    </>
                    :
                    <div className="w-full">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                }
            </AuthProvider>
        </SidebarProvider>
    )
}