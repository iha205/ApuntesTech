//import { MAX_FILE_SIZE_MB } from '@/constants';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server'; // Changed NextApiRequest to NextRequest

/*
export const config = {
    api: {
      bodyParser: {
        sizeLimit: `${MAX_FILE_SIZE_MB}mb`,
      },
    },
  }
*/

export async function POST(req: NextRequest): Promise<NextResponse<{ message: string }>> {
    try {
        const file = await req.formData();
        const fileData = file.get('archivo') as File;
        if (!fileData) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }
        await put(file.get("nombrePdf")+"*"+file.get("asignatura")+".pdf", fileData, {
            access: 'public'
        });
        return NextResponse.json({ message: 'Archivo subido exitosamente' });
    } catch (error) {
        console.error('Error al subir el archivo o procesar los datos:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
