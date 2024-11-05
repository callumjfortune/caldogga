'use client'

import "./globals.css";
import { CoreProvider } from "./context/coreContextProvider.tsx";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <CoreProvider>
        {children}
      </CoreProvider>
      </body>
    </html>
  );
}
