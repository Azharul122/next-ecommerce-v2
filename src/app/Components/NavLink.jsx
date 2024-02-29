"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, text }) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <Link className={`${isActive ? "activeClass" : ""} h-full nav`} href={href}>
      {text}
    </Link>
  );
};

export default NavLink;
