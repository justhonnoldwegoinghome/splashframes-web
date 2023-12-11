import useSWRMutation from "swr/mutation";

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  return;
}

export function useClearCart() {
  return useSWRMutation("/cart", () => clearCart());
}
