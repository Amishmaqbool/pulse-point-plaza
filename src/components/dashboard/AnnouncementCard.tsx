import { Megaphone } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "high" | "normal";
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Q4 All-Hands Meeting",
    content: "Join us this Friday at 2 PM for our quarterly company update. Attendance is mandatory.",
    date: "Dec 1, 2025",
    priority: "high",
  },
  {
    id: "2",
    title: "New Health Benefits",
    content: "Updated health insurance options are now available. Review them in the HR portal.",
    date: "Nov 28, 2025",
    priority: "normal",
  },
  {
    id: "3",
    title: "Office Closure - Holidays",
    content: "The office will be closed from Dec 24-26 for the holiday break.",
    date: "Nov 25, 2025",
    priority: "normal",
  },
];

export function AnnouncementCard() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Megaphone className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Announcements</h3>
      </div>
      <div className="divide-y divide-border">
        {announcements.map((item) => (
          <div key={item.id} className="p-4 transition-colors hover:bg-secondary/50">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-foreground">{item.title}</h4>
              {item.priority === "high" && (
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                  Important
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.content}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
