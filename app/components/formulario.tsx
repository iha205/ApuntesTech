"use client"
import axios from 'axios';

import { DataFormulario } from '@/interfaces';
import { ALLOWED_SUBJECTS, DEFAULT_FORM_DATA } from '@/constants';
import { validateFile, validatePdfName } from '@/utils/utils';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

export default function UploadForm() {
    // --- Variables de Hooks ---
    const [formData, setFormData] = useState<DataFormulario>(DEFAULT_FORM_DATA); // Datos del formulario
    const [fileError, setFileError] = useState<string | null>(null); // Error al validar el archivo
    const [pdfNameError, setPdfNameError] = useState<string | null>(null); // Error al validar el nombre del PDF
    const [responseMessage, setResponseMessage] = useState<string | null>(null); // Mensaje de respuesta del servidor

    // --- Referencias ---
    const fileInputRef = useRef<HTMLInputElement>(null); // Referencia al input de tipo archivo

    // --- Constantes ---
    const isSubmitDisabled = pdfNameError !== null || fileError !== null || formData.archivo === null; // Determina si el botón de enviar está deshabilitado

    // --- Métodos ---

    /**
     * Maneja los cambios en los inputs de texto y select.
     * @param event Evento de cambio del input.
     */
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validar el nombre del PDF si el campo modificado es 'nombrePdf'
        if (name === 'nombrePdf') {
            setPdfNameError(validatePdfName(value));
        }
    };

    /**
     * Maneja el cambio en el input de tipo archivo.
     * @param event Evento de cambio del input.
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setFileError(validateFile(file));
        setFormData((prev) => ({ ...prev, archivo: file }));
    };

    /**
     * Maneja el envío del formulario.
     * @param event Evento de envío del formulario.
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResponseMessage(null); // Limpiar el mensaje de respuesta anterior

        // Verificar si hay errores y si se ha seleccionado un archivo
        if (!pdfNameError && !fileError && formData.archivo) {
            const { archivo, nombrePdf, asignatura } = formData;

            const formDataToSend = new FormData();
            formDataToSend.append('archivo', archivo);
            formDataToSend.append('nombrePdf', nombrePdf);
            formDataToSend.append('asignatura', asignatura);

            try {
                const response = await axios.post(`/api/upload`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setResponseMessage(response.data.message || 'Archivo subido correctamente.');
                setFormData(DEFAULT_FORM_DATA); // Resetear el formulario
                setFileError(null);
                setPdfNameError(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Limpiar el input de archivo
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                setResponseMessage('Error al subir el archivo.');
            }
        }
    };

    // --- Renderizado ---
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
                    data-testid="nombre-pdf"
                    value={formData.nombrePdf}
                    onChange={handleInputChange}
                    className={`w-full border ${pdfNameError ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 text-gray-700`}
                    required
                />
                {pdfNameError && <p className="text-red-500 text-xs mt-1">{pdfNameError}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="asignatura" className="block mb-2 text-gray-700">
                    Asignatura:
                </label>
                <select
                    id="asignatura"
                    name="asignatura"                    
                    data-testid="asignatura"
                    value={formData.asignatura}
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
                className={`mb-4 border-2 border-dashed ${fileError ? 'border-red-500' : 'border-gray-400'} rounded-lg p-6`}
            >
                <label htmlFor="archivo" className="block text-center cursor-pointer">
                    <input
                        type="file"
                        id="archivo"
                        name="archivo"
                        data-testid="archivo"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    {formData.archivo ? (
                        <div className="text-gray-700">Archivo seleccionado: {formData.archivo.name}</div>
                    ) : (
                        <div>
                            <AiOutlineCloudUpload className="mx-auto h-12 w-12 text-gray-400" size={48} />
                            <p className="text-gray-500">Haz clic para seleccionar un archivo</p>
                        </div>
                    )}
                </label>
                {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
            </div>
            <button
                type="submit"
                data-testid="submit"
                className="disabled:bg-gray-500 w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 cursor-pointer"
                disabled={isSubmitDisabled}
            >
                Subir
            </button>
            {responseMessage && (
                <div
                    className={`mt-4 p-2 rounded ${responseMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                >
                    {responseMessage}
                </div>
            )}
        </form>
    );
}