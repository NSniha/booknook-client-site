import "./globals.css";
import Providers from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "BookNook | A Small Online Library",
    template: "BookNook | %s",
  },
  description:
    "Find your next favourite read in a library built by its readers. Add a book, borrow a book and keep the stories moving with BookNook.",
  openGraph: {
    title: "BookNook — Good books. Better company.",
    description: "A small online library for curious minds.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top" className="min-h-dvh antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-100 rounded-lg bg-accent px-5 py-3 text-background focus:not-sr-only"
        >
          Skip to content
        </a>
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
