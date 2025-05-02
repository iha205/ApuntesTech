import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

/**
 * Endpoint para eliminar un archivo de Vercel Blob.
 */
export async function DELETE(req: NextRequest): Promise<NextResponse<{ message: string }>> {
    // Obtiene la URL del archivo a eliminar desde los parámetros de la solicitud.
    const url = req.nextUrl.searchParams.get('url');

    // Si no se proporciona la URL, devuelve un error.
    if (!url) {
        return NextResponse.json({ message: 'URL no proporcionada' }, { status: 400 });
    }

    try {
        // Intenta eliminar el archivo usando la función 'del' de @vercel/blob.
        await del(url);
        // Si se elimina correctamente, devuelve un mensaje de éxito.
        return NextResponse.json({ message: 'Archivo borrado' });
    } catch (error) {
        // Si hay un error, lo registra y devuelve un error interno del servidor.
        console.error('Error al borrar el archivo:', error);
        return NextResponse.json({ message: 'Error al borrar el archivo' }, { status: 500 });
    }
}
