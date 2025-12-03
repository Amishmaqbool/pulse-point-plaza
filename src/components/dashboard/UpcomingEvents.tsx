import { CalendarDays } from "lucide-react";

interface Event {
  id: string;
  title: string;
  time: string;
  type: "meeting" | "deadline" | "event";
}

const events: Event[] = [
  { id: "1", title: "Sprint Planning", time: "10:00 AM", type: "meeting" },
  { id: "2", title: "Design Review", time: "2:00 PM", type: "meeting" },
  { id: "3", title: "Project Alpha Deadline", time: "5:00 PM", type: "deadline" },
  { id: "4", title: "Team Happy Hour", time: "6:00 PM", type: "event" },
];

const typeStyles = {
  meeting: "bg-primary/10 text-primary",
  deadline: "bg-destructive/10 text-destructive",
  event: "bg-success/10 text-success",
};

export function UpcomingEvents() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Today's Schedule</h3>
      </div>
      <div className="p-4 space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50">
            <span className={`rounded-md px-2 py-1 text-xs font-medium ${typeStyles[event.type]}`}>
              {event.time}
            </span>
            <span className="text-sm text-foreground">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
