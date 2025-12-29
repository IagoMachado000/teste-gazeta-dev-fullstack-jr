import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Gazeta do Povo",
    description: "Teste para vaga de Desenvolvedor(a) Fullstack JR",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <SidebarProvider>
                    <Header />

                    <main className="container">{children}</main>

                    <Footer />
                </SidebarProvider>
            </body>
        </html>
    );
}
