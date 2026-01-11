"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Trophy, ChevronUp, ChevronDown, Minus, Gift, Shield } from "lucide-react";

export default function LeaderboardPage() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState(true, false);

  const leagueData = [
    { rank: 1, name: "MaxCoder", xp: 2450, isYou: false, avatar: "M", change: "up", reward: 500, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/50" },
    { rank: 2, name: "Sarah_Dev", xp: 2380, isYou: false, avatar: "S", change: "same", reward: 250, color: "text-zinc-300", bg: "bg-zinc-500/10", border: "border-zinc-500/50" },
    { rank: 3, name: "Justus (You)", xp: 2210, isYou: true, avatar: "J", change: "up", reward: 100, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/50" },
    { rank: 4, name: "CodeNinja", xp: 1890, isYou: false, avatar: "C", change: "down" },
    { rank: 5, name: "ByteMaster", xp: 1650, isYou: false, avatar: "B", change: "same" },
    { rank: 6, name: "PixelArt", xp: 1420, isYou: false, avatar: "P", change: "down" },
    { rank: 7, name: "DevOps_Guru", xp: 1200, isYou: false, avatar: "D", change: "same" },
    { rank: 8, name: "NoobMaster", xp: 900, isYou: false, avatar: "N", change: "down" },
    { rank: 9, name: "LazyDev", xp: 450, isYou: false, avatar: "L", change: "down" },
  ];
  const topThree = leagueData.slice(0, 3);
  const ladderRest = leagueData.slice(3);
  const you = leagueData.find((d) => d.isYou);
  const promotionXp = 2500;
  const progressToPromo = Math.min(100, Math.round(((you?.xp ?? 0) / promotionXp) * 100));
  const seasonTimeLeft = "2d 14h";

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-[#050505]">
        <PageTopBar
            left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
            breadcrumbs={
              <>
                <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Leaderboard</BreadcrumbItem>
              </>
            }
            className="z-10"
        />

        <div className="p-6 max-w-7xl mx-auto w-full relative z-10">
          {/* Hero */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-300">
                <Shield size={12} className="text-blue-400" /> Diamond League
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-400">
                Ends in {seasonTimeLeft}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-900/60 border border-white/5 text-emerald-300">
                Top 5 promote
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Global Rankings</h1>
            <p className="text-zinc-500 mt-1">Minimal board inspired by Community styles. Stay in the promotion lane.</p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Top 3 compact */}
              <div className="grid sm:grid-cols-3 gap-3">
                {topThree.map((entry) => (
                  <div key={entry.rank} className="rounded-2xl border border-white/5 bg-zinc-900/30 p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 rounded-lg bg-zinc-900/70 border border-white/5 text-[11px] text-zinc-400">#{entry.rank}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-200">
                        <Gift size={12} /> {entry.reward ?? 0} T
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center text-lg font-bold text-white">
                        {entry.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{entry.name}</p>
                        <p className="text-[11px] text-zinc-500">{entry.xp} XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                      {entry.change === "up" && <ChevronUp size={12} className="text-emerald-400" />}
                      {entry.change === "down" && <ChevronDown size={12} className="text-red-400" />}
                      {entry.change === "same" && <Minus size={12} className="text-zinc-500" />}
                      <span>{entry.change === "same" ? "Stable" : entry.change === "up" ? "Rising" : "Falling"}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ladder list */}
              <div className="rounded-2xl border border-white/5 bg-zinc-900/20 overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between text-[12px] text-zinc-500 border-b border-white/5">
                  <span className="inline-flex items-center gap-1 text-emerald-400"><ChevronUp size={12} /> Promotion zone</span>
                  <span className="inline-flex items-center gap-1 text-red-400">Demotion <ChevronDown size={12} /></span>
                </div>
                <div className="divide-y divide-white/5">
                  {ladderRest.map((user) => {
                    const isPromotion = user.rank <= 5;
                    const isDemotion = user.rank >= 8;
                    const isYou = user.isYou;
                    const changeIcon = user.change === "up" ? <ChevronUp size={14} className="text-emerald-400" /> : user.change === "down" ? <ChevronDown size={14} className="text-red-400" /> : <Minus size={14} className="text-zinc-500" />;
                    const progress = Math.min(100, Math.round((user.xp / promotionXp) * 100));

                    return (
                      <div 
                        key={user.rank}
                        className={`flex items-center gap-3 px-4 py-3 ${isYou ? "bg-blue-500/5" : "bg-transparent"} hover:bg-white/5 transition-colors`}
                      >
                        <div className={`w-8 text-center font-mono font-bold ${
                          isPromotion ? "text-emerald-400" : isDemotion ? "text-red-400" : "text-zinc-600"
                        }`}>
                          {user.rank}
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-bold text-sm text-zinc-200">
                          {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium truncate ${isYou ? "text-white" : "text-zinc-200"}`}>
                              {user.name}
                            </span>
                            {isYou && <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">You</span>}
                          </div>
                          <div className="mt-1 h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-mono font-bold text-white text-sm">{user.xp}</div>
                            <div className="text-[10px] text-zinc-600 uppercase tracking-wider">XP</div>
                          </div>
                          <div className="w-6 flex justify-center">
                            {changeIcon}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-white/5 bg-zinc-900/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-white">Your status</p>
                  <span className="text-[11px] text-zinc-500">#{you?.rank ?? "-"}</span>
                </div>
                <div className="space-y-2 text-sm text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>Current XP</span>
                    <span className="font-mono text-white">{you?.xp ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next promotion</span>
                    <span className="text-emerald-300">{promotionXp} XP</span>
                  </div>
                  <div className="h-2 rounded-full bg-black/40 overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: `${progressToPromo}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-white/5 bg-zinc-900/30">
                <p className="text-sm font-semibold text-white mb-3">League rules</p>
                <ul className="space-y-2 text-[12px] text-zinc-400">
                  <li>• Top 5 move up automatically</li>
                  <li>• Ranks 6-7 stay in Diamond</li>
                  <li>• Bottom 3 demote to Platinum</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
