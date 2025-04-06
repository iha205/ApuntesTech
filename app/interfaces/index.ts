/**
 * DataFormulario: Interfaz que define la estructura de los datos
 * que se recopilan en un formulario para subir un PDF.
 */
export interface DataFormulario {
    /**
     * nombrePdf: El nombre que se le dará al archivo PDF.
     * Tipo: string
     */
    nombrePdf: string;
    /**
     * asignatura: La asignatura a la que pertenece el PDF.
     * Tipo: string
     */
    asignatura: string;
    /**
     * archivo: El archivo PDF en sí. Puede ser nulo si aún no se ha seleccionado.
     * Tipo: File | null
     */
    archivo: File | null;
}

/**
 * BlobFile: Interfaz que define la estructura de los datos
 * que representan un archivo almacenado como un blob.
 * Generalmente, estos datos se obtienen después de subir un archivo.
 */
export interface BlobFile {
    /**
     * url: La URL completa del archivo (incluyendo el protocolo, dominio, etc.).
     * Tipo: string
     */
    url: string;
    /**
     * pathname: La ruta del archivo dentro del sistema de almacenamiento.
     * Tipo: string
     */
    pathname: string;
    /**
     * size: El tamaño del archivo en bytes.
     * Tipo: number
     */
    size: number;
    /**
     * downloadUrl: La URL específica para descargar el archivo.
     * Tipo: string
     */
    downloadUrl: string;
    /**
     * uploadedAt: La fecha y hora en que se subió el archivo.
     * Tipo: string
     */
    uploadedAt: string;
}
