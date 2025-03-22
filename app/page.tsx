import React from 'react';
import UploadForm from '@/components/formulario';
import Link from 'next/link';
import { geistSans, geistMono } from '@/fonts';

export default function Page() {
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]`}
        >
            <UploadForm />
            <Link href="/apuntes">
                <button className="disabled:bg-gray-500 w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 cursor-pointer">
                    Ir a Apuntes
                </button>
            </Link>
        </div>
    );
}
