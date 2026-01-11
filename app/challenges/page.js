"use client";
import { Sidebar, SidebarTrigger } from "../../components/Sidebar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import { Swords, Trophy, Flame, Zap, Code, Terminal, Layers } from "lucide-react";

export default function ChallengesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const trainingGrounds = [
    { id: 1, title: "Loop Master", lang: "Java", difficulty: "Easy", xp: 50, icon: Layers },
    { id: 2, title: "Array Manipulation", lang: "Python", difficulty: "Medium", xp: 120, icon: Code },
    { id: 3, title: "Recursion Depth", lang: "Java", difficulty: "Hard", xp: 300, icon: Terminal },
    { id: 4, title: "String Parsing", lang: "Python", difficulty: "Easy", xp: 60, icon: Code },
    { id: 5, title: "Binary Trees", lang: "C++", difficulty: "Hard", xp: 350, icon: Layers },
    { id: 6, title: "Async Functions", lang: "JS", difficulty: "Medium", xp: 150, icon: Zap },
  ];

  const getDifficultyColor = (diff) => {
      switch(diff) {
          case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
          case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
          case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
          default: return 'text-zinc-400';
      }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-[#050505]">
        <header className="h-14 border-b border-white/5 flex items-center px-4 gap-4 bg-black/50 backdrop-blur-md sticky top-0 z-10">
            <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="h-4 w-[1px] bg-white/10" />
            <Breadcrumbs 
                variant="light"
                classNames={{ list: "gap-2" }}
                itemClasses={{ item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors", separator: "text-zinc-700" }}
            >
                <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Challenges</BreadcrumbItem>
            </Breadcrumbs>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 tracking-tight flex items-center gap-3">
                    <Swords className="text-blue-500" /> Daily Arena
                </h1>
                <p className="text-zinc-500">Compete in daily coding challenges to earn XP and rare badges.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {/* Daily Challenge Card */}
                <div className="col-span-1 md:col-span-2 relative group rounded-3xl bg-gradient-to-br from-blue-900/20 via-black to-black border border-white/10 p-8 overflow-hidden hover:border-blue-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20">Daily Quest</span>
                                <span className="flex items-center gap-2 text-zinc-400 text-sm font-mono"><Zap size={14} className="text-yellow-500" /> 2h 45m left</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Algorithm Optimization</h2>
                            <p className="text-zinc-400 max-w-lg">Optimize the sorting algorithm to run in O(n log n) time complexity. Memory usage must stay under 50MB.</p>
                        </div>
                        
                        <div className="mt-8 flex items-center gap-4">
                            <Button className="bg-white text-black font-bold px-8 h-12 rounded-xl hover:scale-105 transition-transform">
                                Start Challenge
                            </Button>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Trophy size={16} className="text-yellow-500" />
                                <span>Reward: <strong>500 XP</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="rounded-3xl bg-zinc-900/30 border border-white/5 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-zinc-900/50 transition-colors">
                    <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Flame size={40} className="text-orange-500" />
                    </div>
                    <div className="text-5xl font-bold text-white mb-1">12</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-zinc-500">Day Streak</div>
                    <p className="text-xs text-zinc-600 mt-4">Keep it up! 3 more days for a multiplier.</p>
                </div>
            </div>

            {/* Training Grounds */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <TerminalSquare size={24} className="text-purple-500" /> Training Grounds
                    </h2>
                    <div className="flex gap-2">
                        <Button size="sm" variant="flat" className="bg-zinc-900 text-zinc-400">Filter: All</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trainingGrounds.map((challenge) => (
                        <div key={challenge.id} className="group p-5 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                                    <challenge.icon size={20} />
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(challenge.difficulty)}`}>
                                    {challenge.difficulty}
                                </span>
                            </div>
                            <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{challenge.title}</h3>
                            <div className="flex items-center justify-between text-xs text-zinc-500 mt-4">
                                <span>{challenge.lang}</span>
                                <span className="flex items-center gap-1"><Trophy size={12} className="text-yellow-500/50" /> {challenge.xp} XP</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

function TerminalSquare({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
    )
}
