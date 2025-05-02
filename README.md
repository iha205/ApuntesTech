# ApuntesTech

## Scripts del Proyecto 🛠️

Estos son los scripts que he configurado en el `package.json` para ayudarte con las tareas comunes:

*   **`npm run dev`** 💻
    *   Uso este comando para iniciar el servidor de desarrollo. Ejecuta `next dev --turbopack`, lo que me da recarga rápida mientras programo.
*   **`npm run build`** 📦
    *   Este comando (`next build`) crea la versión optimizada de la aplicación, lista para producción. Lo ejecuto antes de desplegar.
*   **`npm run start`** 🚀
    *   Después de hacer el `build`, uso `next start` para arrancar el servidor en modo producción y probar cómo funcionará una vez desplegado.
*   **`npm run lint`** ✨
    *   Con `next lint`, reviso que el código siga las reglas de estilo y no tenga errores comunes (usando ESLint). Me ayuda a mantenerlo ordenado.
*   **`npm run prettier`** 🎨
    *   Este script (`prettier . --write`) formatea automáticamente todo el código del proyecto con Prettier para que el estilo sea consistente.
*   **`npm run test`** ✅
    *   Ejecuta las pruebas que tengo configuradas con `vitest` para asegurarme de que todo sigue funcionando correctamente.