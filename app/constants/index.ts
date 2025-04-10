import { DataFormulario } from '@/interfaces';

/**
 * @constant MAX_FILE_SIZE_MB
 * @description Define el tamaño máximo permitido para un archivo, en megabytes.
 * @type {number}
 * @default 1
 */
export const MAX_FILE_SIZE_MB = 1;

/**
 * @constant MAX_FILE_SIZE_BYTES
 * @description Define el tamaño máximo permitido para un archivo, en bytes. Se calcula a partir de MAX_FILE_SIZE_MB.
 * @type {number}
 * @default 1048576 (1MB)
 */
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * @constant ALLOWED_SUBJECTS
 * @description Un array de strings que representa las tecnologias de frontend permitidas en la aplicación.
 * @type {string[]}
 * @default ['React', 'Angular', 'Vue.js', 'Svelte', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Next.js', 'Astro']
 */
export const ALLOWED_SUBJECTS = [
    'React',
    'Angular',
    'Vue.js',
    'Svelte',
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'Next.js',
    'Astro'
];

/**
 * @constant PDF_NAME_REGEX
 * @description Una expresión regular utilizada para validar los nombres de los archivos PDF. Permite caracteres alfanuméricos y espacios.
 * @type {RegExp}
 * @default /^[a-zA-Z0-9\s]+$/
 */
export const PDF_NAME_REGEX = /^[a-zA-Z0-9\s]+$/;

/**
 * @constant DEFAULT_FORM_DATA
 * @description La estructura de datos por defecto para el formulario. Incluye strings vacíos para los campos de texto y null para el archivo.
 * @type {DataFormulario}
 * @default { nombrePdf: '', asignatura: '', archivo: null }
 */
export const DEFAULT_FORM_DATA: DataFormulario = {
    nombrePdf: '',
    asignatura: '',
    archivo: null
};
