import { Category } from "@/app/types"
import SubMenu from "@/app/components/menu/subMenu"
import { MouseEvent } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  category: Category
  selectedMenu: number
  toggleSubMenu: (event: MouseEvent<HTMLButtonElement>) => void
  closeSubMenu: () => void
}

function MenuItem({ category, selectedMenu, toggleSubMenu, closeSubMenu }: Props) {
  return (
    <div>
      <button
        className={cn(
          "font-bold text-sm uppercase border-b-4 py-10 flex items-center gap-1",
          "hover:border-black hover:cursor-pointer",
          selectedMenu === category.id
            ? "border-primary-dark text-primary-dark"
            : "border-transparent text-black"
        )}
        value={category.id}
        onClick={toggleSubMenu}
      >
        {category.title}
        {selectedMenu === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {selectedMenu === category.id ? (
        <>
          <div
            className="fixed inset-0 top-[132px] h-screen bg-black opacity-80 z-10"
            onClick={closeSubMenu}
          />
          <SubMenu category={category} closeSubMenu={closeSubMenu} />
        </>
      ) : null}
    </div>
  )
}

export default MenuItem
