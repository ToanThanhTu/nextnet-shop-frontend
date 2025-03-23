import Discount from "@/app/components/price/sale/discount";
import SaleText from "@/app/components/price/sale/saleText";

export default function Sale({ sale }: { sale: number }) {
  return (
    <div className="flex items-items justify-left gap-1">
      <SaleText />
      <Discount sale={sale} />
    </div>
  )
}
