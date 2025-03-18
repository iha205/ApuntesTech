import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FormData, UploadFormProps } from '@/interfaces';
import {
    PDF_NAME_REGEX,
    MAX_FILE_SIZE_BYTES,
    MAX_FILE_SIZE_MB,
    DEFAULT_FORM_DATA,
    ALLOWED_SUBJECTS
} from '@/constants';

const validatePdfName = (value: string): string | null =>
    PDF_NAME_REGEX.test(value) ? null : 'El nombre del PDF solo debe contener caracteres alfanuméricos y espacios.';

const validateFile = (file: File | null): string | null =>
    file && file.type === 'application/pdf' && file.size <= MAX_FILE_SIZE_BYTES
        ? null
        : `Solo se permiten archivos PDF de hasta ${MAX_FILE_SIZE_MB} MB.`;

export default function UploadForm({ onSubmit }: UploadFormProps) {
    const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
    const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
    const [errorNombrePdf, setErrorNombrePdf] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === 'nombrePdf') {
            setErrorNombrePdf(validatePdfName(value));
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setErrorArchivo(validateFile(file));
        setFormData((prev) => ({ ...prev, archivo: file }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!errorNombrePdf && !errorArchivo && formData.archivo) {
            onSubmit(formData);
        }
    };

    const isSubmitDisabled = errorNombrePdf !== null || errorArchivo !== null || formData.archivo === null;

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
                    value={formData.nombrePdf}
                    onChange={handleInputChange}
                    className={`w-full border ${errorNombrePdf ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700`}
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
                    value={formData.asignatura}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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
                {errorArchivo && <p className="text-red-500 text-xs mt-1">{errorArchivo}</p>}
            </div>
            <button
                type="submit"
                className="disabled:bg-gray-500 w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitDisabled}
            >
                Subir
            </button>
        </form>
    );
}
