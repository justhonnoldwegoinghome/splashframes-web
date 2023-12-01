import { useAnnouncement } from "../api/getAnnouncement";

export function AnnouncementBanner() {
  const announcementQuery = useAnnouncement();

  return (
    <div className="h-8 bg-black text-white">{announcementQuery.data}</div>
  );
}
