import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/provider/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: "ContractorHQ - Professional Tools & Equipment",
  description: "Your one-stop shop for all contractor tools and equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            {children}
          </Providers>
          <Toaster
            position="top-right"
            gutter={12}
            containerClassName="!top-16 !right-4"
            toastOptions={{
              duration: 4000,
              style: {
                background: "hsl(0 0% 100%)",
                color: "hsl(240 10% 3.9%)",
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                borderRadius: "0.5rem",
                border: "1px solid hsl(240 5.9% 90%)",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                maxWidth: "24rem",
                animation: "enter 0.2s ease-out, leave 0.15s ease-in",
              },
              className: "font-[Inter]",
              success: {
                iconTheme: {
                  primary: "hsl(142.1 76.2% 36.3%)",
                  secondary: "hsl(0 0% 100%)",
                },
                style: {
                  borderColor: "hsl(142.1 76.2% 36.3% / 0.2)",
                },
              },
              error: {
                iconTheme: {
                  primary: "hsl(0 72.2% 50.6%)",
                  secondary: "hsl(0 0% 100%)",
                },
                style: {
                  borderColor: "hsl(0 72.2% 50.6% / 0.2)",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
