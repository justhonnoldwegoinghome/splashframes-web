import { useAnnouncement } from "../api/getAnnouncement";

export function AnnouncementBanner() {
  const announcementQuery = useAnnouncement();

  if (!announcementQuery.data) return;

  return (
    <div className="h-8 px-[4vw] bg-gradient-to-r from-cyan-200 to-yellow-200 via-teal-200  text-sm text-gray-700 flex items-center justify-center">
      {announcementQuery.data}
    </div>
  );
}
