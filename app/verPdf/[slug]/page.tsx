'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'next/navigation';
import axios from 'axios';

import { BlobFile } from '@/interfaces';
import { geistMono, geistSans } from '@/fonts';

// Configuración de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function PagePDF() {
    // --- Variables ---
    // Obtiene el parámetro 'slug' de la URL
    const { slug } = useParams();
    // Convierte el slug (string) en un objeto BlobFile
    const item: BlobFile = useMemo(() => JSON.parse(decodeURIComponent(slug as string)), [slug]);

    // --- Hooks ---
    const [pdfData, setPdfData] = useState<{ base64: string; numPages: number } | null>(null); // Datos del PDF (base64 y número de páginas)
    const [isLoading, setIsLoading] = useState<boolean>(true); // Indica si se está cargando el PDF
    const [error, setError] = useState<string | null>(null); // Almacena el mensaje de error, si ocurre alguno
    const [containerWidth, setContainerWidth] = useState<number>(0); // Ancho del contenedor del PDF

    // --- Referencias ---
    const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor del PDF

    // --- Métodos ---

    /**
     * Obtiene el PDF desde la URL y lo convierte a base64.
     * También obtiene el número de páginas del PDF.
     */
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

    /**
     * Actualiza el ancho del contenedor del PDF.
     */
    const handleResize = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    };

    /**
     * Renderiza el PDF en el componente.
     * @returns JSX.Element | null
     */
    const renderPdf = () => {
        if (!pdfData) return null;

        return (<>
        <div className='flex justify-center fixed top-20 left-0 right-0 z-10'>
            <a
                    href={`data:application/pdf;base64,${pdfData.base64}`}
                    download={`${item.pathname.split('*')[0]}.pdf`}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer flex"
                >
                    Descargar PDF
                </a>
                </div>
            <div className="flex flex-col items-center max-w-7xl m-auto" ref={containerRef}>
                <Document
                    file={`data:application/pdf;base64,${pdfData.base64}`}
                    className={`flex max-w-full justify-center p-4 visible`}
                    onLoadSuccess={handleResize} // Ejecuta handleResize cuando el documento se carga correctamente
                >
                    <div className="flex flex-col items-center">
                        {Array.from({ length: pdfData.numPages }, (_, index) => (
                            <div key={index} className="mb-4 w-full max-w-full">
                                <Page
                                    pageNumber={index + 1}
                                    className={`PDFPage panel w-full max-w-full`}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    width={containerWidth}
                                />
                            </div>
                        ))}
                    </div>
                </Document>
                
            </div>
            </>
        );
    };

    // --- Efectos ---

    // Efecto para cargar el PDF al montar el componente o cuando cambia la URL de descarga
    useEffect(() => {
        if (item.downloadUrl) {
            fetchBase64();
        }
    }, []);

    // Efecto para manejar el redimensionamiento de la ventana
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Renderizado ---
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