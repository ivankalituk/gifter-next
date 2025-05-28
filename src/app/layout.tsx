import type { Metadata } from "next";
import ReduxProvider from "./ReduxProvider";
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
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
