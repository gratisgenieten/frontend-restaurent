"use client";

import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_ADMIN, NAVIGATION_DEMO } from "@/data/navigation";
import Cookies from "js-cookie";
import { usePathname } from 'next/navigation'

function Navigation() {
  const [navItems, setNavItems] = useState(NAVIGATION_DEMO);
  const pathname = usePathname();
  useEffect(() => {
    const hideLayout = pathname.includes('/account') || pathname.includes('/wallet') || pathname.includes('/tell-a-friend') || pathname.includes('/calendar')
    if (hideLayout) {
      setNavItems(NAVIGATION_ADMIN);
    } else {
      setNavItems(NAVIGATION_DEMO);
    }
  }, [pathname]);

  return (
    <ul className="nc-Navigation relative hidden lg:flex lg:flex-wrap lg:gap-x-0">
      {navItems.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
