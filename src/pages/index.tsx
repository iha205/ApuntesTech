import React from 'react';
import UploadForm from '@/components/formulario';
import { DataFormulario } from '@/interfaces';
import Link from 'next/link';
import { geistSans, geistMono } from '@/fonts';

export default function Home() {
    const handleFormSubmit = async (formData: DataFormulario) => {
        const { archivo } = formData;
        console.log(archivo)

        await fetch(`/api/upload`, {
            method: 'POST',
            body: archivo
        });
    };

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]`}
        >
            <UploadForm onSubmit={handleFormSubmit} />
            <Link href="/apuntes">
                <button className="disabled:bg-gray-500 w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4">
                    Ir a Apuntes
                </button>
            </Link>
        </div>
    );
}
