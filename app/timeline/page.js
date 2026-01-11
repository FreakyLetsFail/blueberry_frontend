"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function TimelinePage() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();

  const events = [
    {
      id: 1,
      date: "Q1 2026",
      title: "First Prototype",
      description: "Initial release of the Blueberry learning platform engine.",
      highlight: false,
    },
    {
      id: 2,
      date: "Q2 2026",
      title: "First Beta Test",
      description: "Closed beta with partner universities in Germany.",
      highlight: false,
    },
    {
      id: 3,
      date: "Q3 2026",
      title: "Go Public",
      description: "Official launch for all students and public course creators.",
      highlight: false,
    },
    {
      id: 4,
      date: "Q4 2026",
      title: "Expansion",
      description: "Scaling to European universities and introducing mobile app.",
      highlight: false,
    },
    {
      id: 5,
      date: "Q1 2027",
      title: "Mobile App",
      description: "Something Special is going to come for the World",
      highlight: true,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-zinc-950">
        <header className="h-14 border-b border-zinc-900 flex items-center px-4 gap-4 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="h-4 w-[1px] bg-zinc-800" />
            <Breadcrumbs 
                variant="light"
                classNames={{
                    list: "gap-2"
                }}
                itemClasses={{
                    item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors",
                    separator: "text-zinc-700"
                }}
              >
                <BreadcrumbItem>Platform</BreadcrumbItem>
                <BreadcrumbItem>Timeline</BreadcrumbItem>
              </Breadcrumbs>
        </header>

        <div className="p-12 max-w-5xl mx-auto w-full pb-32">
            <header className="mb-16">
                <h1 className="text-3xl font-bold mb-1 tracking-tight text-white">Project Timeline</h1>
                <p className="text-zinc-500">Our journey to revolutionizing education.</p>
            </header>

            <div className="relative">
                {/* Central Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-600/30" />

                <div className="flex flex-col gap-24 relative">
                    {events.map((event, index) => (
                        <div key={event.id} className={`flex items-center justify-between w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
                            
                            {/* Date Label (Opposite side) */}
                            <div className={`w-5/12 flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                <span className={`text-sm font-bold tracking-wider ${event.highlight ? "bg-white text-black px-3 py-1 rounded-full shadow-lg" : "text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full"}`}>
                                    {event.date}
                                </span>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                <div className={`w-4 h-4 rounded-full border-2 ${event.highlight ? "bg-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-black border-blue-600"}`} />
                            </div>

                            {/* Content Card */}
                            <div className="w-5/12">
                                <div className={`p-6 rounded-2xl border ${event.highlight ? "bg-zinc-900 border-blue-500/30 shadow-2xl shadow-blue-900/10" : "bg-zinc-900/40 border-zinc-800"}`}>
                                    <h3 className={`text-lg font-bold mb-2 ${event.highlight ? "text-white" : "text-zinc-200"}`}>
                                        {event.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${event.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                                        {event.description}
                                    </p>
                                </div>
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
