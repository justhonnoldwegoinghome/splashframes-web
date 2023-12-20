import clsx from "clsx";
import Link from "next/link";
import { Caveat } from "next/font/google";

import { CartLink } from "@/features/cart";

import { CountryMenu } from "./CountryMenu";

const logoFont = Caveat({ subsets: ["latin"] });

export function NavBar() {
  return (
    <div className="bg-white">
      <div className="max-w-screen-laptop px-[4vw] mx-auto">
        <div className="py-4 tablet:py-8 flex items-center justify-between">
          <div>
            <Link href="/">
              <span
                className={clsx(
                  logoFont.className,
                  "text-3xl font-light  text-gray-600 hover:text-gray-900 duration-200"
                )}
              >
                Splashframes
              </span>
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <CartLink />
            <CountryMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
