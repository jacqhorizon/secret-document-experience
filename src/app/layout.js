import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import styles from '../global.css'

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

export const metadata = {
  title: "Secret Document Experience",
  description: "Secret Document Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable}` }>
        <div className={styles.page}>
          {children}
        </div>
      </body>
    </html>
  );
}
