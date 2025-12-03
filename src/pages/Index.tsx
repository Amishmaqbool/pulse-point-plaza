import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnnouncementCard } from "@/components/dashboard/AnnouncementCard";
import { TeamMemberCard } from "@/components/dashboard/TeamMemberCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Users, FolderOpen, Clock, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, John 👋</h1>
          <p className="mt-1 text-muted-foreground">Here's what's happening at TechCorp today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Employees"
            value={156}
            change="+3 this month"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Active Projects"
            value={24}
            change="2 launching soon"
            changeType="neutral"
            icon={FolderOpen}
          />
          <StatsCard
            title="PTO Balance"
            value="12 days"
            change="4 days used"
            changeType="neutral"
            icon={Clock}
          />
          <StatsCard
            title="Tasks Completed"
            value={47}
            change="+12 this week"
            changeType="positive"
            icon={CheckCircle}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <AnnouncementCard />
            <UpcomingEvents />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <TeamMemberCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
