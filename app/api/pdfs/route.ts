import { NextResponse } from 'next/server';
import { list, ListBlobResult } from '@vercel/blob';

/**
 * Este endpoint obtiene y devuelve una lista de archivos almacenados en Vercel Blob.
 */
export async function GET(): Promise<NextResponse<ListBlobResult | { message: string }>> {
    try {
        // Obtiene la lista de archivos (blobs) desde Vercel Blob.
        const blobs = await list();
        // Devuelve la lista de blobs como una respuesta JSON.
        return NextResponse.json(blobs);
    } catch (error) {
        // Si ocurre un error, lo registra en la consola.
        console.error('Error al obtener la lista de archivos:', error);
        // Devuelve un mensaje de error al cliente.
        return NextResponse.json({ message: 'Error al obtener la lista de archivos' });
    }
}
