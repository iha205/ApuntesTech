import React from 'react';
import { GetServerSideProps } from 'next';

interface PageProps {
    slug: string;
}

import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export default function Page(props: PageProps) {
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">{props.slug}</main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { slug } = query;
    return {
        props: {
            slug
        }
    };
};
