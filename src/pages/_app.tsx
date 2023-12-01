import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";

import "@/styles/globals.css";
import { AnnouncementBanner } from "@/features/announcement";
import { CartLink } from "@/features/cart";

const appFont = DM_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-black">
      <AnnouncementBanner />
      <NavBar />
      <div className={clsx(appFont.className, "max-w-screen-laptop mx-auto")}>
        <div className="px-[3vw]">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
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
      <div className="flex gap-4">
        <span>Hamburger</span>
        <Link href="/">Logo</Link>
      </div>
      <div>
        <CartLink />
      </div>
    </div>
  );
}
