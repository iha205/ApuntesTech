export interface DataFormulario {
    nombrePdf: string;
    asignatura: string;
    archivo: File | null;
}

export interface UploadFormProps {
    onSubmit: (data: DataFormulario) => void;
}
