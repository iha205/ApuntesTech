import { NextResponse } from 'next/server';
import { list, ListBlobResult } from '@vercel/blob';

export async function GET(): Promise<NextResponse<ListBlobResult | { message: string }>> {
    try {
        const blobs = await list();
        return NextResponse.json(blobs);
    } catch (error) {
        console.error('Error al listar los blobs:', error);
        return NextResponse.json({ message: 'Error al listar blobs' });
    }
}
