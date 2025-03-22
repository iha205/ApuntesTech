export interface DataFormulario {
    nombrePdf: string;
    asignatura: string;
    archivo: File | null;
}

export interface BlobFile {
    url: string;
    pathname: string;
    size: number;
    downloadUrl: string;
    uploadedAt: string;
}

