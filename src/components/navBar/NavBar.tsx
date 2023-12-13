import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CartLink } from "@/features/cart";
import { WishlistLink } from "@/features/wishlist";

export function NavBar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx("py-4 flex justify-between sticky top-0", {
        "bg-gray-50": !isSticky,
        "bg-gray-100 shadow-lg": isSticky,
      })}
    >
      <div>
        <Link href="/">Logo</Link>
      </div>
      <div className="flex gap-4">
        <WishlistLink />
        <CartLink />
      </div>
    </div>
  );
}
