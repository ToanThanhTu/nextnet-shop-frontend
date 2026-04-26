/**
 * UI-only types. Domain entities live under src/modules/<domain>/entities/.
 */

export type MenuItem = {
  title: string
  href: string
  children?: MenuItem[]
}

export type Highlight = {
  title: string
  image: string
  href: string
}

export type DiscoverCard = {
  title: string
  description: string
  icon: string
  link: string
}
