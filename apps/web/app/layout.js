import { Work_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Olivefe - Aydın'ın Doğal Lezzetleri",
  description: "Aydın'dan doğal ve organik zeytinyağı, kuru incir ve daha fazlası.",
  keywords: ['zeytinyağı', 'kuru incir', 'Aydın', 'doğal ürünler', 'organik', 'Ege', 'Olivefe'],
  authors: [{ name: 'Olivefe' }],
  openGraph: {
    title: "Olivefe - Aydın'ın Doğal Lezzetleri",
    description: "Aydın'dan doğal ve organik zeytinyağı, kuru incir ve daha fazlası.",
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body
        className={`${workSans.variable} antialiased bg-white text-gray-900 transition-colors duration-200`}
      >
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <WhatsAppButton />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
