import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "away" | "offline";
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Senior Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "away",
  },
  {
    id: "4",
    name: "David Kim",
    role: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    status: "offline",
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    status: "online",
  },
];

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

export function TeamMemberCard() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Your Team</h3>
        <span className="ml-auto text-sm text-muted-foreground">{teamMembers.length} members</span>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${statusColors[member.status]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
