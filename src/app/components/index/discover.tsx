import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HandymanIcon from "@mui/icons-material/Handyman";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RecyclingIcon from "@mui/icons-material/Recycling";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { JSX } from "react";

import { discoverCards } from "@/app/data/discover-cards";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";

const discoverIconsMap: { [key: string]: JSX.Element } = {
  StoreIcon: <StoreIcon />,
  DeliveryIcon: <LocalShippingIcon />,
  ServicesIcon: <HandymanIcon />,
  MembershipIcon: <CreditCardIcon />,
  SustainabilityIcon: <RecyclingIcon />,
  CareersIcon: <WorkOutlineIcon />,
};

function Discover() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="px-4 m-auto xl:max-w-screen-2xl">
        <h2 className="mb-6">Discover Next Net Shop</h2>

        <div className="flex flex-nowrap gap-4 overflow-x-auto">
          {discoverCards.map((card) => (
            <div key={card.title} className="w-48 shadow-md bg-white relative">
              <Link
                href={card.link}
                className="flex justify-center items-center p-10 bg-[#9DC09B]"
              >
                {discoverIconsMap[card.icon]}
              </Link>

              <div className="p-4">
                <h3>{card.title}</h3>
                <p className="mt-4 mb-12">{card.description}</p>
              </div>

              <Button
                variant="outlined"
                href={card.link}
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  color: "#84B082",
                  borderColor: "#9DC09B",
                }}
              >
                Discover Now &gt;
              </Button>
            </div>
          ))}

          <div className="w-48 shadow-md bg-white relative">
            <Link
              href="https://www.linkedin.com/in/trevor-tu/"
              className="flex justify-center items-center p-5 bg-[#9DC09B]"
            >
              <Image
                src="/cool-face.png"
                alt="Hire Me Icon"
                width={500}
                height={400}
                className="w-20"
              />
            </Link>

            <div className="p-4">
              <h3>Hire Me</h3>
              <p className="mt-4 mb-12">
                I am a full-stack developer with a passion for web development.
                Contact me!
              </p>
            </div>

            <Button
              variant="outlined"
              href="https://www.linkedin.com/in/trevor-tu/"
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                color: "#84B082",
                borderColor: "#9DC09B",
              }}
            >
              Contact Me &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
