import clsx from "clsx";
import { PiGlobeThin } from "react-icons/pi";
import { Listbox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { PiCheckLight } from "react-icons/pi";

const COUNTRIES = [
  {
    value: "us",
    label: "US",
    iconURL: "/flag_us.svg",
    currency: {
      value: "usd",
      label: "USD",
    },
  },
  //   {
  //     value: "sg",
  //     label: "SG",
  //     iconURL: "/flag_sg.svg",
  //     currency: {
  //       value: "sgd",
  //       label: "SGD",
  //     },
  //   },
];

export function CountryMenu() {
  const [selected, setSelected] = useState(COUNTRIES[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative bg-white w-10 h-10 text-gray-500 hover:text-gray-700 rounded flex items-center justify-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sauce">
          <PiGlobeThin className="text-3xl" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 mt-1 w-36 max-h-60 rounded-md bg-white text-base shadow focus:outline-none">
            {COUNTRIES.map((c) => (
              <Listbox.Option
                key={c.value}
                className={({ active }) =>
                  clsx("pl-2 py-2 pr-4", {
                    "bg-gray-100": active,
                  })
                }
                value={c}
              >
                {({ selected }) => (
                  <div className="w-full flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={c.iconURL} className="w-8 shadow rounded-sm" />
                      <span
                        className={clsx("block truncate", {
                          "font-medium": selected,
                        })}
                      >
                        {c.currency.label}
                      </span>
                    </div>

                    {selected ? (
                      <span>
                        <PiCheckLight />
                      </span>
                    ) : null}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
