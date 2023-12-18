import useSWRMutation from "swr/mutation";

function clearCartItems() {
  localStorage.setItem("cartItems", JSON.stringify([]));
  return [];
}

export function useClearCartItems() {
  return useSWRMutation("/cartItems", () => clearCartItems(), {
    throwOnError: false,
  });
}
