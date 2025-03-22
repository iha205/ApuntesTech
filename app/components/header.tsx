// d:\frameworks\ApuntesTech\app\components\Header.tsx
import Link from 'next/link';
import { geistSans, geistMono } from '@/fonts';

const Header = () => {
  return (
      <header
          className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 p-4 shadow-md fixed top-0 w-full z-10 left-0 right-0`}
      >
          <div className="container mx-auto flex justify-between items-center">
              <Link href="/apuntes" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  ApuntesTech
              </Link>
              <nav>
                  <ul className="flex space-x-4">
                      <li>
                          <Link href="/formulario" className="text-gray-700 hover:text-blue-600 transition-colors">
                              Subir Apuntes
                          </Link>
                      </li>
                  </ul>
              </nav>
          </div>
      </header>
  );
};

export default Header;
