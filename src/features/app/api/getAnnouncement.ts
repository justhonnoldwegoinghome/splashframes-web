import useSWR from "swr";

export function getAnnouncement() {
  return "Free shipping in Singapore";
}

export function useAnnouncement() {
  return useSWR("/announcement", () => getAnnouncement());
}
