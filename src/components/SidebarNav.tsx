"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsletterTrigger from "./NewsletterTrigger";

const menu = [
  { href: "/", label: "Ana Sayfa", match: (path: string) => path === "/" },
  {
    href: "/yazilar",
    label: "Yazılar",
    match: (path: string) => path.startsWith("/yazilar"),
  },
  {
    href: "/about",
    label: "Hakkında",
    match: (path: string) => path.startsWith("/about"),
  },
  {
    href: "/iletisim",
    label: "İletişim",
    match: (path: string) => path.startsWith("/iletisim"),
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <ul className="menu-list" id="menu">
      {menu.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={item.match(pathname) ? "active" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <NewsletterTrigger />
      </li>
    </ul>
  );
}
