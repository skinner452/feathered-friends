import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

const sourGummyFont = Sour_Gummy();

export const metadata: Metadata = {
  title: "Feathered Friends",
  description: "A game about feeding birds and collecting feathers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourGummyFont.className}>
        <ReduxProvider>
          <div className="p-16">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
