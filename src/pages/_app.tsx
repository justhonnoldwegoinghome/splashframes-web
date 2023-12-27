import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import { FeedbackSnackbar } from "@/components/feedbackSnackbar";
import { ProgressBar } from "@/components/progressBar";
import { AnnouncementBanner, NavBar, Footer } from "@/features/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-primary">
      <FeedbackSnackbar />
      <ProgressBar />
      <AnnouncementBanner />
      <NavBar />
      <main className="max-w-screen-laptop mx-auto px-[5vw] pb-24 pt-4 min-h-[100vh]">
        <Component {...pageProps} />
      </main>
      <Footer />
      <Analytics mode="production" />
    </div>
  );
}
