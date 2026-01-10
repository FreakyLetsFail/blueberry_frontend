"use client";
import { Sidebar, SidebarTrigger } from "../../../components/Sidebar";
import { useState, useEffect, useRef, useId } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Textarea,
  Button,
  Accordion,
  AccordionItem,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  Plus,
  Trash2,
  Save,
  TerminalSquare,
  Eye,
  GripVertical,
  Info,
  Code,
  ChevronLeft,
  Settings,
  ChevronDown,
  ChevronUp,
  ListTodo,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";

// EditorJS Component with enhanced markdown support
const EditorBlock = ({ id, data, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let editor = null;
    let isMounted = true;

    const initEditor = async () => {
      if (typeof window === "undefined") return;

      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const CodeTool = (await import("@editorjs/code")).default;
      const Marker = (await import("@editorjs/marker")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;

      if (editorRef.current && !editorInstance.current && isMounted) {
        editor = new EditorJS({
          holder: editorRef.current,
          placeholder: placeholder || "Start writing...",
          data: data || { blocks: [] },
          tools: {
            header: {
              class: Header,
              shortcut: "CMD+SHIFT+H",
              config: {
                levels: [1, 2, 3, 4],
                defaultLevel: 2,
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+L",
              config: {
                defaultStyle: "unordered",
              },
            },
            code: {
              class: CodeTool,
              shortcut: "CMD+SHIFT+C",
            },
            marker: {
              class: Marker,
              shortcut: "CMD+SHIFT+M",
            },
            inlineCode: {
              class: InlineCode,
              shortcut: "CMD+SHIFT+I",
            },
            delimiter: Delimiter,
          },
          onChange: async () => {
            if (editor && isMounted) {
              const content = await editor.save();
              onChange(content);
            }
          },
          minHeight: 0,
        });

        editorInstance.current = editor;
        await editor.isReady;
        if (isMounted) setIsReady(true);
      }
    };

    initEditor();

    return () => {
      isMounted = false;
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="editor-wrapper h-full">
      <style jsx global>{`
        .codex-editor {
          background: transparent !important;
        }
        .codex-editor__redactor {
          padding-bottom: 50px !important;
        }
        .ce-block__content {
          max-width: 100% !important;
          margin: 0 !important;
        }
        .ce-toolbar__content {
          max-width: 100% !important;
          margin: 0 !important;
        }
        .ce-paragraph {
          font-size: 14px !important;
          line-height: 1.7 !important;
          color: #d4d4d8 !important;
        }
        .ce-paragraph[data-placeholder]:empty::before {
          color: #52525b !important;
        }
        .ce-header {
          color: #fafafa !important;
          font-weight: 600 !important;
        }
        .ce-code__textarea {
          background: #18181b !important;
          color: #a5f3fc !important;
          border: 1px solid #27272a !important;
          border-radius: 8px !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 13px !important;
        }
        .cdx-marker {
          background: rgba(59, 130, 246, 0.3) !important;
        }
        .ce-inline-toolbar {
          background: #18181b !important;
          border: 1px solid #27272a !important;
          border-radius: 8px !important;
        }
        .ce-inline-tool {
          color: #a1a1aa !important;
        }
        .ce-inline-tool:hover {
          background: #27272a !important;
        }
        .ce-inline-tool--active {
          color: #3b82f6 !important;
        }
        .ce-toolbar__plus, .ce-toolbar__settings-btn {
          color: #71717a !important;
          background: #18181b !important;
          border: 1px solid #27272a !important;
        }
        .ce-toolbar__plus:hover, .ce-toolbar__settings-btn:hover {
          background: #27272a !important;
          color: #a1a1aa !important;
        }
        .ce-popover {
          background: #18181b !important;
          border: 1px solid #27272a !important;
          border-radius: 8px !important;
        }
        .ce-popover-item {
          color: #d4d4d8 !important;
        }
        .ce-popover-item:hover {
          background: #27272a !important;
        }
        .ce-popover-item__icon {
          background: #27272a !important;
          border-radius: 6px !important;
        }
        .cdx-list__item {
          color: #d4d4d8 !important;
          line-height: 1.7 !important;
        }
        .cdx-list {
          padding-left: 1.2em !important;
        }
        .ce-delimiter:before {
          background: #3f3f46 !important;
          height: 1px !important;
        }
        .ce-block--selected .ce-block__content {
          background: rgba(59, 130, 246, 0.1) !important;
          border-radius: 4px !important;
        }
        .cdx-checklist__item-checkbox {
          background: #27272a !important;
          border-color: #3f3f46 !important;
        }
        .cdx-checklist__item--checked .cdx-checklist__item-checkbox {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
        }
      `}</style>
      <div
        ref={editorRef}
        className="prose prose-invert max-w-none h-full overflow-y-auto px-4 py-3"
      />
    </div>
  );
};

// Render EditorJS blocks for preview
const RenderBlock = ({ block }) => {
  if (!block) return null;

  const renderText = (text) => {
    if (!text) return null;
    // Handle HTML entities and basic formatting
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/&nbsp;/g, ' ')
            .replace(/<mark[^>]*>(.*?)<\/mark>/g, '<span class="bg-blue-500/30 px-1 rounded">$1</span>')
            .replace(/<code[^>]*>(.*?)<\/code>/g, '<code class="bg-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-xs">$1</code>')
        }}
      />
    );
  };

  switch (block.type) {
    case 'header':
      const HeadingTag = `h${block.data?.level || 2}`;
      const headingClasses = {
        1: 'text-xl font-bold text-white mb-2',
        2: 'text-lg font-semibold text-white mb-2',
        3: 'text-base font-semibold text-zinc-200 mb-2',
        4: 'text-sm font-semibold text-zinc-300 mb-1',
      };
      return (
        <HeadingTag className={headingClasses[block.data?.level] || headingClasses[2]}>
          {renderText(block.data?.text)}
        </HeadingTag>
      );

    case 'paragraph':
      return (
        <p className="leading-relaxed">
          {renderText(block.data?.text)}
        </p>
      );

    case 'list':
      const ListTag = block.data?.style === 'ordered' ? 'ol' : 'ul';
      const listClass = block.data?.style === 'ordered'
        ? 'list-decimal list-inside space-y-1.5 ml-1'
        : 'list-disc list-inside space-y-1.5 ml-1';
      return (
        <ListTag className={listClass}>
          {block.data?.items?.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderText(typeof item === 'string' ? item : item?.content)}
            </li>
          ))}
        </ListTag>
      );

    case 'code':
      return (
        <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 overflow-x-auto">
          <code className="text-cyan-400 font-mono text-xs">
            {block.data?.code}
          </code>
        </pre>
      );

    case 'delimiter':
      return <hr className="border-zinc-700 my-4" />;

    case 'checklist':
      return (
        <div className="space-y-2">
          {block.data?.items?.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className={`w-4 h-4 mt-0.5 rounded border flex-shrink-0 flex items-center justify-center ${
                item.checked
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-zinc-600'
              }`}>
                {item.checked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={item.checked ? 'line-through text-zinc-500' : ''}>
                {renderText(item.text)}
              </span>
            </div>
          ))}
        </div>
      );

    default:
      // Fallback for unknown block types
      if (block.data?.text) {
        return <p className="leading-relaxed">{renderText(block.data.text)}</p>;
      }
      return null;
  }
};

