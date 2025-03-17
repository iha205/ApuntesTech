import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import UploadForm from '@/components/formulario';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export default function Home() {
    const handleFormSubmit = (formData: any) => {
        console.log(formData);
    };

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]`}
        >
            <UploadForm onSubmit={handleFormSubmit} />
        </div>
    );
}
