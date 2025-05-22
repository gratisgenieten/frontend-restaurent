"use client";

import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_ADMIN, NAVIGATION_DEMO } from "@/data/navigation";
import Cookies from "js-cookie";

function Navigation() {
  const [navItems, setNavItems] = useState(NAVIGATION_DEMO);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setNavItems(NAVIGATION_ADMIN);
    } else {
      setNavItems(NAVIGATION_DEMO);
    }
  }, []);

  return (
    <ul className="nc-Navigation relative hidden lg:flex lg:flex-wrap lg:gap-x-0">
      {navItems.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
