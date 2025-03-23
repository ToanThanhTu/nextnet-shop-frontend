import StoreIcon from "@mui/icons-material/Store"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import HandymanIcon from "@mui/icons-material/Handyman"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import RecyclingIcon from "@mui/icons-material/Recycling"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import { JSX } from "react"

import { discoverCards } from "@/app/data/discover-cards"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { cn } from "@/lib/utils"

const discoverIconsMap: { [key: string]: JSX.Element } = {
  StoreIcon: <StoreIcon />,
  DeliveryIcon: <LocalShippingIcon />,
  ServicesIcon: <HandymanIcon />,
  MembershipIcon: <CreditCardIcon />,
  SustainabilityIcon: <RecyclingIcon />,
  CareersIcon: <WorkOutlineIcon />,
}

function Discover() {
  return (
    <div className="py-12 bg-gray-100 w-full">
      <div className="px-6 max-w-screen-xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold">Discover Next Net Shop</h2>

        <div className="overflow-x-auto">
          <div className="flex gap-4 w-fit">
            {discoverCards.map((card) => (
              <div key={card.title} className="w-48 shadow-md bg-white relative">
                <Link href={card.link} className="flex justify-center items-center p-10 bg-primary">
                  {discoverIconsMap[card.icon]}
                </Link>

                <div className="p-4">
                  <h3 className="font-bold">{card.title}</h3>
                  <p className="mt-4 mb-12">{card.description}</p>
                </div>

                <Link
                  href={card.link}
                  className={cn(
                    "absolute bottom-0 w-full flex justify-center items-center p-2 bg-primary-foreground text-primary font-medium",
                    "hover:opacity-80 hover:underline"
                  )}
                >
                  Discover Now &gt;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discover
