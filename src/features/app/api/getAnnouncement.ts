import useSWR from "swr";

export function getAnnouncement() {
  return "Free shipping across US and SG";
}

export function useAnnouncement() {
  return useSWR("/announcement", () => getAnnouncement());
}
