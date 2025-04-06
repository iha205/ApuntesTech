import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

/**
 * Endpoint para subir un archivo a Vercel Blob.
 *
 * Recibe un archivo en la solicitud POST, lo guarda en Vercel Blob
 * y devuelve una respuesta de éxito o error.
 */
export async function POST(req: NextRequest): Promise<NextResponse<{ message: string }>> {
  try {
    // Obtiene los datos del formulario.
    const formData = await req.formData();

    // Extrae el archivo del formulario (asumiendo que se llama 'archivo').
    const file = formData.get('archivo') as File;

    // Si no hay archivo, devuelve un error.
    if (!file) {
      return NextResponse.json({ message: 'No se ha proporcionado ningún archivo' }, { status: 400 });
    }

    // Construye el nombre del archivo: nombrePdf*asignatura.pdf
    const fileName = `${formData.get('nombrePdf')}*${formData.get('asignatura')}.pdf`;

    // Sube el archivo a Vercel Blob con acceso público.
    await put(fileName, file, { access: 'public' });

    // Devuelve una respuesta de éxito.
    return NextResponse.json({ message: 'Archivo subido correctamente' });
  } catch (error) {
    // Si hay un error, lo registra y devuelve un error interno.
    console.error('Error al subir el archivo:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
