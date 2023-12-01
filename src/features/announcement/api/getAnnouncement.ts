import useSWR from "swr";

export function getAnnouncement() {
  return "Announcement";
}

export function useAnnouncement() {
  return useSWR("/announcement", () => getAnnouncement());
}
