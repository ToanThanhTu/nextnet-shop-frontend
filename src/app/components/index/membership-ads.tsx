import Image from "next/image";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

function MembershipAds() {
  return (
    <div className="xl:max-w-screen-xl m-auto px-4 py-12 text-center uppercase">
      <h2>Become a member to save and get value on Next Net Shop</h2>

      <div className="flex justify-between mt-8">
        <Image
          src="/membership-card-tilted.png"
          alt="Membership Card Image"
          width={450}
          height={250}
          className="w-[150px]"
        />

        <div>
          <SwitchAccessShortcutAddIcon />
          <p>Score Points and Save</p>
        </div>

        <div>
          <LockOpenIcon />
          <p>Exclusive Offers</p>
        </div>

        <div>
          <MonetizationOnIcon />
          <p>Member Pricing</p>
        </div>

        <Link href="/membership">
          <Button className="uppercase">Learn More</Button>
        </Link>
      </div>
    </div>
  );
}

export default MembershipAds;