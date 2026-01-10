"use client";
import { Sidebar, SidebarTrigger } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Button, Input } from "@heroui/react";
import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Coins, Trophy, Users, Copy, Check, UserPlus } from "lucide-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      // Handle adding friend logic here
      console.log("Adding friend:", friendId);
      setFriendId("");
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {isSidebarOpen && <Sidebar />}

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative">

          <PageTopBar
            left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
            breadcrumbs={
              <>
                <BreadcrumbItem>Platform</BreadcrumbItem>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
              </>
            }
            className="z-10"
          />

          <div className="p-8">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-1 tracking-tight">Welcome back, Justus</h1>
                    <p className="text-zinc-500">Here's your learning overview for today.</p>
                </div>
                <div className="flex items-center gap-4">
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

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Left Column: Weekly Progress */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-xl p-6 relative overflow-hidden">
                    <h3 className="text-sm font-medium mb-8 text-zinc-400">Weekly Progress</h3>
                    <div className="relative h-64 w-full">
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

                {/* Right Column: Achievements & Friends */}
                <div className="flex flex-col gap-6">
                    {/* Card 2: Daily Achievements */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-medium text-zinc-400">Daily Achievements</h3>
                        </div>

                        <div className="flex flex-col gap-6">
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

                    {/* Connect with Friends */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                            <Users size={16} className="text-emerald-500" />
                            <h3 className="text-sm font-medium text-zinc-400">Connect with Friends</h3>
                        </div>

                        <div className="flex flex-col gap-6 flex-1">
                            {/* Your ID */}
                            <div>
                                <label className="text-xs font-medium text-zinc-500 mb-2 block">Your ID</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2.5 font-mono text-sm text-zinc-300">
                                        {userId}
                                    </div>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="flat"
                                        className={`h-10 w-10 min-w-10 ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                                        onPress={copyUserId}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </Button>
                                </div>
                                <p className="text-xs text-zinc-600 mt-1.5">Share this ID with friends</p>
                            </div>

                            {/* Add Friend */}
                            <div>
                                <label className="text-xs font-medium text-zinc-500 mb-2 block">Add Friend</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="Paste friend's ID..."
                                        variant="bordered"
                                        size="sm"
                                        value={friendId}
                                        onValueChange={setFriendId}
                                        classNames={{
                                            inputWrapper: "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 h-10",
                                            input: "font-mono text-sm",
                                        }}
                                    />
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        className="bg-emerald-500 text-white h-10 w-10 min-w-10"
                                        isDisabled={!friendId.trim()}
                                        onPress={addFriend}
                                    >
                                        <UserPlus size={16} />
                                    </Button>
                                </div>
                                <p className="text-xs text-zinc-600 mt-1.5">Enter a friend's ID to connect</p>
                            </div>

                            {/* Friends Count */}
                            <div className="mt-4 pt-4 border-t border-zinc-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-500">Connected Friends</span>
                                    <span className="text-lg font-bold text-white">4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </main>
    </div>
  );
}