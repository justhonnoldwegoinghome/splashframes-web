import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";

import { CartLink } from "@/features/cart";

const logoFont = Caveat({ subsets: ["latin"] });

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
      <div className="max-w-screen-laptop px-8 mx-auto">
        <div
          className={clsx("flex items-center justify-between", {
            "py-4": isSticky,
            "py-8": !isSticky,
          })}
        >
          <div>
            <Link href="/">
              <span
                className={clsx(
                  logoFont.className,
                  "text-4xl font-bold text-blue-500 hover:text-gray-700 duration-200"
                )}
              >
                Splashframes
              </span>
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
