"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, 
  BookOpen,
  Settings, 
  Send,
  PanelLeft,
  ShoppingBag,
  Trophy,
  Swords,
  UsersRound,
  PenTool,
  ChevronsUpDown,
  ChevronDown, 
  ChevronRight,
  Frame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Defaults keep SSR markup consistent (open) and close on mobile after mount
export const useResponsiveSidebarState = (initialDesktop = true, initialMobile = false) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(initialDesktop);
  const wasMobile = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    
    const handler = (e) => {
      const mobile = e.matches;
      setIsMobile(mobile);
      
      if (wasMobile.current !== null && wasMobile.current !== mobile) {
        setOpen(!mobile);
      }
      wasMobile.current = mobile;
    };

    const isNowMobile = mq.matches;
    setIsMobile(isNowMobile);
    setOpen(!isNowMobile);
    wasMobile.current = isNowMobile;

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []); 

  return { open, setOpen, isMobile };
};

export const Sidebar = ({ open, onOpenChange, isMobile: forceMobile }) => {
  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";
  const [internalOpen, setInternalOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;
  
  // Initialize to true to match server rendering and prevent hydration mismatch
  const [isCoursesOpen, setIsCoursesOpen] = useState(true);

  // Sync isCoursesOpen with localStorage or media query on mount
  useEffect(() => {
    const stored = window.localStorage.getItem("sidebar-courses-open");
    if (stored !== null) {
      setIsCoursesOpen(stored === "1");
    } else {
      const mq = window.matchMedia("(max-width: 768px)");
      setIsCoursesOpen(!mq.matches);
    }
  }, []);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!isOpen);
  const handleNavClick = () => {
    if (isMobile) setOpen(false);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!isControlled) setOpen(!e.matches);
    };
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isControlled, setOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sidebar-courses-open", isCoursesOpen ? "1" : "0");
    }
  }, [isCoursesOpen]);

  const mobile = typeof forceMobile === "boolean" ? forceMobile : isMobile;

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Courses", href: "/courses" },
    { icon: Swords, label: "Challenges", href: "/challenges" },
    { icon: UsersRound, label: "Friends", href: "/friends" },
    { icon: ShoppingBag, label: "Shop", href: "/shop" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  ];

  const activeCourses = [
      { icon: Frame, label: "Java 101", href: "/courses/java" },
  ];

  return (
    <>
      {mobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <motion.div 
        initial={{ width: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
        animate={{ width: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 18 }}
        className={`h-screen bg-[#050505] border-r border-white/5 flex flex-col overflow-hidden fixed md:static inset-y-0 left-0 z-50 shadow-[5px_0_30px_-10px_rgba(0,0,0,0.5)]`}
      >
        {/* Header / Brand */}
        <div className="p-6 mb-4">
            <Link href="/dashboard" className="flex items-center justify-start group">
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40" width="160" height="36" className="transition-transform duration-300 group-hover:scale-105">
                    <defs>
                        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fff" />
                            <stop offset="100%" stopColor="#ccc" />
                        </linearGradient>
                    </defs>
                    <g transform="translate(4, 5)">
                        <polygon points="15,2 20,5.5 20,12.5 15,16 10,12.5 10,5.5" fill="none" stroke="url(#logo-grad)" strokeWidth="1.4" strokeLinejoin="round" />
                        <polygon points="8,14 13,17.5 13,24.5 8,28 3,24.5 3,17.5" fill="none" stroke="url(#logo-grad)" strokeWidth="1.4" strokeLinejoin="round" />
                        <polygon points="22,14 27,17.5 27,24.5 22,28 17,24.5 17,17.5" fill="url(#logo-grad)" stroke="none" />
                        <path d="M 15 2 C 15 -1, 16 -2, 19 -3" fill="none" stroke="url(#logo-grad)" strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="19.5" cy="-3" r="1.2" fill="#fff"/>
                    </g>
                    <text x="44" y="26" fontFamily="var(--font-sans)" fontSize="20" fontWeight="700" fill="#fff" letterSpacing="-0.5">Blueberry</text>
                    </svg>
                    {/* Subtle glow behind logo */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
            </Link>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
            
            {/* Main Platform */}
            <div>
                <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3 px-3">Platform</h3>
                <nav className="flex flex-col gap-1">
                    {mainNavItems.map((item, index) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={handleNavClick}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                                    isActive 
                                        ? "text-white" 
                                        : "text-zinc-500 hover:text-zinc-200"
                                }`}
                            >
                                {/* Active Background & Glow */}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-white/[0.03] border border-white/[0.05] rounded-xl z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-blue-500 rounded-r-full blur-[2px]" />
                                    </motion.div>
                                )}
                                
                                <div className="relative">
                                    <item.icon 
                                        size={18} 
                                        strokeWidth={isActive ? 2.5 : 2} 
                                        className={`relative z-10 transition-colors duration-300 ${isActive ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "text-zinc-600 group-hover:text-zinc-300"}`} 
                                    />
                                    {item.label === "Friends" && (
                                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#050505] z-20" />
                                    )}
                                </div>
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Active Courses Accordion */}
            <div>
                <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3 px-3">Active Learning</h3>
                <div className="bg-zinc-900/30 rounded-2xl border border-white/5 overflow-hidden">
                    <button 
                        onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                        className="flex items-center justify-between w-full p-3 text-xs font-medium text-zinc-400 hover:text-white transition-colors hover:bg-white/[0.02]"
                    >
                        <span className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isCoursesOpen ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-zinc-700"}`} />
                            Current Courses
                        </span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                        {isCoursesOpen && (
                            <motion.nav 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex flex-col overflow-hidden"
                            >
                                {activeCourses.map((item, index) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={handleNavClick}
                                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all border-l-2 ${
                                                isActive 
                                                    ? "bg-white/[0.04] text-white border-blue-500" 
                                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] border-transparent"
                                            }`}
                                        >
                                            <item.icon size={14} className={isActive ? "text-blue-400" : "opacity-70"} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </motion.nav>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Bottom Actions (Creator & Settings) */}
        <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
             <nav className="flex flex-col gap-1 mb-6">
                <Link 
                    href="/tutor" 
                    onClick={handleNavClick} 
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname.startsWith('/tutor') ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                >
                    <PenTool size={18} className={pathname.startsWith('/tutor') ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-300"} />
                    <span>Course Creator</span>
                </Link>
             </nav>

            <div className="relative" ref={userMenuRef}>
              <button 
                className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
                onClick={() => setUserMenuOpen((open) => !open)}
              >
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden ring-2 ring-black group-hover:ring-zinc-700 transition-all">
                      <img src="https://github.com/shadcn.png" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden text-left">
                      <p className="text-sm font-bold text-white truncate">Justus</p>
                      <p className="text-[10px] text-zinc-500 truncate">Pro Scholar</p>
                  </div>
                  <ChevronsUpDown size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute bottom-14 left-0 right-0 bg-zinc-950 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
                  >
                    <Link
                      href="/contact"
                      onClick={() => { setUserMenuOpen(false); handleNavClick(); }}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/5 transition-colors"
                    >
                      <Send size={16} className="text-zinc-400" />
                      <span>Contact Support</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => { setUserMenuOpen(false); handleNavClick(); }}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/5 transition-colors"
                    >
                      <Settings size={16} className="text-zinc-400" />
                      <span>Preferences</span>
                    </Link>
                    <button
                      onClick={() => { setUserMenuOpen(false); handleNavClick(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-300 hover:bg-red-500/10 transition-colors"
                      type="button"
                    >
                      <ChevronsUpDown size={16} className="text-red-300 rotate-90" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </motion.div>
    </>
  );
};

export const SidebarTrigger = ({ onClick }) => (
    <button 
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-zinc-800"
    >
        <PanelLeft size={20} />
    </button>
);
