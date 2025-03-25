import React from 'react';
import UploadForm from '@/components/formulario';
import { geistSans, geistMono } from '@/fonts';

export default function Page() {
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] px-4`}
        >
            <UploadForm />
        </div>
    );
}
