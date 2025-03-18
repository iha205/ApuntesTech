export interface FormData {
    nombrePdf: string;
    asignatura: string;
    archivo: File | null;
}

export interface UploadFormProps {
    onSubmit: (data: FormData) => void;
}
