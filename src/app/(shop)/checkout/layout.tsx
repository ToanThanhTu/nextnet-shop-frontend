import CheckoutFooter from "@/app/components/footer/checkout-footer";
import CheckoutHeader from "@/app/components/header/checkout-header";
import RandomQuotes from "@/app/components/index/random-quotes";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckoutHeader />
      <div className="mx-64 m-auto mt-28">
        <RandomQuotes />
        {children}
      </div>
      <CheckoutFooter />
    </>
  );
}
