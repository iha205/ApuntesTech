import { DataFormulario } from '@/interfaces';

export const MAX_FILE_SIZE_MB = 4;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_SUBJECTS = [
    'Matemáticas',
    'Lengua',
    'Inglés',
    'Ciencias Naturales',
    'Ciencias Sociales',
    'Educación Física',
    'Música',
    'Plástica',
    'Francés',
    'Valores Éticos'
];
export const PDF_NAME_REGEX = /^[a-zA-Z0-9\s]+$/;
export const DEFAULT_FORM_DATA: DataFormulario = {
    nombrePdf: '',
    asignatura: '',
    archivo: null
};
