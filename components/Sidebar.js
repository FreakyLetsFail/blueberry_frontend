"use client";
import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BookOpen,
  ChevronsUpDown,
  LifeBuoy,
  Send,
  PanelLeft,
  Map,
  Frame,
  PieChart,
  History,
  ShoppingBag,
  Trophy,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Defaults keep SSR markup consistent (open) and close on mobile after mount
export const useResponsiveSidebarState = (initialDesktop = false, initialMobile = false) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(initialMobile); // SSR-safe default: closed

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      setOpen(e.matches ? initialMobile : initialDesktop);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [initialDesktop, initialMobile]);

  return { open, setOpen, isMobile };
};

export const Sidebar = ({ open, onOpenChange, isMobile: forceMobile }) => {
  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";
  const [internalOpen, setInternalOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(max-width: 768px)").matches;
  });
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;
  const [isCoursesOpen, setIsCoursesOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!isOpen);
  const handleNavClick = () => {
    if (isMobile) setOpen(false);
  };

  useEffect(() => {
    if (isControlled) return;
    const handler = () => setOpen((prev) => !prev);
    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
  }, [isControlled, setOpen]);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!isControlled) setOpen(!e.matches);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isControlled, setOpen]);

  const mobile = typeof forceMobile === "boolean" ? forceMobile : isMobile;

  const groups = [
    {
      label: "Platform",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: BookOpen, label: "Courses", href: "/courses" },
        { icon: Users, label: "Course Creator", href: "/tutor" },
        { icon: ShoppingBag, label: "Shop", href: "/shop" },
      ]
    }
  ];

  const activeCourses = [
      { icon: Frame, label: "Java 101", href: "/courses/java" },
  ];

  return (
    <>
      {mobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <motion.div 
        initial={{ width: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0 }}
        animate={{ width: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`h-screen bg-zinc-950 border-r border-zinc-900 flex flex-col overflow-hidden fixed md:static inset-y-0 left-0 z-50 ${!isOpen ? "pointer-events-none" : ""}`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {/* Header / Brand */}
        <div className="p-4 mb-2">
            <Link href="/dashboard" className="flex items-center justify-start p-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40" width="160" height="36">
                  {/* Icon: Berry made of 3 connected hexagons */}
                  <g transform="translate(4, 5)">
                    {/* Top hexagon (outlined) */}
                    <polygon 
                      points="15,2 20,5.5 20,12.5 15,16 10,12.5 10,5.5" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    {/* Bottom left hexagon (outlined) */}
                    <polygon 
                      points="8,14 13,17.5 13,24.5 8,28 3,24.5 3,17.5" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    {/* Bottom right hexagon (filled) */}
                    <polygon 
                      points="22,14 27,17.5 27,24.5 22,28 17,24.5 17,17.5" 
                      fill="#ffffff"
                      stroke="#ffffff" 
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    
                    {/* Stem accent */}
                    <path 
                      d="M 15 2 C 15 -1, 16 -2, 19 -3" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <circle cx="19.5" cy="-3" r="1.2" fill="#ffffff"/>
                  </g>
                  
                  {/* Wordmark */}
                  <text 
                    x="44" 
                    y="26" 
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
                    fontSize="20"
                    fontWeight="600"
                    fill="#ffffff"
                    letterSpacing="-0.5"
                  >Blueberry</text>
                </svg>
            </Link>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
            {groups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                    {group.label && (
                        <h3 className="text-xs font-medium text-zinc-500 mb-2 px-2">
                            {group.label}
                        </h3>
                    )}
                    <nav className="flex flex-col gap-0.5">
                        {group.items.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                                        isActive 
                                            ? "bg-zinc-800 text-white" 
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                    }`}
                                >
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            ))}

            {/* Collapsible Courses Section */}
            <div className="mb-6">
                <button 
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    className="flex items-center justify-between w-full text-xs font-medium text-zinc-500 mb-2 px-2 hover:text-zinc-300 transition-colors"
                >
                    <span>Courses</span>
                    {isCoursesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                
                <AnimatePresence initial={false}>
                    {isCoursesOpen && (
                        <motion.nav 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-0.5 overflow-hidden"
                        >
                            {activeCourses.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={handleNavClick}
                                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                                            isActive 
                                                ? "bg-zinc-800 text-white" 
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                                        }`}
                                    >
                                        <item.icon size={16} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 py-2 mt-auto border-t border-zinc-900">
             <nav className="flex flex-col gap-0.5 mb-4">
                <Link href="/timeline" onClick={handleNavClick} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${pathname === '/timeline' ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`}>
                    <History size={16} />
                    <span>Timeline</span>
                </Link>
                <Link href="/contact" onClick={handleNavClick} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${pathname === '/contact' ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`}>
                    <Send size={16} />
                    <span>Contact</span>
                </Link>
                <Link href="/settings" onClick={handleNavClick} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${pathname === '/settings' ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`}>
                    <Settings size={16} />
                    <span>Settings</span>
                </Link>
             </nav>

            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-zinc-900 text-left transition-colors">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img src="https://github.com/shadcn.png" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Justus</p>
                    <p className="text-xs text-zinc-500 truncate">justus@blueberry.app</p>
                </div>
                <ChevronsUpDown size={14} className="text-zinc-500" />
            </button>
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
        className="p-2 hover:bg-zinc-900 rounded-md text-zinc-400 hover:text-white transition-colors"
    >
        <PanelLeft size={20} />
    </button>
);
