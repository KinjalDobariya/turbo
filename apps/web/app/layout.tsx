"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SearchProvider } from "../components/context/SearchContext";
import Sidebar from "../components/Sidebar";

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
          <Box display="flex">
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
              }}
            >
              <SearchProvider>
                <Header />
                <Container maxWidth="lg" sx={{ mt: 3 }}>
                  {children}
                </Container>
              </SearchProvider>
              <Footer />
            </Box>
          </Box>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
