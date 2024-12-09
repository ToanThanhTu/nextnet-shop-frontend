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
      <div className="flex gap-4 text-white text-sm ml-6 py-1">
        <Link href="/contact-me">Contact Me</Link>
        <Link href="/track-my-order">Track My Order</Link>
        <Link href="/gift-cards">Gift Cards</Link>
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
