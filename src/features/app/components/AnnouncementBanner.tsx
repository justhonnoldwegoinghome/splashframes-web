import { useAnnouncement } from "../api/getAnnouncement";

export function AnnouncementBanner() {
  const announcementQuery = useAnnouncement();

  if (!announcementQuery.data) return;

  return (
    <div className="h-8 bg-blue-500 text-sm text-white flex items-center justify-center">
      {announcementQuery.data}
    </div>
  );
}
