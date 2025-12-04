import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Play, Square, Timer } from "lucide-react";
import { useAttendance } from "@/hooks/useAttendance";
import { useState } from "react";

export default function Attendance() {
  const { entries, todayEntry, clockIn, clockOut, updateNotes, getWeeklyHours, isClockedIn } = useAttendance();
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState('');

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleSaveNotes = (date: string) => {
    updateNotes(date, notesValue);
    setEditingNotes(null);
  };

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your daily work hours and shifts</p>
        </div>

        {/* Today's Clock Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Today - {today}
            </CardTitle>
            <CardDescription>Clock in and out to track your hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">Clock In</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {todayEntry?.clockIn || '--:--'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clock Out</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {todayEntry?.clockOut || '--:--'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Today</p>
                  <p className="text-2xl font-semibold text-primary">
                    {todayEntry?.totalHours ? `${todayEntry.totalHours}h` : '--'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                {!isClockedIn && !todayEntry?.clockOut && (
                  <Button onClick={clockIn} className="gap-2">
                    <Play className="h-4 w-4" />
                    Clock In
                  </Button>
                )}
                {isClockedIn && (
                  <Button onClick={clockOut} variant="destructive" className="gap-2">
                    <Square className="h-4 w-4" />
                    Clock Out
                  </Button>
                )}
                {todayEntry?.clockOut && (
                  <Badge variant="secondary" className="text-sm py-2 px-4">
                    Shift Complete
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{getWeeklyHours().toFixed(1)}h</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Days Logged</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-foreground">{entries.length}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Hours/Day</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-foreground">
                {entries.length > 0 
                  ? (entries.reduce((sum, e) => sum + (e.totalHours || 0), 0) / entries.filter(e => e.totalHours).length || 0).toFixed(1)
                  : '0'}h
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Time Log History */}
        <Card>
          <CardHeader>
            <CardTitle>Time Log History</CardTitle>
            <CardDescription>Your recent attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedEntries.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No attendance records yet. Clock in to start tracking!</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell>{entry.clockIn || '-'}</TableCell>
                      <TableCell>{entry.clockOut || '-'}</TableCell>
                      <TableCell>
                        {entry.totalHours ? (
                          <Badge variant="outline">{entry.totalHours}h</Badge>
                        ) : (
                          <Badge variant="secondary">In Progress</Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        {editingNotes === entry.date ? (
                          <div className="flex gap-2">
                            <Textarea
                              value={notesValue}
                              onChange={(e) => setNotesValue(e.target.value)}
                              className="min-h-[60px] text-sm"
                              placeholder="Add notes..."
                            />
                            <Button size="sm" onClick={() => handleSaveNotes(entry.date)}>Save</Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingNotes(entry.date);
                              setNotesValue(entry.notes);
                            }}
                            className="text-left text-sm text-muted-foreground hover:text-foreground truncate block w-full"
                          >
                            {entry.notes || 'Add notes...'}
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
