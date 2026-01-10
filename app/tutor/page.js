"use client";
import { Sidebar, SidebarTrigger } from "../../components/Sidebar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import {
  Globe,
  Lock,
  Plus,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Play,
  Edit3,
  Trash2,
  Copy
} from "lucide-react";
import Link from "next/link";

// Mock data for user's courses
const userCourses = [
  {
    id: "1",
    title: "Python for Beginners",
    description: "Fundamentals of Python programming",
    chapters: 5,
    lessons: 23,
    students: 142,
    status: "published",
    visibility: "public",
    updatedAt: "2 days ago",
    progress: 100,
  },
  {
    id: "2",
    title: "JavaScript Advanced Patterns",
    description: "Advanced design patterns in JavaScript",
    chapters: 3,
    lessons: 12,
    students: 0,
    status: "draft",
    visibility: "private",
    updatedAt: "5 hours ago",
    progress: 65,
  },
  {
    id: "3",
    title: "SQL Masterclass",
    description: "From basics to complex queries",
    chapters: 8,
    lessons: 45,
    students: 89,
    status: "published",
    visibility: "public",
    updatedAt: "1 week ago",
    progress: 100,
  },
];

const stats = [
  { label: "Courses Created", value: "3", icon: BookOpen, color: "text-blue-500" },
  { label: "Total Students", value: "231", icon: Users, color: "text-emerald-500" },
  { label: "Completion Rate", value: "78%", icon: TrendingUp, color: "text-purple-500" },
];

export default function TutorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {isSidebarOpen && <Sidebar />}

      <main className="flex-1 h-full overflow-y-auto flex flex-col relative">
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <header className="h-14 border-b border-zinc-900 flex items-center px-4 gap-4 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
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
            <BreadcrumbItem>Platform</BreadcrumbItem>
            <BreadcrumbItem>Course Creator</BreadcrumbItem>
          </Breadcrumbs>
        </header>

        <div className="p-8 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">Course Creator</h1>
              <p className="text-zinc-500">Create and manage your courses</p>
            </div>
            <Link href="/tutor/create">
              <Button
                className="bg-white text-black font-semibold h-10 rounded-lg hover:bg-zinc-200"
                startContent={<Plus size={18} />}
              >
                New Course
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-zinc-900/40 border border-white/5 rounded-xl p-5 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Course Type Selection */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">Create New Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/tutor/create?visibility=public"
                className="group relative flex items-center gap-5 p-5 rounded-xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Globe size={24} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Public Course</h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    Visible to all users on the platform
                  </p>
                </div>
              </Link>

              <Link
                href="/tutor/create?visibility=private"
                className="group relative flex items-center gap-5 p-5 rounded-xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Lock size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Private Course</h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    Only accessible via invite link
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Courses List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-300">Your Courses</h2>
              <span className="text-sm text-zinc-600">{userCourses.length} Courses</span>
            </div>

            <div className="space-y-3">
              {userCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-zinc-900/40 border border-white/5 rounded-xl p-5 hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-200"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-white truncate">{course.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          course.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}>
                          {course.status === "published" ? "Published" : "Draft"}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${
                          course.visibility === "public"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}>
                          {course.visibility === "public" ? <Globe size={10} /> : <Lock size={10} />}
                          {course.visibility === "public" ? "Public" : "Private"}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 mb-3 truncate">{course.description}</p>

                      <div className="flex items-center gap-5 text-xs text-zinc-600">
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={14} />
                          {course.chapters} Chapters · {course.lessons} Lessons
                        </span>
                        {course.students > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Users size={14} />
                            {course.students} Students
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {course.updatedAt}
                        </span>
                      </div>
                    </div>

                    {/* Progress or Actions */}
                    <div className="flex items-center gap-2">
                      {course.status === "draft" && (
                        <div className="flex items-center gap-2 mr-4">
                          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-zinc-500">{course.progress}%</span>
                        </div>
                      )}

                      <div className={`flex items-center gap-1 transition-opacity ${hoveredCourse === course.id ? 'opacity-100' : 'opacity-0'}`}>
                        <Link href={`/tutor/create?edit=${course.id}`}>
                          <Button
                            size="sm"
                            variant="flat"
                            isIconOnly
                            className="bg-zinc-800 text-zinc-400 hover:text-white h-8 w-8 min-w-8"
                          >
                            <Edit3 size={14} />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="flat"
                          isIconOnly
                          className="bg-zinc-800 text-zinc-400 hover:text-white h-8 w-8 min-w-8"
                        >
                          <Copy size={14} />
                        </Button>
                        {course.status === "published" && (
                          <Link href={`/courses/preview/${course.id}`}>
                            <Button
                              size="sm"
                              variant="flat"
                              isIconOnly
                              className="bg-zinc-800 text-zinc-400 hover:text-emerald-400 h-8 w-8 min-w-8"
                            >
                              <Play size={14} />
                            </Button>
                          </Link>
                        )}
                        <Button
                          size="sm"
                          variant="flat"
                          isIconOnly
                          className="bg-zinc-800 text-zinc-400 hover:text-red-400 h-8 w-8 min-w-8"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {userCourses.length === 0 && (
              <div className="text-center py-16 bg-zinc-900/40 rounded-xl border border-white/5">
                <BookOpen size={48} className="mx-auto mb-4 text-zinc-700" />
                <h3 className="text-lg font-medium text-zinc-400 mb-2">No courses yet</h3>
                <p className="text-sm text-zinc-600 mb-6">Create your first course and share your knowledge</p>
                <Link href="/tutor/create">
                  <Button
                    className="bg-white text-black font-semibold"
                    startContent={<Plus size={16} />}
                  >
                    Create First Course
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
