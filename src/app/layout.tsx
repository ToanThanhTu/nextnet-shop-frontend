import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/app/components/header";
import ScrollTopButton from "@/app/components/ui/scrollTopButton";
import Footer from "@/app/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Net Shop",
    default: "Next Net Shop",
  },
  description:
    "Next Net Shop, an e-commerce shop, the best place to buy your next favorite thing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ScrollTopButton />
        <Footer />
      </body>
    </html>
  );
}
