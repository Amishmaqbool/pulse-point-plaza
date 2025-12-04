import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings,
  FolderOpen,
  Clock,
  Zap
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Team", url: "/team", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Time Off", url: "/time-off", icon: Clock },
];

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">StellarStack Ltd.</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/"}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-accent text-primary"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-border p-4">
          {bottomItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-accent text-primary"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
