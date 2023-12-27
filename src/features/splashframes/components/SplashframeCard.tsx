import _ from "lodash";
import { PiArrowLeftThin } from "react-icons/pi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Splashframe, SplashframePage } from "..";

interface SplashframeCardProps {
  splashframe: Splashframe;
}

export function SplashframeCard({ splashframe }: SplashframeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    window.history.replaceState("", "", `/splashframes/${splashframe.id}`);
  }

  function closeModal() {
    setIsOpen(false);
    window.history.replaceState("", "", "/splashframes");
  }

  return (
    <>
      <button
        onClick={openModal}
        className="block bg-white p-1 hover:p-0 duration-300 rounded"
      >
        <div className="hover:shadow-[0_5px_10px_rgba(0,0,0,0.1)] duration-300">
          <img src={splashframe.image_urls[0]} className="rounded" />
        </div>
      </button>
      <SplashframeModal
        splashframe={splashframe}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
}

interface SplashframeModalProps {
  splashframe: Splashframe;
  isOpen: boolean;
  closeModal: () => void;
}

function SplashframeModal({
  splashframe,
  isOpen,
  closeModal,
}: SplashframeModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed bottom-0 top-[5vh] left-0 right-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="transition-all bg-white w-full rounded-t-lg">
              <div className="py-4 border-b">
                <div className="max-w-screen-laptop mx-auto px-[5vw]">
                  <button
                    onClick={closeModal}
                    className="text-sm text-secondary flex items-center gap-1 hover:text-black outline-none"
                  >
                    <PiArrowLeftThin className="text-xl" />
                    Back
                  </button>
                </div>
              </div>
              <div className="overflow-auto max-h-[95vh] pt-[4vh] pb-60">
                <div className="max-w-screen-laptop mx-auto px-[5vw] min-h-[100vh]">
                  <SplashframePage splashframe={splashframe} />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
        {/* </div> */}
      </Dialog>
    </Transition>
  );
}
