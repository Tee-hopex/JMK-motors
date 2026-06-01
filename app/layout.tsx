import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JMK Auto | Premium Imported Cars in Nigeria",
  description:
    "JMK Auto is Nigeria's most trusted premium car dealership. Browse our extensive inventory of Foreign Used, Tokunbo, and Brand New imported cars — Toyota, Lexus, Mercedes-Benz, BMW, Range Rover, and more.",
  keywords:
    "Tokunbo cars Nigeria, foreign used cars Lagos, premium cars Nigeria, imported cars for sale, JMK Auto, luxury cars Nigeria, Toyota Lexus Mercedes BMW Nigeria",
  openGraph: {
    title: "JMK Auto | Premium Imported Cars",
    description:
      "Browse our premium selection of imported luxury vehicles. Quality guaranteed.",
    type: "website",
    siteName: "JMK Auto",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('jmk-theme');
                const preferred = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (preferred === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-surface text-ink">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
