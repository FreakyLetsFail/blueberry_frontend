"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { useState } from "react";
import { BreadcrumbItem, Button } from "@heroui/react";
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
  Copy,
  Layers
} from "lucide-react";
import Link from "next/link";

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

export default function TutorDashboard() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const totalStudents = userCourses.reduce((sum, c) => sum + c.students, 0);
  const publishedCount = userCourses.filter(c => c.status === "published").length;

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-1 h-full overflow-y-auto flex flex-col relative">
        <PageTopBar
          left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
          breadcrumbs={
            <>
              <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Course Creator</BreadcrumbItem>
            </>
          }
          className="z-10"
        />

        <div className="p-4 sm:p-8">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-1 tracking-tight">Course Creator</h1>
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
          </header>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{userCourses.length}</div>
                  <div className="text-xs text-zinc-500">Courses</div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Globe size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{publishedCount}</div>
                  <div className="text-xs text-zinc-500">Published</div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Users size={18} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{totalStudents}</div>
                  <div className="text-xs text-zinc-500">Students</div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">78%</div>
                  <div className="text-xs text-zinc-500">Completion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Create New Course */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-zinc-400 mb-4">Create New Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/tutor/create?visibility=public"
                className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Globe size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Public Course</h3>
                  <p className="text-sm text-zinc-500">Visible to all users</p>
                </div>
              </Link>

              <Link
                href="/tutor/create?visibility=private"
                className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Lock size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Private Course</h3>
                  <p className="text-sm text-zinc-500">Accessible via invite link</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Courses List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-zinc-400">Your Courses</h2>
              <span className="text-xs text-zinc-600">{userCourses.length} courses</span>
            </div>

            <div className="space-y-3">
              {userCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:bg-zinc-900/60 transition-colors"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{course.title}</h3>
                        {course.status === "published" ? (
                          <span className="text-xs text-emerald-400">Published</span>
                        ) : (
                          <span className="text-xs text-zinc-500">Draft</span>
                        )}
                        <span className="text-zinc-600">|</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          {course.visibility === "public" ? <Globe size={10} /> : <Lock size={10} />}
                          {course.visibility === "public" ? "Public" : "Private"}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 truncate mb-2">{course.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                        <span className="flex items-center gap-1">
                          <Layers size={12} />
                          {course.chapters} Chapters
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {course.lessons} Lessons
                        </span>
                        {course.students > 0 && (
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {course.students}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {course.updatedAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {course.status === "draft" && (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
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
                <BookOpen size={40} className="mx-auto mb-3 text-zinc-700" />
                <h3 className="font-medium text-zinc-400 mb-1">No courses yet</h3>
                <p className="text-sm text-zinc-600 mb-4">Create your first course</p>
                <Link href="/tutor/create">
                  <Button
                    className="bg-white text-black font-semibold"
                    startContent={<Plus size={16} />}
                  >
                    Create Course
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
