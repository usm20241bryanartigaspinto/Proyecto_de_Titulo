import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import {Providers} from './Providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayuda a la infancia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}