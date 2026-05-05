import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from '@/components/ToastContainer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whatbytes - Online Shopping",
  description: "Shop for quality products at Whatbytes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <CartProvider>
          <Header />
          <ToastContainer />
          <main className="grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
