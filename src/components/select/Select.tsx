import clsx from "clsx";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { PiCaretDownLight, PiCheckLight } from "react-icons/pi";

interface Option<V> {
  label: string;
  value: V;
}

interface SelectProps<V> {
  options: Option<V>[];
  selectedOption: Option<V>;
  onChange: (o: Option<V>) => void;
}

export function Select<V>({
  options,
  selectedOption,
  onChange,
}: SelectProps<V>) {
  return (
    <div className="w-full max-w-[280px]">
      <Listbox value={selectedOption} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white py-3 pl-3 pr-12 text-left ring-1 ring-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 text-sm text-gray-500">
            <span className="block truncate">{selectedOption.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <PiCaretDownLight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg focus:outline-none z-10">
              {options.map((o) => (
                <Listbox.Option
                  key={o.label}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-3 pl-6 pr-3 flex justify-between items-center",
                      {
                        "bg-gray-100": active,
                        "font-medium": selectedOption.value === o.value,
                      }
                    )
                  }
                  value={o}
                >
                  <span className={"block truncate"}>{o.label}</span>
                  {selectedOption.value === o.value && (
                    <PiCheckLight className="h-4 w-4" />
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
