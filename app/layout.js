// app/layout.js
'use client';
import Link from 'next/link';
import './globals.css';
// import { NextScript } from 'next/document';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex justify-between px-10 py-4 bg-gray-800 text-white">
          <Link href="/year" className="hover:underline">
            Year View
          </Link>
          <Link href="/lifetime" className="hover:underline">
            Lifetime View
          </Link>
        </nav>
        <main>{children}</main>
        {/* <NextScript /> */}
      </body>
    </html>
  );
}