// Monaco Editor Component for Code
const CodeEditor = ({ value, onChange, language = "java", placeholder }) => {
  const [Monaco, setMonaco] = useState(null);

  useEffect(() => {
    import("@monaco-editor/react").then((mod) => {
      setMonaco(() => mod.default);
    });
  }, []);

  if (!Monaco) {
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full bg-transparent resize-none font-mono text-sm text-cyan-300 placeholder:text-zinc-700 p-3 focus:outline-none"
      />
    );
  }

  return (
    <Monaco
      height="100%"
      language={language}
      theme="vs-dark"
      value={value || ""}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        lineNumbers: "on",
        renderLineHighlight: "none",
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
        padding: { top: 12, bottom: 12 },
      }}
    />
  );
};

// Sortable Lesson Item Component
function SortableLessonItem({ lesson, chapterId, onUpdate, onRemove, onPreview, language }) {
  const uniqueId = useId();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [activeTab, setActiveTab] = useState("theory");
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const [isTheoryTaskCollapsed, setIsTheoryTaskCollapsed] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-zinc-800 rounded-xl bg-zinc-900/30 mb-4 overflow-hidden"
    >
      {/* Lesson Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-1"
            aria-label="Drag to reorder"
          >
            <GripVertical size={16} />
          </button>
          <Input
            placeholder="Lesson name"
            variant="flat"
            size="sm"
            value={lesson.title}
            onValueChange={(v) => onUpdate(lesson.id, "title", v)}
            classNames={{
              inputWrapper:
                "bg-transparent shadow-none hover:bg-zinc-800/50 transition-colors h-8 min-h-8 w-[280px]",
              input: "font-medium text-sm text-zinc-200",
            }}
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            className="bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800 h-8 w-8 min-w-8"
            onPress={() => setIsContentExpanded(!isContentExpanded)}
          >
            {isContentExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </Button>
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            className="bg-transparent text-zinc-500 hover:text-white hover:bg-zinc-800 h-8 w-8 min-w-8"
            onPress={() => onPreview(lesson)}
          >
            <Eye size={15} />
          </Button>
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            className="bg-transparent text-zinc-500 hover:text-red-400 hover:bg-zinc-800 h-8 w-8 min-w-8"
            onPress={() => onRemove(lesson.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>

      {/* Lesson Content - Collapsible */}
      {isContentExpanded && (
        <div className="p-4">
          <div className={`grid gap-4 ${isTheoryTaskCollapsed ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}>
            {/* Left: Theory & Task with EditorJS - Collapsible */}
            <div className={`flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden transition-all duration-300 ${isTheoryTaskCollapsed ? 'hidden' : ''}`}>
              <Tabs
                aria-label="Lesson Content"
                size="sm"
                variant="underlined"
                selectedKey={activeTab}
                onSelectionChange={setActiveTab}
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-zinc-800 bg-zinc-900/50 px-4",
                  cursor: "w-full bg-blue-500",
                  tab: "max-w-fit px-0 h-10",
                  tabContent:
                    "group-data-[selected=true]:text-blue-400 text-zinc-500 font-medium text-xs",
                }}
              >
                <Tab
                  key="theory"
                  title={
                    <div className="flex items-center gap-2">
                      <Info size={13} />
                      Theory
                    </div>
                  }
                >
                  <div className="h-[280px] overflow-hidden">
                    <EditorBlock
                      id={`theory-${lesson.id}`}
                      data={lesson.theoryData}
                      onChange={(data) => onUpdate(lesson.id, "theoryData", data)}
                      placeholder="Explain the concept here... Use toolbar for headers, lists, code blocks..."
                    />
                  </div>
                </Tab>
                <Tab
                  key="task"
                  title={
                    <div className="flex items-center gap-2">
                      <ListTodo size={13} />
                      Task
                    </div>
                  }
                >
                  <div className="h-[280px] overflow-hidden">
                    <EditorBlock
                      id={`task-${lesson.id}`}
                      data={lesson.taskData}
                      onChange={(data) => onUpdate(lesson.id, "taskData", data)}
                      placeholder="Describe the programming task... Add steps, requirements, hints..."
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>

            {/* Right: Starter Code & Expected Output */}
            <div className="flex flex-col gap-3">
              {/* Toggle Theory/Task Button */}
              <Button
                size="sm"
                variant="flat"
                className={`h-8 ${isTheoryTaskCollapsed ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-zinc-800 text-zinc-400'} hover:text-white`}
                startContent={isTheoryTaskCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                onPress={() => setIsTheoryTaskCollapsed(!isTheoryTaskCollapsed)}
              >
                {isTheoryTaskCollapsed ? 'Show Theory & Task' : 'Hide Theory & Task'}
              </Button>

              {/* Starter Code (Vorgabe) */}
              <div className={`flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden ${isTheoryTaskCollapsed ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 border-b border-zinc-800">
                  <Code size={13} className="text-cyan-500" />
                  <span className="text-xs font-medium text-zinc-400">
                    Starter Code
                  </span>
                </div>
                <div className={`flex-1 ${isTheoryTaskCollapsed ? 'min-h-[200px]' : 'min-h-[120px]'}`}>
                  <CodeEditor
                    value={lesson.starterCode}
                    onChange={(v) => onUpdate(lesson.id, "starterCode", v)}
                    language={language}
                    placeholder="// Pre-filled code for students..."
                  />
                </div>
              </div>

              {/* Expected Console Output */}
              <div className={`flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden ${isTheoryTaskCollapsed ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 border-b border-zinc-800">
                  <TerminalSquare size={13} className="text-emerald-500" />
                  <span className="text-xs font-medium text-zinc-400">
                    Expected Output
                  </span>
                </div>
                <div className={`flex-1 p-3 ${isTheoryTaskCollapsed ? 'min-h-[150px]' : 'min-h-[100px]'}`}>
                  <Textarea
                    placeholder="The exact output expected..."
                    variant="flat"
                    value={lesson.expectedOutput}
                    onValueChange={(v) => onUpdate(lesson.id, "expectedOutput", v)}
                    classNames={{
                      inputWrapper: "bg-transparent shadow-none p-0 h-full min-h-[80px]",
                      input:
                        "h-full resize-none text-emerald-400 placeholder:text-zinc-700 font-mono text-sm",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateCoursePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseLanguage, setCourseLanguage] = useState("java");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewLesson, setPreviewLesson] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [chapters, setChapters] = useState([
    {
      id: "c1",
      title: "Chapter 1: Introduction",
      lessons: [
        {
          id: "l1",
          title: "Lesson 1",
          theoryData: null,
          taskData: null,
          starterCode: "",
          expectedOutput: "",
        },
      ],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Chapter Management
  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        id: `c${Date.now()}`,
        title: `Chapter ${chapters.length + 1}`,
        lessons: [],
      },
    ]);
  };

  const updateChapterTitle = (id, title) => {
    setChapters(chapters.map((c) => (c.id === id ? { ...c, title } : c)));
  };

  const removeChapter = (id) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter((c) => c.id !== id));
    }
  };

  // Lesson Management
  const addLesson = (chapterId) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          return {
            ...c,
            lessons: [
              ...c.lessons,
              {
                id: `l${Date.now()}`,
                title: `Lesson ${c.lessons.length + 1}`,
                theoryData: null,
                taskData: null,
                starterCode: "",
                expectedOutput: "",
              },
            ],
          };
        }
        return c;
      })
    );
  };

  const updateLesson = (chapterId, lessonId, field, value) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          return {
            ...c,
            lessons: c.lessons.map((l) =>
              l.id === lessonId ? { ...l, [field]: value } : l
            ),
          };
        }
        return c;
      })
    );
  };

  const removeLesson = (chapterId, lessonId) => {
    setChapters(
      chapters.map((c) => {
        if (c.id === chapterId) {
          return { ...c, lessons: c.lessons.filter((l) => l.id !== lessonId) };
        }
        return c;
      })
    );
  };

  const handleDragEnd = (event, chapterId) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setChapters(
        chapters.map((c) => {
          if (c.id === chapterId) {
            const oldIndex = c.lessons.findIndex((l) => l.id === active.id);
            const newIndex = c.lessons.findIndex((l) => l.id === over.id);
            return { ...c, lessons: arrayMove(c.lessons, oldIndex, newIndex) };
          }
          return c;
        })
      );
    }
  };

  const handlePreview = (lesson) => {
    setPreviewLesson(lesson);
    onOpen();
  };

  const languages = [
    { key: "java", label: "Java" },
    { key: "python", label: "Python" },
    { key: "javascript", label: "JavaScript" },
    { key: "typescript", label: "TypeScript" },
    { key: "csharp", label: "C#" },
    { key: "cpp", label: "C++" },
    { key: "go", label: "Go" },
    { key: "rust", label: "Rust" },
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>

      {isSidebarOpen && <Sidebar />}

      <main className="flex-1 flex flex-col relative h-full">
        {/* Header */}
        <header className="h-14 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between px-4 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <SidebarTrigger
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="h-4 w-[1px] bg-zinc-800" />
            <Link
              href="/tutor"
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <Breadcrumbs
              variant="light"
              classNames={{ list: "gap-2" }}
              itemClasses={{
                item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors",
                separator: "text-zinc-700",
              }}
            >
              <BreadcrumbItem href="/tutor">Course Creator</BreadcrumbItem>
              <BreadcrumbItem>New Course</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="flat"
              className="bg-zinc-800 text-zinc-300 font-medium h-9"
              startContent={<Eye size={15} />}
            >
              Preview
            </Button>
            <Button
              className="bg-white text-black font-semibold h-9"
              startContent={<Save size={15} />}
            >
              Save
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-6xl mx-auto w-full p-8">
            {/* Course Info */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 mb-8">
              <h2 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                <Settings size={14} />
                Course Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1.5 block">
                    Course Name
                  </label>
                  <Input
                    placeholder="e.g. Java Fundamentals"
                    variant="bordered"
                    size="md"
                    classNames={{
                      inputWrapper:
                        "bg-zinc-950 border-zinc-800 hover:border-zinc-700 group-data-[focus=true]:border-blue-500",
                      input: "text-base font-medium",
                    }}
                    value={courseName}
                    onValueChange={setCourseName}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1.5 block">
                    Programming Language
                  </label>
                  <Select
                    placeholder="Select language"
                    variant="bordered"
                    size="md"
                    selectedKeys={[courseLanguage]}
                    onSelectionChange={(keys) =>
                      setCourseLanguage(Array.from(keys)[0])
                    }
                    classNames={{
                      trigger:
                        "bg-zinc-950 border-zinc-800 hover:border-zinc-700 data-[focus=true]:border-blue-500",
                      value: "text-zinc-200",
                    }}
                  >
                    {languages.map((lang) => (
                      <SelectItem key={lang.key}>{lang.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-zinc-500 mb-1.5 block">
                    Description
                  </label>
                  <Textarea
                    placeholder="What is this course about?"
                    variant="bordered"
                    minRows={2}
                    classNames={{
                      inputWrapper:
                        "bg-zinc-950 border-zinc-800 hover:border-zinc-700 group-data-[focus=true]:border-blue-500",
                      input: "text-sm",
                    }}
                    value={courseDescription}
                    onValueChange={setCourseDescription}
                  />
                </div>
              </div>
            </div>

            {/* Chapters */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Course Curriculum
                </h2>
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-zinc-300 h-8"
                  startContent={<Plus size={14} />}
                  onPress={addChapter}
                >
                  Add Chapter
                </Button>
              </div>

              {isMounted && (
                <Accordion
                  variant="splitted"
                  defaultExpandedKeys={["c1"]}
                  itemClasses={{
                    base: "group border border-zinc-800 bg-zinc-950 rounded-xl px-0 shadow-none mb-4",
                    title: "text-zinc-200 font-semibold text-sm",
                    trigger: "py-3 px-4 bg-zinc-900/30",
                    content: "pb-4 px-4 pt-4 bg-transparent",
                    indicator: "text-zinc-500",
                  }}
                >
                  {chapters.map((chapter, index) => (
                    <AccordionItem
                      key={chapter.id}
                      aria-label={chapter.title}
                      title={
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-zinc-600 font-mono text-xs bg-zinc-800 px-2 py-0.5 rounded">
                            {index + 1}
                          </span>
                          <Input
                            value={chapter.title}
                            onValueChange={(v) =>
                              updateChapterTitle(chapter.id, v)
                            }
                            variant="flat"
                            size="sm"
                            classNames={{
                              input: "font-semibold text-sm text-zinc-200",
                              inputWrapper:
                                "bg-transparent shadow-none h-7 min-h-7 w-[300px]",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      }
                      startContent={
                        <div
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeChapter(chapter.id);
                          }}
                          className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-zinc-600 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </div>
                      }
                    >
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => handleDragEnd(e, chapter.id)}
                      >
                        <SortableContext
                          items={chapter.lessons}
                          strategy={verticalListSortingStrategy}
                        >
                          {chapter.lessons.map((lesson) => (
                            <SortableLessonItem
                              key={lesson.id}
                              lesson={lesson}
                              chapterId={chapter.id}
                              language={courseLanguage}
                              onUpdate={(lid, f, v) =>
                                updateLesson(chapter.id, lid, f, v)
                              }
                              onRemove={(lid) => removeLesson(chapter.id, lid)}
                              onPreview={handlePreview}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>

                      <Button
                        fullWidth
                        variant="flat"
                        className="border border-dashed border-zinc-800 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 mt-2 h-10"
                        startContent={<Plus size={14} />}
                        onPress={() => addLesson(chapter.id)}
                      >
                        Add Lesson
                      </Button>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="5xl"
          scrollBehavior="inside"
          classNames={{
            base: "bg-zinc-950 border border-zinc-800 text-white",
            header: "border-b border-zinc-800",
            body: "p-0",
            footer: "border-t border-zinc-800",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <span className="text-base font-semibold">
                    Preview: {previewLesson?.title}
                  </span>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col lg:flex-row min-h-[500px]">
                    {/* Left: Task & Theory Panel */}
                    <div className="w-full lg:w-2/5 border-b lg:border-b-0 lg:border-r border-zinc-800 p-6 overflow-y-auto bg-zinc-950">
                      {/* Task Section */}
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold mb-4 text-blue-400 flex items-center gap-2">
                          <ListTodo size={14} />
                          Task
                        </h3>
                        <div className="text-sm text-zinc-300 space-y-3">
                          {previewLesson?.taskData?.blocks?.length > 0
                            ? previewLesson.taskData.blocks.map((block, i) => (
                                <RenderBlock key={i} block={block} />
                              ))
                            : <p className="text-zinc-600 italic">No task defined.</p>}
                        </div>
                      </div>

                      {/* Theory Section */}
                      <div>
                        <h3 className="text-sm font-semibold mb-4 text-zinc-400 flex items-center gap-2">
                          <Info size={14} />
                          Theory
                        </h3>
                        <div className="text-sm text-zinc-400 space-y-3">
                          {previewLesson?.theoryData?.blocks?.length > 0
                            ? previewLesson.theoryData.blocks.map((block, i) => (
                                <RenderBlock key={i} block={block} />
                              ))
                            : <p className="text-zinc-600 italic">No theory defined.</p>}
                        </div>
                      </div>
                    </div>

                    {/* Right: IDE Preview */}
                    <div className="w-full lg:w-3/5 bg-[#1e1e1e] flex flex-col min-h-[400px]">
                      {/* Code Editor */}
                      <div className="flex-1 flex flex-col">
                        <div className="h-9 bg-zinc-900 border-b border-zinc-800 flex items-center px-4">
                          <div className="flex items-center gap-2">
                            <Code size={13} className="text-cyan-500" />
                            <span className="text-xs text-zinc-500 font-medium">Starter Code</span>
                          </div>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-auto min-h-[200px]">
                          {previewLesson?.starterCode ? (
                            <pre className="text-cyan-300 whitespace-pre-wrap">
                              {previewLesson.starterCode}
                            </pre>
                          ) : (
                            <span className="text-zinc-600 italic">
                              // Empty editor - student writes code here...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Console Output */}
                      <div className="h-[140px] bg-black border-t border-zinc-800 flex flex-col">
                        <div className="h-8 bg-zinc-900/50 border-b border-zinc-800 flex items-center px-4">
                          <div className="flex items-center gap-2">
                            <TerminalSquare size={13} className="text-emerald-500" />
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Expected Output</span>
                          </div>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                          {previewLesson?.expectedOutput ? (
                            <pre className="text-emerald-400 whitespace-pre-wrap">
                              {previewLesson.expectedOutput}
                            </pre>
                          ) : (
                            <span className="text-zinc-600 italic">No output defined</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    className="bg-zinc-800 text-zinc-300"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
}
