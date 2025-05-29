import type { Metadata } from "next";
import Providers from "./providers";
import '@/assets/styles/globals.scss'

export const metadata: Metadata = {
  title: "Gifter",
  description: "Find gifts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
