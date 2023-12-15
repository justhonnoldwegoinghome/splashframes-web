import clsx from "clsx";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";

import "@/styles/globals.css";
import { FeedbackSnackbar } from "@/components/feedbackSnackbar";
import { ProgressBar } from "@/components/progressBar";
import { AnnouncementBanner, NavBar, Footer } from "@/features/app";

const appFont = DM_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-black">
      <FeedbackSnackbar />
      <ProgressBar />
      <AnnouncementBanner />
      <NavBar />
      <main
        className={clsx(appFont.className, "max-w-screen-laptop mx-auto px-8")}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
