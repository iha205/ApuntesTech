import { del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest): Promise<NextResponse<{ message: string }>> {
    try {
        const url = req.nextUrl.searchParams.get('url');

        if (!url) {
            return NextResponse.json({ message: 'URL no proporcionada' }, { status: 400 });
        }

        await del(url);
        return NextResponse.json({ message: 'Archivo borrado exitosamente' });
    } catch (error) {
        console.error('Error al borrar el archivo o procesar los datos:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}