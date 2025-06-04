import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/providers/theme"; // Импортируем провайдер

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Крутой проект",
  description: "Сделано с любовью и next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
      >
        <ThemeProvider>
          {" "}
          {/* Обёртка для всего приложения */}
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
