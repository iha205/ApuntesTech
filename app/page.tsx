'use client';
import axios from 'axios';

import { BlobFile } from '@/interfaces';
import { geistMono, geistSans } from '@/fonts';
import { formatDate, formatFileSize } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';

export default function Page() {
    const { data: session } = useSession();
    // --- Constantes ---
    const router = useRouter();

    // --- Variables de Hooks ---
    const [blobFiles, setBlobFiles] = useState<BlobFile[]>([]); // Lista de archivos PDF obtenidos del servidor.
    const [searchTerm, setSearchTerm] = useState<string>(''); // Término de búsqueda ingresado por el usuario.
    const [filteredData, setFilteredData] = useState<BlobFile[]>([]); // Lista de archivos filtrados según el término de búsqueda.
    const [isLoading, setIsLoading] = useState<boolean>(true); // Indica si los datos se están cargando.
    const [error, setError] = useState<string | null>(null); // Almacena un mensaje de error si ocurre alguno.

    // --- Métodos ---

    /**
     * Obtiene la lista de archivos PDF del servidor.
     * Utiliza useCallback para memorizar la función y evitar re-renderizados innecesarios.
     */
    const fetchBlobFiles = useCallback(async () => {
        setIsLoading(true); // Inicia el Hooks de carga.
        setError(null); // Limpia cualquier error previo.
        try {
            const response = await axios.get('/api/pdfs'); // Realiza la petición GET a la API.
            if (response.status === 200) {
                setBlobFiles(response.data.blobs); // Actualiza la lista de archivos con los datos recibidos.
            } else {
                setError('Error al cargar los datos.'); // Establece un mensaje de error si la respuesta no es exitosa.
            }
        } catch (err) {
            console.error('Error al cargar los datos:', err);
            setError('Error al cargar los datos.'); // Establece un mensaje de error si ocurre una excepción.
        } finally {
            setIsLoading(false); // Finaliza el Hooks de carga.
        }
    }, []);

    /**
     * Filtra los archivos según el término de búsqueda.
     * Se ejecuta cada vez que cambia el término de búsqueda o la lista de archivos.
     */
    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = blobFiles.filter((item) => item.pathname.toLowerCase().includes(term));
        setFilteredData(filtered);
    }, [searchTerm, blobFiles]);

    /**
     * Maneja el cambio en el campo de búsqueda.
     * @param event Evento de cambio del input de búsqueda.
     */
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Redirige a la página de visualización del PDF seleccionado.
     * @param item Objeto BlobFile que representa el PDF seleccionado.
     */
    const handleViewDetails = (item: BlobFile) => {
        router.push(`/verPdf/${encodeURIComponent(JSON.stringify(item))}`);
    };

    /**
     * Elimina un archivo PDF del servidor y actualiza la lista.
     * @param item Objeto BlobFile que representa el PDF a eliminar.
     */
    const handleDelete = async (item: BlobFile) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar ${item.pathname.split('*')[0]}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`/api/delete?url=${item.url}`); // Realiza la petición DELETE a la API.
                // Actualiza la lista de archivos eliminando el archivo borrado.
                setBlobFiles((prevFiles) => prevFiles.filter((file) => file.pathname !== item.pathname));
                setFilteredData((prevFiles) => prevFiles.filter((file) => file.pathname !== item.pathname));
            } catch (error) {
                console.error('Error deleting file:', error);
                setError('Error al eliminar el archivo.');
            }
        }
    };

    // --- Efectos ---

    /**
     * Carga la lista de archivos al montar el componente.
     */
    useEffect(() => {
        fetchBlobFiles();
    }, [fetchBlobFiles]);

    // --- Renderizado ---
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] mt-20 px-4`}
        >
            <div className="bg-white p-8 rounded-lg w-full max-w-xl m-auto my-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Apuntes</h1>

                <div className="w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 shadow-sm"
                    />
                </div>
                {isLoading ? (
                    <div className="text-gray-600 text-center p-8">Cargando apuntes...</div>
                ) : error ? (
                    <div className="text-center p-8 text-red-500">{error}</div>
                ) : (
                    <div className="w-full max-w-2xl">
                        {filteredData.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {filteredData.map((item: BlobFile, index) => {
                                    return (
                                        <li key={index} className="py-4">
                                            <div className="flex flex-col items-start justify-between py-4 rounded-lg text-gray-600">
                                                <div className="flex flex-col mb-2">
                                                    <p className="text-2xl font-bold">{item.pathname.split('*')[0]}</p>
                                                    <p className="text-base">
                                                        Subido el: {formatDate(item.uploadedAt)}
                                                    </p>
                                                    <p className="text-base">Tamaño: {formatFileSize(item.size)}</p>
                                                    <p className="text-base">
                                                        Tecnologias:{' '}
                                                        {item.pathname.split('*')[1].replace('.pdf', '') ??
                                                            'Sin asignatura'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <button
                                                        onClick={() => handleViewDetails(item)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer flex"
                                                    >
                                                        Ver PDF
                                                    </button>
                                                    <a
                                                        href={item.downloadUrl}
                                                        download
                                                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded cursor-pointer flex"
                                                    >
                                                        Descargar PDF
                                                    </a>
                                                    {session && (
                                                        <button
                                                            onClick={() => handleDelete(item)}
                                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer flex"
                                                        >
                                                            Eliminar PDF
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-center p-8">
                                No se encontraron apuntes que coincidan con su búsqueda.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
