import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Link from "next/link";

function HeaderTop() {
  return (
    <div className="flex justify-between gap-4 bg-black">
      <div>
        <div className="hidden md:flex gap-4 text-white text-sm ml-6 py-1">
          <Link href="/contact-me" className="hover:opacity-75">
            Contact Me
          </Link>
          <Link href="/track-my-order" className="hover:opacity-75">
            Track My Order
          </Link>
          <Link href="/gift-cards" className="hover:opacity-75">
            Gift Cards
          </Link>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="uppercase">
          <div className="bg-[#84b082] text-sm font-bold flex items-center px-6 py-1">
            Login or Register
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <Link href="/login">
            <DropdownMenuItem className="bg-black uppercase text-white justify-center hover:opacity-75">
              Login
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="uppercase justify-center hover:opacity-75">
            Register
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderTop;
