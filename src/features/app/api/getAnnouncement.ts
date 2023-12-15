import useSWR from "swr";

export function getAnnouncement() {
  return "";
}

export function useAnnouncement() {
  return useSWR("/announcement", () => getAnnouncement());
}
