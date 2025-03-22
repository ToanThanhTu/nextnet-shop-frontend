import StoreIcon from "@mui/icons-material/Store"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import HandymanIcon from "@mui/icons-material/Handyman"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import RecyclingIcon from "@mui/icons-material/Recycling"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import { JSX } from "react"

import { discoverCards } from "@/app/data/discover-cards"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@mui/material"

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
        <h2 className="mb-6">Discover Next Net Shop</h2>

        <div className="overflow-x-auto">
          <div className="flex gap-4 w-fit">
            {discoverCards.map((card) => (
              <div key={card.title} className="w-48 shadow-md bg-white relative">
                <Link href={card.link} className="flex justify-center items-center p-10 bg-primary">
                  {discoverIconsMap[card.icon]}
                </Link>

                <div className="p-4">
                  <h3>{card.title}</h3>
                  <p className="mt-4 mb-12">{card.description}</p>
                </div>

                <Button
                  variant="text"
                  href={card.link}
                  style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    color: "#84B082",
                  }}
                >
                  Discover Now &gt;
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discover
