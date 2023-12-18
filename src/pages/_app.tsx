import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { FeedbackSnackbar } from "@/components/feedbackSnackbar";
import { ProgressBar } from "@/components/progressBar";
import { AnnouncementBanner, NavBar, Footer } from "@/features/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-gray-800">
      <FeedbackSnackbar />
      <ProgressBar />
      <AnnouncementBanner />
      <NavBar />
      <main className="max-w-screen-laptop mx-auto px-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
