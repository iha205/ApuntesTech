//import { MAX_FILE_SIZE_MB } from '@/constants';
import { put } from '@vercel/blob';
import { NextApiRequest, NextApiResponse } from 'next';

/*
export const config = {
    api: {
      bodyParser: {
        sizeLimit: `${MAX_FILE_SIZE_MB}mb`,
      },
    },
  }
    */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }
    try {
        await put('test.pdf', req.body, {
            access: 'public'
        });
        return res.status(200).json({ message: 'Archivo subido exitosamente' });
    } catch (error) {
        console.error('Error al subir el archivo o procesar los datos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
