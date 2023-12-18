import useSWR from "swr";

export function getAnnouncement() {
  return "Free shipping to selected countries";
}

export function useAnnouncement() {
  return useSWR("/announcement", () => getAnnouncement());
}
