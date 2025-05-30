import type { Metadata } from "next";
import "@/app/globals.css";
import ScrollTopButton from "@/app/components/ui/scrollTopButton";
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
    <html lang="en" className="antialiased scroll-smooth">
      <body className="bg-background text-foreground">
        {/* Redux Store for Filter, Cart, Auth states, and RTK Query */}
        <StoreProvider>
          <main>{children}</main>
          <ScrollTopButton />
        </StoreProvider>
      </body>
    </html>
  );
}
