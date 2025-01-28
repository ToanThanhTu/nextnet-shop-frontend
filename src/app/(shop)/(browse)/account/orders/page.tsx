"use client";

import OrderHeader from "@/app/components/order/order-header";
import OrderItems from "@/app/components/order/order-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { useGetOrdersQuery } from "@/lib/features/order/orderSlice";
import { useAuth } from "@/lib/hooks";

function Page() {
  const user = useAuth({ needSignIn: true });

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery(user?.id as number, {
    skip: !user,
  });

  let content: React.ReactNode;

  if (isLoading) {
    content = <div>Loading your order history...</div>;
  } else if (isSuccess) {
    content = (
      <div>
        <h1>Order History</h1>

        <Accordion type="single" collapsible className="w-full">
          {orders.map((order) => (
            <AccordionItem key={order.id} value={`${order.id}`}>
              <AccordionTrigger>
                <OrderHeader
                  id={order.id}
                  date={order.orderDate}
                  price={order.totalPrice}
                  status={order.status}
                />
              </AccordionTrigger>
              <AccordionContent>
                <OrderItems items={order.orderItems} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  } else if (isError) {
    content = <div>Error: {JSON.stringify(error)}</div>;
  }

  return <>{content}</>;
}

export default Page;
