import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";

import "@/styles/globals.css";
import { ProgressBar } from "@/components/progressBar";
import { AnnouncementBanner } from "@/features/announcement";
import { CartLink } from "@/features/cart";
import { WishlistLink } from "@/features/wishlist";

const appFont = DM_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-black">
      <ProgressBar />
      <AnnouncementBanner />
      <NavBar />
      <main className={clsx(appFont.className, "max-w-screen-laptop mx-auto")}>
        <Component {...pageProps} />
      </main>
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
      <div className="flex gap-4">
        <WishlistLink />
        <CartLink />
      </div>
    </div>
  );
}
