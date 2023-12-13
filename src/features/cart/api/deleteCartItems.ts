import useSWRMutation from "swr/mutation";

function deleteCartItems() {
  localStorage.setItem("cartItems", JSON.stringify([]));
  return;
}

export function useDeleteCartItems() {
  return useSWRMutation("/cartItems", () => deleteCartItems());
}
