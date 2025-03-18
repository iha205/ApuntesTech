import React, { useState, ChangeEvent, useEffect } from 'react';
import { FormData } from '@/interfaces';
import Link from 'next/link';
import { geistMono, geistSans } from '@/fonts';
import axios from 'axios';

// Fictional data for demonstration
const initialData: FormData[] = [
    {
        nombrePdf: 'Calculo I - Tema 1',
        asignatura: 'Calculo',
        archivo: new File([''], 'CalculoI-Tema1.pdf', { type: 'application/pdf' })
    },
    {
        nombrePdf: 'Algebra Lineal - Matrices',
        asignatura: 'Algebra',
        archivo: new File([''], 'AlgebraLineal-Matrices.pdf', { type: 'application/pdf' })
    },
    {
        nombrePdf: 'Fisica I - Cinemática',
        asignatura: 'Fisica',
        archivo: new File([''], 'FisicaI-Cinematica.pdf', { type: 'application/pdf' })
    },
    {
        nombrePdf: 'Calculo II - Integrales',
        asignatura: 'Calculo',
        archivo: new File([''], 'CalculoII-Integrales.pdf', { type: 'application/pdf' })
    },
    {
        nombrePdf: 'Programacion - Introduccion',
        asignatura: 'Programacion',
        archivo: new File([''], 'Programacion-Introduccion.pdf', { type: 'application/pdf' })
    },
    {
        nombrePdf: 'Algebra - Vectores',
        asignatura: 'Algebra',
        archivo: new File([''], 'Algebra-Vectores.pdf', { type: 'application/pdf' })
    },
    {
        nombrePdf: 'Fisica II - Electromagnetismo',
        asignatura: 'Fisica',
        archivo: new File([''], 'FisicaII-Electromagnetismo.pdf', { type: 'application/pdf' })
    }
];

export default function Apuntes() {
    const [formDataList] = useState<FormData[]>(initialData);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<FormData[]>(initialData);

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        debugger;
        await axios
            .get('/api/hello')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = formDataList.filter((item) => {
            return item.nombrePdf.toLowerCase().includes(term) || item.asignatura.toLowerCase().includes(term);
        });
        setFilteredData(filtered);
    };

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} flex font-[family-name:var(--font-geist-sans)]`}
        >
            <div className="bg-white p-8 rounded-lg w-full max-w-xl m-auto mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Apuntes</h1>

                <div className="w-full max-w-2xl mb-8">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o asignatura..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                    />
                </div>

                <div className="w-full max-w-2xl">
                    {filteredData.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {filteredData.map((item, index) => (
                                <li key={index} className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{item.nombrePdf}</p>
                                            <p className="text-sm text-gray-600">{item.asignatura}</p>
                                        </div>
                                        <Link href={`/pdfs/${index}`} passHref legacyBehavior>
                                            <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                Visualizar
                                            </a>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <p className="text-gray-600">No se encontraron resultados.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
