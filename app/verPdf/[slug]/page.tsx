'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'next/navigation';
import axios from 'axios';

import { BlobFile } from '@/interfaces';

import { geistMono, geistSans } from '@/fonts';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function PagePDF() {
    const { slug } = useParams();
    const item: BlobFile = useMemo(() => JSON.parse(decodeURIComponent(slug as string)), [slug]);

    const [pdfData, setPdfData] = useState<{ base64: string; numPages: number } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBase64 = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(item.downloadUrl, {
                    responseType: 'arraybuffer'
                });

                const base64 = Buffer.from(response.data, 'binary').toString('base64');
                const pdf = await pdfjs.getDocument({ data: response.data }).promise;
                const numPages = pdf.numPages;
                setPdfData({ base64, numPages });
            } catch (err) {
                console.error('Error fetching or converting to base64:', err);
                setError('Error al cargar el PDF.');
            } finally {
                setIsLoading(false);
            }
        };

        if (item.downloadUrl) {
            fetchBase64();
        }
    }, [item.downloadUrl]);

    const renderPdf = () => {
        if (!pdfData) return null;

        return (
            <div className="flex flex-col items-center">
                <Document
                    file={`data:application/pdf;base64,${pdfData.base64}`}
                    className={`flex max-w-none justify-center p-4 visible`}
                >
                    <div className="flex flex-col">
                        {Array.from({ length: pdfData.numPages }, (_, index) => (
                            <div key={index} className="mb-4">
                                <Page
                                    pageNumber={index + 1}
                                    className={`PDFPage panel`}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                            </div>
                        ))}
                    </div>
                </Document>
                <a
                    href={`data:application/pdf;base64,${pdfData.base64}`}
                    download={`${item.pathname.split('*')[0]}.pdf`}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mt-4 inline-block"
                >
                    Descargar PDF
                </a>
            </div>
        );
    };

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} p-8 pt-20 font-[family-name:var(--font-geist-sans)]`}
        >
            {isLoading && <div className="text-center">Cargando PDF...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!isLoading && !error && renderPdf()}
        </div>
    );
}
