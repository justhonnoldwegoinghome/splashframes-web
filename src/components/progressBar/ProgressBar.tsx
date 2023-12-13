import NextNProgress from "nextjs-progressbar";

export function ProgressBar() {
  return (
    <NextNProgress color="black" height={2} options={{ showSpinner: false }} />
  );
}
