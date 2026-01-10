"use client";
import { Sidebar, SidebarTrigger } from "../../../../components/Sidebar";
import { useState, useEffect, use, useRef } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";
import { ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

// Course data - each module has sections, each section has lessons
const courseModules = {
  "101": {
    pathId: "pfad:java_101",
    title: "Java 101: Grundlagen",
    sections: [
      {
        id: "grundlagen",
        title: "Grundlegende Syntax",
        lessons: [
          { id: 1, type: "lesson", status: "completed" },
          { id: 2, type: "lesson", status: "completed", branch: { id: "2b", type: "bonus", status: "completed" } },
          { id: 3, type: "lesson", status: "completed" },
          { id: 4, type: "lesson", status: "current", branch: { id: "4b", type: "challenge", status: "locked" } },
          { id: 5, type: "lesson", status: "locked" },
          { id: 6, type: "lesson", status: "locked" },
          { id: 7, type: "finish", status: "locked" },
        ]
      },
      {
        id: "fehlerbehandlung",
        title: "Grundlegende Fehlerbehandlung",
        lessons: [
          { id: 8, type: "lesson", status: "locked" },
          { id: 9, type: "lesson", status: "locked", branch: { id: "9b", type: "bonus", status: "locked" } },
          { id: 10, type: "lesson", status: "locked" },
          { id: 11, type: "lesson", status: "locked", branch: { id: "11b", type: "challenge", status: "locked" } },
          { id: 12, type: "lesson", status: "locked" },
          { id: 13, type: "lesson", status: "locked" },
          { id: 14, type: "finish", status: "locked" },
        ]
      },
      {
        id: "oop",
        title: "Objektorientierte Programmierung",
        lessons: [
          { id: 15, type: "lesson", status: "locked" },
          { id: 16, type: "lesson", status: "locked" },
          { id: 17, type: "lesson", status: "locked", branch: { id: "17b", type: "bonus", status: "locked" } },
          { id: 18, type: "lesson", status: "locked" },
          { id: 19, type: "finish", status: "locked" },
        ]
      },
    ],
  },
  "201": {
    pathId: "pfad:java_201",
    title: "Java 201: Fortgeschritten",
    sections: [
      {
        id: "collections",
        title: "Collections Framework",
        lessons: [
          { id: 1, type: "lesson", status: "current" },
          { id: 2, type: "lesson", status: "locked" },
          { id: 3, type: "finish", status: "locked" },
        ]
      },
    ],
  },
};

// 3D Hexagon Node Component with black/white aesthetic
const HexagonNode = ({ lesson, position, moduleId, mounted, isHovered, onHover, index }) => {
  const { x, y } = position;
  const size = lesson.type === "finish" ? 48 : 44;

  const getNodeColors = () => {
    if (lesson.status === "locked") {
      return {
        face: "#18181b",
        topEdge: "#27272a",
        sideEdge: "#09090b",
        icon: "#3f3f46",
        glow: "transparent",
      };
    }
    if (lesson.status === "current") {
      return {
        face: "#18181b",
        topEdge: "#3b82f6",
        sideEdge: "#09090b",
        icon: "#3b82f6",
        glow: "rgba(59, 130, 246, 0.15)",
      };
    }
    // completed
    return {
      face: "#18181b",
      topEdge: "#22c55e",
      sideEdge: "#09090b",
      icon: "#22c55e",
      glow: "rgba(34, 197, 94, 0.1)",
    };
  };

  const colors = getNodeColors();

  // Hexagon points for 3D effect
  const hexPoints = (cx, cy, s) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      points.push(`${cx + s * Math.cos(angle)},${cy + s * Math.sin(angle)}`);
    }
    return points.join(' ');
  };

  const getIcon = () => {
    if (lesson.type === "finish") {
      // Trophy icon
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path
            d="M -10 -6 L -10 -2 A 3 3 0 0 1 -13 1 L -13 3 L -10 3 L -10 5 L -5 8 L 5 8 L 10 5 L 10 3 L 13 3 L 13 1 A 3 3 0 0 1 10 -2 L 10 -6 Z"
            fill="none"
            stroke={colors.icon}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="0" r="2" fill={colors.icon} />
        </g>
      );
    }
    if (lesson.type === "bonus" || lesson.type === "challenge") {
      // Star icon
      return (
        <g transform={`translate(${x}, ${y})`}>
          <path
            d="M 0 -12 L 3.5 -4 L 12 -4 L 5 1.5 L 7.5 10 L 0 5 L -7.5 10 L -5 1.5 L -12 -4 L -3.5 -4 Z"
            fill={colors.icon}
          />
        </g>
      );
    }
    // Code/Lesson icon
    return (
      <g transform={`translate(${x}, ${y})`}>
        <path
          d="M -7 -5 L -12 0 L -7 5"
          fill="none"
          stroke={colors.icon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 7 -5 L 12 0 L 7 5"
          fill="none"
          stroke={colors.icon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  };

  const href = lesson.status !== "locked" ? `/courses/java/${moduleId}/${lesson.id}` : null;
  const depth = 6;

  const nodeContent = (
    <g
      className={`transition-all duration-200 ${lesson.status !== "locked" ? "cursor-pointer" : "cursor-default"}`}
      style={{ opacity: mounted ? 1 : 0 }}
      onMouseEnter={() => onHover(lesson.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Glow effect */}
      {lesson.status !== "locked" && (
        <polygon
          points={hexPoints(x, y, size + 12)}
          fill={colors.glow}
          filter="url(#blur)"
        />
      )}

      {/* Shadow */}
      <polygon
        points={hexPoints(x, y + depth + 2, size)}
        fill="#000"
        opacity="0.4"
      />

      {/* Side/depth */}
      <polygon
        points={hexPoints(x, y + depth, size)}
        fill={colors.sideEdge}
      />

      {/* Top bevel */}
      <polygon
        points={hexPoints(x, y, size)}
        fill={colors.face}
        stroke={colors.topEdge}
        strokeWidth={lesson.status === "current" ? 2 : 1}
      />

      {/* Inner face */}
      <polygon
        points={hexPoints(x, y - 1, size - 6)}
        fill={colors.face}
        stroke={colors.topEdge}
        strokeWidth="0.5"
        opacity="0.5"
      />

      {/* Inner accent ring */}
      <polygon
        points={hexPoints(x, y - 1, size - 18)}
        fill="none"
        stroke={colors.topEdge}
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Icon */}
      {getIcon()}

      {/* Hover effect */}
      {isHovered && lesson.status !== "locked" && (
        <polygon
          points={hexPoints(x, y, size)}
          fill="rgba(255,255,255,0.03)"
        />
      )}
    </g>
  );

  if (href) {
    return <Link href={href}>{nodeContent}</Link>;
  }
  return nodeContent;
};

// Connection dots
const ConnectionDots = ({ from, to }) => {
  const dots = [];
  const numDots = 3;

  for (let i = 0; i < numDots; i++) {
    const t = (i + 1) / (numDots + 1);
    const dotX = from.x + (to.x - from.x) * t;
    const dotY = from.y + (to.y - from.y) * t;
    dots.push(
      <circle
        key={i}
        cx={dotX}
        cy={dotY}
        r="3"
        fill="#27272a"
      />
    );
  }

  return <g>{dots}</g>;
};

// Curved connection path
const ConnectionPath = ({ from, to, status }) => {
  const isActive = status === "completed" || status === "current";
  const color = isActive ? "#27272a" : "#18181b";

  const midY = (from.y + to.y) / 2;
  const path = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
};

export default function ModulePathPage({ params }) {
  const unwrappedParams = use(params);
  const { moduleId } = unwrappedParams;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moduleConfig = courseModules[moduleId] || {
    pathId: "pfad:unknown",
    title: "Module",
    sections: [],
  };

  const currentSection = moduleConfig.sections[currentSectionIndex] || { lessons: [] };

  // Calculate centered layout
  const calculateLayout = (lessons) => {
    const layout = {
      nodes: [],
      connections: [],
      branches: [],
    };

    const centerX = 350; // Center position in viewBox
    const startY = 80;
    const verticalSpacing = 120;
    const branchOffsetX = 140;

    lessons.forEach((lesson, index) => {
      // Slight zigzag for visual interest, but keep centered
      const isEven = index % 2 === 0;
      const wiggle = index > 0 && index < lessons.length - 1 ? (isEven ? -15 : 15) : 0;

      const nodePos = {
        x: centerX + wiggle,
        y: startY + index * verticalSpacing,
      };

      layout.nodes.push({
        ...lesson,
        position: nodePos,
      });

      // Branch positioning
      if (lesson.branch) {
        const branchSide = index % 2 === 0 ? -1 : 1;
        const branchPos = {
          x: nodePos.x + (branchOffsetX * branchSide),
          y: nodePos.y - 20,
        };

        layout.branches.push({
          ...lesson.branch,
          position: branchPos,
          parentPos: nodePos,
          parentId: lesson.id,
        });
      }

      // Connection to next
      if (index < lessons.length - 1) {
        layout.connections.push({
          from: nodePos,
          toIndex: index + 1,
          status: lesson.status,
        });
      }
    });

    layout.connections = layout.connections.map((conn) => ({
      ...conn,
      to: layout.nodes[conn.toIndex]?.position,
    }));

    layout.totalHeight = startY + lessons.length * verticalSpacing + 60;

    return layout;
  };

  const layout = calculateLayout(currentSection.lessons);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextSection = () => {
    if (currentSectionIndex < moduleConfig.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 2px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>

      {isSidebarOpen && <Sidebar />}

      <main className="flex-1 h-full overflow-hidden flex flex-col relative bg-black">
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
          {/* Small grid */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
          {/* Radial fade */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(0,0,0,0.6) 70%)',
            }}
          />
        </div>

        {/* Header */}
        <header className="h-14 border-b border-zinc-900 flex items-center px-4 gap-4 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="h-4 w-[1px] bg-zinc-800" />
          <Breadcrumbs
            variant="light"
            classNames={{ list: "gap-2" }}
            itemClasses={{
              item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors",
              separator: "text-zinc-700"
            }}
          >
            <BreadcrumbItem href="/courses">Kurse</BreadcrumbItem>
            <BreadcrumbItem href="/courses/java">Java</BreadcrumbItem>
            <BreadcrumbItem>{moduleConfig.title}</BreadcrumbItem>
          </Breadcrumbs>
        </header>

        {/* Section Navigation */}
        <div className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-1 py-3 px-4">
            <button
              onClick={goToPrevSection}
              disabled={currentSectionIndex === 0}
              className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-4">
              {moduleConfig.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSectionIndex(index);
                    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSectionIndex
                      ? "bg-white w-6"
                      : index < currentSectionIndex
                      ? "bg-emerald-500"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNextSection}
              disabled={currentSectionIndex === moduleConfig.sections.length - 1}
              className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin relative"
        >
          {/* Section Title */}
          <div className="pt-10 pb-6">
            <div className="flex items-center justify-center gap-6 px-8 max-w-2xl mx-auto">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-zinc-800" />
              <h2 className="text-lg font-medium text-zinc-300 tracking-wide">
                {currentSection.title}
              </h2>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-zinc-800" />
            </div>
            <p className="text-center text-xs text-zinc-600 mt-2">
              Section {currentSectionIndex + 1} von {moduleConfig.sections.length}
            </p>
          </div>

          {/* SVG Canvas - Centered */}
          <div
            className="relative mx-auto"
            style={{
              height: layout.totalHeight,
              width: '700px',
              maxWidth: '100%',
            }}
          >
            <svg
              viewBox="0 0 700 ${layout.totalHeight}"
              className="absolute top-0 left-0 w-full h-full"
              style={{ minHeight: layout.totalHeight }}
              preserveAspectRatio="xMidYMin meet"
            >
              <defs>
                <filter id="blur" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                </filter>
              </defs>

              {/* Main path connections */}
              {layout.connections.map((conn, index) => (
                <ConnectionPath
                  key={`conn-${index}`}
                  from={conn.from}
                  to={conn.to}
                  status={conn.status}
                />
              ))}

              {/* Branch connections */}
              {layout.branches.map((branch, index) => (
                <ConnectionDots
                  key={`branch-conn-${index}`}
                  from={branch.parentPos}
                  to={branch.position}
                />
              ))}

              {/* Main nodes */}
              {layout.nodes.map((node, index) => (
                <HexagonNode
                  key={node.id}
                  lesson={node}
                  position={node.position}
                  moduleId={moduleId}
                  mounted={mounted}
                  isHovered={hoveredNode === node.id}
                  onHover={setHoveredNode}
                  index={index}
                />
              ))}

              {/* Branch nodes */}
              {layout.branches.map((branch, index) => (
                <HexagonNode
                  key={`branch-${branch.id}`}
                  lesson={branch}
                  position={branch.position}
                  moduleId={moduleId}
                  mounted={mounted}
                  isHovered={hoveredNode === branch.id}
                  onHover={setHoveredNode}
                  index={index}
                />
              ))}
            </svg>
          </div>

          {/* Bottom padding */}
          <div className="h-32" />
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-6 right-6 w-10 h-10 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg flex items-center justify-center transition-all border border-zinc-800"
        >
          <ArrowUp className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-2.5 bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800">
          <div className="flex gap-1.5">
            {currentSection.lessons.filter(l => l.type !== "finish").map((lesson, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: lesson.status === "completed" ? "#22c55e" :
                    lesson.status === "current" ? "#3b82f6" : "#27272a"
                }}
              />
            ))}
          </div>
          <div className="w-[1px] h-3 bg-zinc-700" />
          <span className="text-xs text-zinc-500">
            {currentSection.lessons.filter(l => l.status === "completed").length}/
            {currentSection.lessons.filter(l => l.type !== "finish").length}
          </span>
        </div>
      </main>
    </div>
  );
}
