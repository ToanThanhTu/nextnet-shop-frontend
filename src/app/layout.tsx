import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/app/components/header/header";
import ScrollTopButton from "@/app/components/ui/scrollTopButton";
import Footer from "@/app/components/footer/footer";
import Providers from "@/app/providers";
import StoreProvider from "@/app/StoreProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Net Shop",
    default: "Next Net Shop",
  },
  description: "Next Net Shop, an e-commerce shop, the best place to buy your next favorite thing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Redux Store for Filter and Cart states */}
          <StoreProvider>
            <Header />
            <main className="mt-[170px]">{children}</main>
          </StoreProvider>
          <ScrollTopButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
