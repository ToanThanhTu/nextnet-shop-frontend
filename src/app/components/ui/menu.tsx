import { menu } from "@/app/data/menu";
import Link from "next/link";

function Menu() {
  return (
    <nav>
      <ul className="flex gap-4">
        {menu.map((item) => (
          <div key={item.title} className="group relative">
            <Link
              href={item.href}
              className="font-bold text-sm uppercase hover:border-b-4 border-black py-8"
            >
              {item.title}
            </Link>

            {item.children && (
              <ul className="absolute hidden group-hover:block top-14 -left-4 z-50 bg-white px-4">
                {item.children.map((child) => (
                  <li key={child.title} className="my-2">
                    <Link href={child.href} className="font-semibold hover:opacity-75">
                      {child.title}
                    </Link>

                    {child.children && (
                      <ul>
                        {child.children.map((grandchild) => (
                          <li key={grandchild.title} className="indent-2 hover:opacity-75 my-2">
                            <Link href={grandchild.href}>
                              {grandchild.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
