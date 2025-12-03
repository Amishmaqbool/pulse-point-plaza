import { Clock, FileText, Calendar, MessageSquare, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { icon: Clock, label: "Request Time Off", color: "text-primary" },
  { icon: FileText, label: "Submit Expense", color: "text-success" },
  { icon: Calendar, label: "Book Meeting Room", color: "text-warning" },
  { icon: MessageSquare, label: "IT Support", color: "text-destructive" },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 font-semibold text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="secondary"
            className="h-auto flex-col gap-2 py-4 hover:bg-secondary/80"
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
