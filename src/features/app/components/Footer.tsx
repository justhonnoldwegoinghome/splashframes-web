import { PiInstagramLogoFill } from "react-icons/pi";
import Link from "next/link";

export function Footer() {
  return (
    <div className="border-t">
      <div className="max-w-screen-laptop mx-auto px-8 py-24">
        <div className="flex flex-col items-center justify-between tablet:flex-row-reverse gap-12 flex-wrap text-sm text-gray-500">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <p className="font-medium text-gray-600 mb-2">Support</p>
              <Link
                href="/privacy-policy"
                className="hover:underline underline-offset-4"
              >
                Privacy policy
              </Link>
              <Link
                href="/refund-policy"
                className="hover:underline underline-offset-4"
              >
                Refund policy
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-600 mb-2">Find us</p>
              <Link
                href="https://www.instagram.com/splashframes/"
                target="_blank"
                className="hover:underline underline-offset-4"
              >
                <PiInstagramLogoFill className="text-2xl" />
              </Link>
            </div>
          </div>
          <div>
            <p>© 2023, Splashframes</p>
            <p>hello@splashframes.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
