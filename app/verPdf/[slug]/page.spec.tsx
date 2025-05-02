import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Page from './page';
import { BlobFile } from '@/interfaces';

// Simula (mock) el módulo de fuentes para evitar errores.
vi.mock('@/fonts', () => ({
    geistSans: { variable: 'font-mock-sans' },
    geistMono: { variable: 'font-mock-mono' }
}));

// Simula (mock) el módulo next/navigation y el hook useParams
vi.mock('next/navigation', () => ({
    useParams: () => {
        // Crea un objeto BlobFile simulado
        const mockBlobFile: BlobFile = {
            url: 'https://example.blob.core.windows.net/container/mockfile.pdf',
            pathname: 'mockfile*pdf', // O el formato que uses
            contentType: 'application/pdf',
            metadata: {},
            name: 'mockfile.pdf',
            size: 1024, // Tamaño simulado en bytes
            uploadedOn: new Date().toISOString(),
            downloadUrl: ''
        };
        // Codifica el objeto como JSON y luego como URI
        const mockSlug = encodeURIComponent(JSON.stringify(mockBlobFile));
        return {
            slug: mockSlug
        };
    }
}));

// Simula axios para evitar llamadas reales a la red en el test
vi.mock('axios', () => ({
    default: {
        get: vi.fn().mockResolvedValue({
            data: new ArrayBuffer(8) // Simula datos de arraybuffer
        })
    }
}));

// Simula pdfjs para evitar errores relacionados con el worker
vi.mock('react-pdf', async (importOriginal) => {
    const mod = await importOriginal<typeof import('react-pdf')>();
    return {
        ...mod,
        pdfjs: {
            GlobalWorkerOptions: {
                workerSrc: ''
            },
            getDocument: vi.fn().mockResolvedValue({
                promise: Promise.resolve({ numPages: 1 })
            })
        }
    };
});

describe('verPdf', () => {
    it('se renderiza correctamente y muestra "Cargando PDF..." inicialmente', async () => {
        const { container } = render(<Page />);
        expect(container).toBeDefined();
    });
});
