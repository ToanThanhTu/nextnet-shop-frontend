import HeaderBottom from "@/app/components/header/header-bottom";
import HeaderTop from "@/app/components/header/header-top";

function Header() {
  return (
    <header className="z-50">
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header;