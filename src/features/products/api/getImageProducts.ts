import { get } from "@/utils/apiClient";
import { APIList } from "@/types/api";

import { Product } from "../types";

export function getImageProducts({ id }: { id: Product["id"] }) {
  return get<APIList<Product>>(`/images/${id}/products`);
}
