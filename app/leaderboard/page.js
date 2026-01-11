"use client";
import { useState } from "react";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { BreadcrumbItem } from "@heroui/react";
import { Trophy, Medal, Shield, Sparkles, Star, Crown } from "lucide-react";

const leagueEntries = [
  { name: "Justus", course: "Java 101", score: 1280, streak: 12, rank: 1, me: true },
  { name: "Ava", course: "Java 101", score: 1205, streak: 8, rank: 2 },
  { name: "Liam", course: "Java 101", score: 1180, streak: 6, rank: 3 },
  { name: "Noah", course: "Java 101", score: 1100, streak: 5, rank: 4 },
  { name: "Mia", course: "Java 101", score: 980, streak: 4, rank: 5 },
];

const courseEntries = [
  { name: "Justus", course: "Java 101", score: 640, streak: 12, rank: 1, me: true },
  { name: "Ava", course: "Java 101", score: 610, streak: 8, rank: 2 },
  { name: "Ethan", course: "Java 101", score: 590, streak: 7, rank: 3 },
  { name: "Sophia", course: "Java 101", score: 520, streak: 3, rank: 4 },
  { name: "Noah", course: "Java 101", score: 505, streak: 2, rank: 5 },
];

export default function LeaderboardPage() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();
  const [activeTab, setActiveTab] = useState("league");

  const rows = activeTab === "league" ? leagueEntries : courseEntries;

  const badgeForRank = (rank) => {
    if (rank === 1) return <Crown size={16} className="text-amber-400" />;
    if (rank === 2) return <Medal size={16} className="text-slate-200" />;
    if (rank === 3) return <Medal size={16} className="text-amber-700" />;
    return <Shield size={16} className="text-zinc-500" />;
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-1 h-full overflow-y-auto flex flex-col relative">
        <PageTopBar
          left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
          breadcrumbs={
            <>
              <BreadcrumbItem>Platform</BreadcrumbItem>
              <BreadcrumbItem>Leaderboard</BreadcrumbItem>
            </>
          }
        />

        <div className="p-8">
          <header className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
              <p className="text-zinc-500">Vergleiche dich mit deiner Liga und deinem aktuellen Kurs.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300">
                <Trophy size={16} />
                <span className="text-sm font-semibold">Aktuelle Liga: Platinum</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300">
                <Star size={16} />
                <span className="text-sm font-semibold">Kurs: Java 101</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Trophy className="text-amber-300" size={20} />
              </div>
              <div>
                <p className="text-xs uppercase text-zinc-500 tracking-[0.2em]">Gesamtrang</p>
                <p className="text-xl font-semibold">#1 in Liga</p>
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Sparkles className="text-blue-300" size={20} />
              </div>
              <div>
                <p className="text-xs uppercase text-zinc-500 tracking-[0.2em]">Kurs-Rank</p>
                <p className="text-xl font-semibold">#1 in Java 101</p>
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Shield className="text-emerald-300" size={20} />
              </div>
              <div>
                <p className="text-xs uppercase text-zinc-500 tracking-[0.2em]">Streak</p>
                <p className="text-xl font-semibold">12 Tage</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setActiveTab("league")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                activeTab === "league"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400 border-zinc-900 hover:border-zinc-800"
              }`}
            >
              Aktuelle Liga
            </button>
            <button
              onClick={() => setActiveTab("course")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                activeTab === "course"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400 border-zinc-900 hover:border-zinc-800"
              }`}
            >
              Aktueller Kurs
            </button>
          </div>

          <div className="bg-zinc-950/50 border border-zinc-900 rounded-xl overflow-hidden">
            <div className="grid grid-cols-5 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span>Rang</span>
              <span>Name</span>
              <span>Kurs</span>
              <span>Score</span>
              <span>Streak</span>
            </div>
            <div className="divide-y divide-zinc-900">
              {rows.map((row) => (
                <div
                  key={row.rank}
                  className={`grid grid-cols-5 px-4 py-3 items-center text-sm ${
                    row.me ? "bg-white/5 border-l-4 border-emerald-500" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-zinc-200">
                    {badgeForRank(row.rank)}
                    <span>#{row.rank}</span>
                  </div>
                  <div className="font-medium">{row.name}{row.me ? " (You)" : ""}</div>
                  <div className="text-zinc-400">{row.course}</div>
                  <div className="font-mono text-emerald-300">{row.score}</div>
                  <div className="text-zinc-300">{row.streak} Tage</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
