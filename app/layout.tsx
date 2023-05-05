import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TubeToMP3",
  description: "Convert YouTube videos to MP3 easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#111111]`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
