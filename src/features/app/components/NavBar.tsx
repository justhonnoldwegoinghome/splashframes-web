import clsx from "clsx";
import Link from "next/link";
import { Caveat } from "next/font/google";

import { CartLink } from "@/features/cart";

const logoFont = Caveat({ subsets: ["latin"] });

export function NavBar() {
  return (
    <div className="bg-white">
      <div className="max-w-screen-laptop px-8 mx-auto">
        <div className="py-4 tablet:py-8 flex items-center justify-between">
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
