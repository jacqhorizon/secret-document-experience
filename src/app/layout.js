import { Geist, Geist_Mono, Pixelify_Sans, Roboto, Handjet } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"]
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})

const handJet = Handjet({
  variable: "--font-handjet",
  subsets: ["latin"]
})

export const metadata = {
  title: "Secret Document Experience",
  description: "Secret Document Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${handJet.variable}` }>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
