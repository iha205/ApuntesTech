// Importa las funciones de Vitest y las utilidades a probar.
import { describe, it, expect } from 'vitest';
// Importa las constantes usadas en las funciones de utils.
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '@/constants';
import { formatDate, formatFileSize, validateFile, validatePdfName } from '../utils';

// Grupo de pruebas para la función formatDate.
describe('formatDate', () => {
    // Prueba 1: Formatear una fecha estándar.
    it('debería formatear una fecha ISO correctamente', () => {
        const isoDate = '2023-10-27T10:00:00Z';
        expect(formatDate(isoDate)).toBe('27 de octubre de 2023');
    });

    // Prueba 2: Formatear una fecha de inicio de año.
    it('debería formatear correctamente el primer día del año', () => {
        const isoDate = '2024-01-01T00:00:00Z';
        expect(formatDate(isoDate)).toBe('1 de enero de 2024');
    });
});

// Grupo de pruebas para la función formatFileSize.
describe('formatFileSize', () => {
    // Prueba 1: Formatear un tamaño pequeño en bytes.
    it('debería formatear correctamente tamaños en bytes', () => {
        expect(formatFileSize(512)).toBe('512.00 bytes');
    });

    // Prueba 2: Formatear un tamaño en megabytes.
    it('debería formatear correctamente tamaños en MB', () => {
        // 1.5 MB en bytes
        const sizeInMB = 1.5 * 1024 * 1024;
        expect(formatFileSize(sizeInMB)).toBe('1.50 MB');
    });
});

// Grupo de pruebas para la función validatePdfName.
describe('validatePdfName', () => {
    // Prueba 1: Validar un nombre correcto.
    it('debería devolver null para un nombre de PDF válido', () => {
        expect(validatePdfName('Mi Documento 1')).toBeNull();
    });

    // Prueba 2: Validar un nombre con caracteres no permitidos.
    it('debería devolver un mensaje de error para un nombre inválido', () => {
        const expectedError = 'El nombre del PDF solo debe contener caracteres alfanuméricos y espacios.';
        expect(validatePdfName('Archivo_Final!')).toBe(expectedError);
    });
});

// Grupo de pruebas para la función validateFile.
describe('validateFile', () => {
    // Mensaje de error esperado para reutilizar.
    const expectedError = `Solo se permiten archivos PDF de hasta ${MAX_FILE_SIZE_MB} MB.`;

    // Prueba 1: Validar un archivo PDF correcto y dentro del límite de tamaño.
    it('debería devolver null para un archivo PDF válido', () => {
        // Crea un mock de File que sea PDF y tenga un tamaño válido.
        const validFile = new File([''], 'documento.pdf', { type: 'application/pdf' });
        Object.defineProperty(validFile, 'size', { value: MAX_FILE_SIZE_BYTES / 2 });
        expect(validateFile(validFile)).toBeNull();
    });

    // Prueba 2: Validar un archivo que no es PDF.
    it('debería devolver un mensaje de error si el archivo no es PDF', () => {
        // Crea un mock de File que no sea PDF.
        const invalidFile = new File([''], 'imagen.png', { type: 'image/png' });
        Object.defineProperty(invalidFile, 'size', { value: 1000 });
        expect(validateFile(invalidFile)).toBe(expectedError);
    });
});
