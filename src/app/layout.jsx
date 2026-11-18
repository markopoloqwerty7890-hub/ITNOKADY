import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "IT Nokady",
  description: "IT-академия нового поколения",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${roboto.variable} font-['Roboto'] antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
