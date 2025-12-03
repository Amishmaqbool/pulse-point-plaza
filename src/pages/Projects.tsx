import { MainLayout } from "@/components/layout/MainLayout";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users } from "lucide-react";

const projects = [
  {
    id: "1",
    name: "Mobile App Redesign",
    description: "Complete overhaul of the customer-facing mobile application",
    progress: 75,
    status: "In Progress",
    deadline: "Dec 15, 2025",
    team: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: "2",
    name: "Cloud Migration",
    description: "Migrate legacy infrastructure to AWS cloud services",
    progress: 45,
    status: "In Progress",
    deadline: "Jan 30, 2026",
    team: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: "3",
    name: "API v3 Development",
    description: "Build next generation REST API with GraphQL support",
    progress: 90,
    status: "Review",
    deadline: "Dec 8, 2025",
    team: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: "4",
    name: "Security Audit",
    description: "Comprehensive security assessment and penetration testing",
    progress: 20,
    status: "In Progress",
    deadline: "Feb 15, 2026",
    team: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    ],
  },
  {
    id: "5",
    name: "Analytics Dashboard",
    description: "Real-time business intelligence dashboard for executives",
    progress: 100,
    status: "Completed",
    deadline: "Nov 30, 2025",
    team: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    ],
  },
];

const statusStyles = {
  "In Progress": "bg-primary/10 text-primary",
  "Review": "bg-warning/10 text-warning",
  "Completed": "bg-success/10 text-success",
};

const Projects = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-muted-foreground">Track progress on active company initiatives</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[project.status as keyof typeof statusStyles]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="mt-2 h-2" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.deadline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.map((avatar, i) => (
                      <Avatar key={i} className="h-7 w-7 border-2 border-card">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>T</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Projects;
