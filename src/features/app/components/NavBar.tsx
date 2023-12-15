import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";

import { CartLink } from "@/features/cart";

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
      className={clsx("bg-white z-10 sticky top-0", {
        "shadow-lg": isSticky,
      })}
    >
      <div className="max-w-screen-laptop px-[3vw] mx-auto">
        <div className="py-6 flex justify-between">
          <div>
            <Link href="/">
              <span>Splashframes</span>
            </Link>
          </div>
          <div className="flex gap-4">
            <CartLink />
          </div>
        </div>
      </div>
    </div>
  );
}
