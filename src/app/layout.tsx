import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
