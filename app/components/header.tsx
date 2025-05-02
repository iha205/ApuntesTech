'use client';

import Link from 'next/link';

import { geistMono, geistSans } from '@/fonts';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FiLogIn, FiLogOut, FiUpload } from 'react-icons/fi';

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
                            <Link
                                href="/subirApunte"
                                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                            >
                                <FiUpload className="md:hidden h-5 w-5" />
                                <span className="hidden md:inline">Subir Apuntes</span>
                            </Link>
                        </li>
                        {session ? (
                            <>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                                    >
                                        <FiLogOut className="md:hidden h-5 w-5" />
                                        <span className="hidden md:inline">Cerrar sesión de {session.user?.name}</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    onClick={() => signIn('github')}
                                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                                >
                                    <FiLogIn className="md:hidden h-5 w-5" />
                                    <span className="hidden md:inline">Login</span>
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
