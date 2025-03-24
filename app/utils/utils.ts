import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, PDF_NAME_REGEX } from '@/constants';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatFileSize = (size: number): string => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let formattedSize = size;

    while (formattedSize >= 1024 && unitIndex < units.length - 1) {
        formattedSize /= 1024;
        unitIndex++;
    }

    return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};

export const validatePdfName = (value: string): string | null =>
    PDF_NAME_REGEX.test(value) ? null : 'El nombre del PDF solo debe contener caracteres alfanuméricos y espacios.';

export const validateFile = (file: File | null): string | null =>
    file && file.type === 'application/pdf' && file.size <= MAX_FILE_SIZE_BYTES
        ? null
        : `Solo se permiten archivos PDF de hasta ${MAX_FILE_SIZE_MB} MB.`;
