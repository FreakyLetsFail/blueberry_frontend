"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../../components/Sidebar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Button, Progress } from "@heroui/react";
import { PlayCircle, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function JavaCourseOverview() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();

  const modules = [
    {
      id: "101",
      title: "Java 101: Fundamentals",
      description: "Start your journey here. Learn syntax, variables, and basic control flow.",
      progress: 75,
      status: "active", // active, locked, completed
      lessonsCount: 12,
      duration: "4h 30m"
    },
    {
      id: "201",
      title: "Java 201: Core Concepts",
      description: "Master functions, methods, and memory management.",
      progress: 0,
      status: "locked",
      lessonsCount: 15,
      duration: "5h 15m"
    },
    {
      id: "301",
      title: "Java 301: OOP Mastery",
      description: "Deep dive into Object Oriented Programming, Classes and Inheritance.",
      progress: 0,
      status: "locked",
      lessonsCount: 18,
      duration: "6h 45m"
    },
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans justify-center">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-zinc-950">
        <header className="h-14 border-b border-zinc-900 flex items-center px-4 gap-4 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-20">
            <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="h-4 w-[1px] bg-zinc-800" />
            <Breadcrumbs 
                variant="light"
                classNames={{ list: "gap-2" }}
                itemClasses={{ item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors max-w-[120px] truncate", separator: "text-zinc-700" }}
            >
                <BreadcrumbItem className="hidden sm:inline" href="/dashboard">Dashboard</BreadcrumbItem>
                <BreadcrumbItem className="hidden sm:inline" href="/courses">Courses</BreadcrumbItem>
                <BreadcrumbItem>Java Programming</BreadcrumbItem>
            </Breadcrumbs>
        </header>

        <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
            <div className="mb-12 text-center">
                <div className="inline-block p-4 rounded-3xl bg-zinc-900 border border-zinc-800 mb-6 shadow-2xl">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Java Programming Path</h1>
                <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                    From "Hello World" to Enterprise Architect. Select a module to begin your specific learning path.
                </p>
            </div>

            <div className="grid gap-6">
                {modules.map((module) => (
                    <div 
                        key={module.id} 
                        className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                            module.status === 'locked' 
                                ? "bg-zinc-900/20 border-zinc-900 opacity-60" 
                                : "bg-zinc-900/40 border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-900/60"
                        }`}
                    >
                        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h3 className="text-lg sm:text-xl font-bold text-white">{module.title}</h3>
                                    {module.status === 'completed' && <CheckCircle2 size={20} className="text-emerald-500" />}
                                    {module.status === 'locked' && <Lock size={16} className="text-zinc-600" />}
                                </div>
                                <p className="text-zinc-400 mb-4 text-sm sm:text-base">{module.description}</p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-mono">
                                    <span>{module.lessonsCount} LESSONS</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{module.duration}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-4 w-full md:w-auto md:min-w-[140px]">
                                {module.status !== 'locked' && (
                                    <div className="w-full text-right">
                                        <div className="text-sm font-bold text-blue-400 mb-1">{module.progress}%</div>
                                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${module.progress}%` }} />
                                        </div>
                                    </div>
                                )}
                                
                                {module.status === 'active' ? (
                                    <Link href={`/courses/java/${module.id}`} className="w-full md:w-auto">
                                        <Button className="w-full md:w-auto bg-white text-black font-bold rounded-xl px-6">
                                            Continue Path
                                        </Button>
                                    </Link>
                                ) : module.status === 'locked' ? (
                                    <Button disabled className="w-full md:w-auto bg-zinc-800 text-zinc-500 font-bold rounded-xl px-6 opacity-50 cursor-not-allowed">
                                        Locked
                                    </Button>
                                ) : (
                                    <Link href={`/courses/java/${module.id}`} className="w-full md:w-auto">
                                        <Button variant="bordered" className="w-full md:w-auto border-zinc-700 text-white font-bold rounded-xl px-6">
                                            Review
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
