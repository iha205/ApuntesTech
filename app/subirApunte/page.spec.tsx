import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Page from "./page";

// Simula (mock) el módulo de fuentes para evitar errores.
vi.mock('@/fonts', () => ({
    geistSans: { variable: 'font-mock-sans' },
    geistMono: { variable: 'font-mock-mono' },
}));


describe('subirApunte', () => {
    it('se renderiza correctamente', () => {
        const { container } = render(<Page />);
        expect(container).toBeDefined();
    });
});
