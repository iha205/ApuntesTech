import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Header from '@/components/header';

import './globals.css';
import SessionWrapper from './components/session';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'ApuntesTech',
    description: 'apuntes de tecnologias'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionWrapper>
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header />
                {children}
            </body>
        </html>
        </SessionWrapper>
    );
}
