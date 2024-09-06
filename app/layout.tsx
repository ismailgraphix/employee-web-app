import type { Metadata } from "next";
import { Anek_Devanagari } from "next/font/google";

import "./globals.css";
import Sidebar from "@/components/sidebar";

const inter = Anek_Devanagari({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Web App",
  description: "Generated by ismail grapix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         
        {children}</body>
    </html>
  );
}
