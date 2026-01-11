"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { useState } from "react";
import { BreadcrumbItem, Button, Input } from "@heroui/react";
import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Coins, Users, Copy, Check, UserPlus } from "lucide-react";

const data = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 20 },
  { name: 'Wed', value: 40 },
  { name: 'Thu', value: 15 },
  { name: 'Fri', value: 25 },
  { name: 'Sat', value: 10 },
  { name: 'Sun', value: 5 },
];

const CustomDot = (props) => {
    const { cx, cy, stroke } = props;
    return (
        <g>
            <circle cx={cx} cy={cy} r={8} fill="none" stroke={stroke} strokeWidth={2} strokeOpacity={0.2} />
            <circle cx={cx} cy={cy} r={3} fill="#000" stroke={stroke} strokeWidth={2} />
        </g>
    );
};

export default function Dashboard() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState(true, false);
  const [copied, setCopied] = useState(false);
  const [friendId, setFriendId] = useState("");
  const userId = "USR-7X9K2M4P";

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addFriend = () => {
    if (friendId.trim()) {
      console.log("Adding friend:", friendId);
      setFriendId("");
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-[#050505]">

          <PageTopBar
            left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
            breadcrumbs={
              <>
                <BreadcrumbItem href="/dashboard">Platform</BreadcrumbItem>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
              </>
            }
            className="z-10"
          />

          <div className="p-6 max-w-7xl mx-auto w-full">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1 tracking-tight">Welcome back, Justus</h1>
                    <p className="text-zinc-500">Here's your learning overview for today.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-500">
                        <span>🔥</span>
                        <span className="text-sm font-bold">12 Day Streak</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400">
                        <Coins size={16} />
                        <span className="text-sm font-bold">1,240 Tokens</span>
                    </div>
                </div>
            </header>

            {/* Quick Actions / Continue Learning */}
            <div className="mb-8 p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/30">
                        <span className="font-bold text-lg">J</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Java 101: Fundamentals</h3>
                        <p className="text-sm text-zinc-400">Last active: <span className="text-zinc-300">Variables Part 1</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none h-2 w-32 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]" />
                    </div>
                    <span className="text-xs font-bold text-zinc-500">65%</span>
                    <Button 
                        className="bg-white text-black font-bold px-6 rounded-lg ml-2"
                        size="sm"
                    >
                        Continue
                    </Button>
                </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Weekly Progress */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-xl p-6 relative overflow-hidden min-w-0 h-full">
                    <h3 className="text-sm font-medium mb-8 text-zinc-400">Weekly Progress</h3>
                    <div className="relative h-64 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 30, bottom: 25, left: 30 }}>
                                <CartesianGrid strokeDasharray="6 6" stroke="#27272a" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: '#27272a', strokeWidth: 1 }}
                                />
                                <Line
                                    type="linear"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={<CustomDot />}
                                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#000', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Achievements */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6 text-zinc-400">
                        <h3 className="text-sm font-medium">Daily Achievements</h3>
                    </div>

                    <div className="flex flex-col gap-6 flex-1 justify-center">
                        {/* Goal 1 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-zinc-300">Challenges</span>
                                <span className="text-zinc-500">1/3</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-1/3 rounded-full" />
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">Solve 3 challenges first try</p>
                        </div>

                        {/* Goal 2 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-zinc-300">XP Earned</span>
                                <span className="text-zinc-500">60/180</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-1/3 rounded-full" />
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">Earn 180 XP today</p>
                        </div>

                        {/* Goal 3 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-zinc-300">Exercises</span>
                                <span className="text-zinc-500">1/8</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[12%] rounded-full" />
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">Complete 8 practice sets</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </main>
    </div>
  );
}