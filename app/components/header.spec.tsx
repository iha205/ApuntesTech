import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Header from './header';

vi.mock('@/fonts', () => ({
    geistSans: { variable: 'font-mock-1' },
    geistMono: { variable: 'font-mock-2' },
}));

describe('Header Component (Pruebas Básicas)', () => {
    it('debería mostrar el nombre de la marca "ApuntesTech"', () => {
        render(<Header />);
        const brandElement = screen.getByText(/ApuntesTech/i);
        expect(brandElement).toBeTruthy();
    });
});