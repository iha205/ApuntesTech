"use client";

import Link from 'next/link';

import { geistMono, geistSans } from '@/fonts';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();
    
    return (
        <header
            className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 p-4 shadow-md fixed top-0 w-full z-10 left-0 right-0`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                    ApuntesTech
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/subirApunte" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Subir Apuntes
                            </Link>
                        </li>
                        {session ? (
                            <li>
                                <button onClick={() => signOut()} className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Cerrar sesión
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={() => signIn('github')} className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Login
                                </button>
                            </li>
                        )}

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
