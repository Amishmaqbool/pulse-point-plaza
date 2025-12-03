import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone } from "lucide-react";

const employees = [
  { id: "1", name: "Sarah Chen", role: "Product Manager", department: "Product", email: "sarah@techcorp.com", phone: "+1 555-0101", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { id: "2", name: "Marcus Johnson", role: "Senior Developer", department: "Engineering", email: "marcus@techcorp.com", phone: "+1 555-0102", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: "3", name: "Emily Rodriguez", role: "UX Designer", department: "Design", email: "emily@techcorp.com", phone: "+1 555-0103", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: "4", name: "David Kim", role: "DevOps Engineer", department: "Engineering", email: "david@techcorp.com", phone: "+1 555-0104", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: "5", name: "Lisa Wang", role: "Frontend Developer", department: "Engineering", email: "lisa@techcorp.com", phone: "+1 555-0105", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: "6", name: "James Miller", role: "Backend Developer", department: "Engineering", email: "james@techcorp.com", phone: "+1 555-0106", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: "7", name: "Anna Thompson", role: "HR Manager", department: "Human Resources", email: "anna@techcorp.com", phone: "+1 555-0107", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: "8", name: "Robert Lee", role: "CTO", department: "Executive", email: "robert@techcorp.com", phone: "+1 555-0108", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
];

const Team = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Directory</h1>
            <p className="mt-1 text-muted-foreground">Find and connect with your colleagues</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarImage src={employee.avatar} />
                  <AvatarFallback>{employee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-semibold text-foreground">{employee.name}</h3>
                <p className="text-sm text-primary">{employee.role}</p>
                <p className="text-xs text-muted-foreground">{employee.department}</p>
                
                <div className="mt-4 flex gap-2">
                  <a
                    href={`mailto:${employee.email}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={`tel:${employee.phone}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Team;
