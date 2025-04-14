import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, PDF_NAME_REGEX } from '@/constants';

/**
 * formatDate: Formatea una cadena de fecha en un formato legible para el usuario.
 * @param dateString - La cadena de fecha en formato ISO 8601 (ej. "2023-10-27T10:00:00Z").
 * @returns Una cadena con la fecha formateada en español (ej. "27 de octubre de 2023").
 */
export const formatDate = (dateString: string): string => {
    // Crea un objeto Date a partir de la cadena de fecha.
    const date = new Date(dateString);
    // Formatea la fecha en español con el formato: día, mes (nombre completo), año.
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * formatFileSize: Formatea el tamaño de un archivo en bytes a una cadena legible.
 * @param size - El tamaño del archivo en bytes.
 * @returns Una cadena con el tamaño del archivo formateado (ej. "1.23 MB").
 */
export const formatFileSize = (size: number): string => {
    // Define las unidades de tamaño de archivo.
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    // Inicializa el índice de la unidad y el tamaño formateado.
    let unitIndex = 0;
    let formattedSize = size;

    // Mientras el tamaño sea mayor o igual a 1024 y haya unidades disponibles.
    while (formattedSize >= 1024 && unitIndex < units.length - 1) {
        // Divide el tamaño por 1024 para pasar a la siguiente unidad.
        formattedSize /= 1024;
        // Incrementa el índice de la unidad.
        unitIndex++;
    }

    // Devuelve el tamaño formateado con dos decimales y la unidad correspondiente.
    return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};

/**
 * validatePdfName: Valida si un nombre de archivo PDF 
 * cumple con el formato permitido.
 * @param value - El nombre del archivo PDF a validar.
 * @returns `null` si el nombre es válido, o un mensaje de error si no lo es.
 */
export const validatePdfName = (value: string): string | null =>
    // Comprueba si el nombre cumple con la expresión regular definida en PDF_NAME_REGEX.
    PDF_NAME_REGEX.test(value) ? null : 
    'El nombre del PDF solo debe contener caracteres alfanuméricos y espacios.';

/**
 * validateFile: Valida si un archivo es un PDF 
 * y si su tamaño es menor o igual al máximo permitido.
 * @param file - El archivo a validar (puede ser nulo).
 * @returns `null` si el archivo es válido, o un mensaje de error si no lo es.
 */
export const validateFile = (file: File | null): string | null =>
    // Comprueba si el archivo existe, es de tipo 'application/pdf' 
    // y su tamaño es menor o igual a MAX_FILE_SIZE_BYTES.
    file && file.type === 'application/pdf' && file.size <= MAX_FILE_SIZE_BYTES
        ? null
        : `Solo se permiten archivos PDF de hasta ${MAX_FILE_SIZE_MB} MB.`;
