'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { DataFormulario } from '@/interfaces';
import { DEFAULT_FORM_DATA, ALLOWED_SUBJECTS } from '@/constants';
import axios from 'axios';
import { validatePdfName, validateFile } from '@/utils/utils';

export default function UploadForm() {
    const [DataFormulario, setDataFormulario] = useState<DataFormulario>(DEFAULT_FORM_DATA);
    const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
    const [errorNombrePdf, setErrorNombrePdf] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null); // Estado para el mensaje de respuesta
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDataFormulario((prev) => ({ ...prev, [name]: value }));
        if (name === 'nombrePdf') {
            setErrorNombrePdf(validatePdfName(value));
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setErrorArchivo(validateFile(file));
        setDataFormulario((prev) => ({ ...prev, archivo: file }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        if (!errorNombrePdf && !errorArchivo && DataFormulario.archivo) {
            const { archivo, nombrePdf, asignatura } = DataFormulario;

            const formData = new FormData();
            formData.append('archivo', archivo);
            formData.append('nombrePdf', nombrePdf);
            formData.append('asignatura', asignatura);

            try {
                const response = await axios.post(`/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setMessage(response.data.message || 'Archivo subido correctamente.');
                setDataFormulario(DEFAULT_FORM_DATA);
                setErrorArchivo(null);
                setErrorNombrePdf(null);
                // Reset the file input value
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                setMessage('Error al subir el archivo.');
            }
        }
    };

    const isSubmitDisabled = errorNombrePdf !== null || errorArchivo !== null || DataFormulario.archivo === null;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ApuntesTech</h2>

            <div className="mb-4">
                <label htmlFor="nombrePdf" className="block mb-2 text-gray-700">
                    Nombre del PDF:
                </label>
                <input
                    type="text"
                    id="nombrePdf"
                    name="nombrePdf"
                    value={DataFormulario.nombrePdf}
                    onChange={handleInputChange}
                    className={`w-full border ${errorNombrePdf ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 text-gray-700`}
                    required
                />
                {errorNombrePdf && <p className="text-red-500 text-xs mt-1">{errorNombrePdf}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="asignatura" className="block mb-2 text-gray-700">
                    Asignatura:
                </label>
                <select
                    id="asignatura"
                    name="asignatura"
                    value={DataFormulario.asignatura}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
                    required
                >
                    <option value="">Selecciona una asignatura</option>
                    {ALLOWED_SUBJECTS.map((asignatura) => (
                        <option key={asignatura} value={asignatura}>
                            {asignatura}
                        </option>
                    ))}
                </select>
            </div>

            <div
                className={`mb-4 border-2 border-dashed ${errorArchivo ? 'border-red-500' : 'border-gray-400'} rounded-lg p-6`}
            >
                <label htmlFor="archivo" className="block text-center cursor-pointer">
                    <input
                        type="file"
                        id="archivo"
                        name="archivo"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    {DataFormulario.archivo ? (
                        <div className="text-gray-700">Archivo seleccionado: {DataFormulario.archivo.name}</div>
                    ) : (
                        <div>
                            <AiOutlineCloudUpload className="mx-auto h-12 w-12 text-gray-400" size={48} />
                            <p className="text-gray-500">Haz clic para seleccionar un archivo</p>
                        </div>
                    )}
                </label>
                {errorArchivo && <p className="text-red-500 text-xs mt-1">{errorArchivo}</p>}
            </div>
            <button
                type="submit"
                className="disabled:bg-gray-500 w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 cursor-pointer"
                disabled={isSubmitDisabled}
            >
                Subir
            </button>
            {message && (
                <div
                    className={`mt-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                >
                    {message}
                </div>
            )}
        </form>
    );
}
