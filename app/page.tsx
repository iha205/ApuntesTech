'use client';

import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { geistMono, geistSans } from '@/fonts';
import axios from 'axios';
import { BlobFile } from '@/interfaces';
import { formatDate, formatFileSize } from '@/utils/utils';
import { FaEye, FaDownload, FaTrash } from 'react-icons/fa'; // Import icons

export default function Page() {
    const [blobFiles, setBlobFiles] = useState<BlobFile[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<BlobFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlobFiles = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/pdfs');
            if (response.status === 200) {
                setBlobFiles(response.data.blobs);
            } else {
                setError('Error al cargar los datos.');
            }
        } catch (err) {
            console.error('Error al cargar los datos:', err);
            setError('Error al cargar los datos.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlobFiles();
    }, [fetchBlobFiles]);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = blobFiles.filter((item) => item.pathname.toLowerCase().includes(term));
        setFilteredData(filtered);
    }, [searchTerm, blobFiles]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (item: BlobFile) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar ${item.pathname.split('*')[0]}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`/api/delete?url=${item.url}`);
                setBlobFiles((prevFiles) => prevFiles.filter((file) => file.pathname !== item.pathname));
                setFilteredData((prevFiles) => prevFiles.filter((file) => file.pathname !== item.pathname));
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        }
    };

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] mt-20 px-4`}
        >
            <div className="bg-white p-8 rounded-lg w-full max-w-xl m-auto mt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Apuntes</h1>

                <div className="w-full max-w-2xl mb-8">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
                    />
                </div>
                {isLoading ? (
                    <div className="text-center">Cargando...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="w-full max-w-2xl">
                        {filteredData.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {filteredData.map((item, index) => (
                                    <li key={index} className="py-4">
                                        <div className="flex flex-row items-start md:items-center justify-between shadow-stone-400 shadow-md p-4 rounded-lg">
                                            <div className="mb-2 md:mb-0">
                                                <p className="text-lg font-medium text-gray-800">
                                                    {item.pathname.split('*')[0]}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Subido el: {formatDate(item.uploadedAt)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Tamaño: {formatFileSize(item.size)}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Asignatura:{' '}
                                                    {item.pathname.split('*')[1].replace('.pdf', '') ??
                                                        'Sin asignatura'}
                                                </p>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                                                >
                                                    <FaEye />
                                                </a>
                                                <a
                                                    href={item.downloadUrl}
                                                    download
                                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                                                >
                                                    <FaDownload />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
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
                )}
            </div>
        </div>
    );
}
