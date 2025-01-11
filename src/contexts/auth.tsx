"use client"
import { NotLoggedIn } from '@/components/auth/authBlock';
import { AuthWrapper } from '@/components/auth/wrapper';
import { Dialog } from '@/components/ui/dialog';
import { Spinner } from '@/components/utils/spinner';
import supabase from '@/lib/supabase';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

interface Auth_I {
    handleEmailSignIn: Function,
    handleEmailSignUp: Function,
    handleLogout: Function,
    user: undefined | any,
    toggleAuthUi: Function,
    isLoading: boolean
}

const default_vars: Auth_I = {
    handleEmailSignIn: () => { },
    handleEmailSignUp: () => { },
    handleLogout: () => { },
    user: undefined,
    toggleAuthUi: () => { },
    isLoading: false
}

// Create the Context
const AuthContext = createContext(default_vars);

// Create the Context Provider Component
export const AuthProvider = ({ children }: { children: any }) => {

    const PROTECTED_SLUG = "/app"

    const [user, setUser] = useState<undefined | any>()
    const [showAuthUi, toggleAuthUi] = useState<boolean>(false)
    const [isLoading, toggleLoading] = useState(true);
    const path = usePathname();
    let currentSession:any;

    const handleEmailSignIn = async (email: string, pwd: string) => {
        toggleLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pwd,
        })
        toggleLoading(false)
        if (error) {
            console.log(error);
        } else {
            return;
        }
    }

    const handleEmailSignUp = async (email: string, pwd: string, name: string) => {
        toggleLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: pwd,
            options: {
                data: {
                    name: name,
                }
            },
        })
        toggleLoading(false)
        if (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
    }

    const vals = useMemo(() => {
        return ({
            handleEmailSignIn,
            handleEmailSignUp,
            handleLogout,
            user,
            toggleAuthUi,
            isLoading
        })
    }, [user])

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event:any, session:any) => {
            if (session?.user?.id == currentSession?.user?.id) return;
            currentSession = session;

            if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
                setUser(session.user);
                toggleLoading(false);
            }

            if (event === 'SIGNED_OUT') {
                setUser(null);
                toggleLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);



    return (
        <AuthContext.Provider value={vals}>
            {path.includes(PROTECTED_SLUG) ?
                <>
                    {user ?
                        <>{children}</>
                    :
                        <>
                            {isLoading ?
                                <Spinner/>
                            :
                                <NotLoggedIn/>
                            }
                        </>
                    }
                </>
            :
                <>
                    {children}
                </>
            }
            
            <Dialog open={showAuthUi} onOpenChange={(open) => { toggleAuthUi(open) }}>
                <AuthWrapper />
            </Dialog>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};