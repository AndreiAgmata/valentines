import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "For Pookie",
  description: "For Pookie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pacifico.variable} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
