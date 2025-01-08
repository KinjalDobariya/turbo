"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Header />
          <main>{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
