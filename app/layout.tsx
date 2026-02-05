import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Girwan Kumar Budhathoki, MBBS | Medical Officer",
  description: "MBBS graduate and Medical Officer at Nobel Medical College, Biratnagar. Providing compassionate, patient-centered healthcare in Eastern Nepal.",
  keywords: "medical officer, MBBS, doctor, healthcare, Nobel Medical College, Biratnagar, Nepal, internal medicine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
