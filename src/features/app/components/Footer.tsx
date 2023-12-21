import { PiInstagramLogoFill } from "react-icons/pi";
import Link from "next/link";

export function Footer() {
  return (
    <div className="border-t">
      <div className="max-w-screen-laptop mx-auto px-[4vw] py-24">
        <div className="flex flex-col items-center justify-between tablet:flex-row-reverse gap-12 flex-wrap text-gray-500">
          <div className="flex gap-12 flex-wrap">
            {footerItems.map(({ label, links }) => (
              <div key={label}>
                <p className="font-medium text-gray-600 mb-3">{label}</p>
                <div className="flex flex-col gap-1">
                  {links.map(({ label, href }, i) => (
                    <Link
                      key={i}
                      href={href}
                      target="_blank"
                      className="hover:text-sauce"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <p>© 2023, Splashframes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const footerItems = [
  {
    label: "Customer care",
    links: [
      {
        label: "Privacy policy",
        href: "/privacy-policy",
      },
      {
        label: "Refund policy",
        href: "/refund-policy",
      },
    ],
  },
  {
    label: "Contact us",
    links: [
      {
        label: "hello@splashframes.com",
        href: "mailto:hello@splashframes.com",
      },
    ],
  },
  {
    label: "Find us",
    links: [
      {
        label: <PiInstagramLogoFill className="text-3xl" />,
        href: "https://www.instagram.com/splashframes/",
      },
    ],
  },
];
