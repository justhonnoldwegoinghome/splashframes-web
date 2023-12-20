import { PiCheckCircleFill } from "react-icons/pi";
import { useEffect } from "react";

import { useClearCartItems } from "@/features/cart";

export default function Page() {
  const clearCartItemsMutation = useClearCartItems();

  useEffect(() => {
    clearCartItemsMutation.trigger();
  }, []);

  return (
    <div>
      <div className="max-w-screen-tablet mx-auto flex flex-col items-center">
        <PiCheckCircleFill className="text-5xl text-teal-400" />
        <h1 className="text-3xl mb-4 text-teal-500">Order confirmed</h1>
        <p className="text-secondary">
          You will receive an order confirmation email shortly. Thank you for
          shopping with us!
        </p>
      </div>
    </div>
  );
}
