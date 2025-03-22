import { list } from '@vercel/blob';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blobs = await list();
    res.status(200).json(blobs);
  } catch (error) {
    console.error('Error al listar los blobs:', error);
    res.status(500).json({ error: 'Error al listar blobs' });
  }
}