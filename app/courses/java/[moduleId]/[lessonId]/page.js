"use client";
import React, { useState, useRef } from "react";
import { Sidebar, SidebarTrigger } from "../../../../../components/Sidebar";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Terminal as TerminalIcon
} from "lucide-react";
import { Button, ScrollShadow } from "@heroui/react";
import Link from "next/link";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function LessonIDEPage({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default for more space
  const [output, setOutput] = useState("> Ready to run...");
  const [isRunning, setIsRunning] = useState(false);
  
  const lesson = {
    title: "1. Introduction to Java",
    description: "Welcome to your first Java lesson!",
    theory: `In Java, every application begins with a class definition. The name of the class must match the filename.

The entry point of any Java application is the main method:
public static void main(String[] args) { ... }

Inside this method, you can write code that the computer executes. To print text to the console, we use:
System.out.println("Hello World");`,
    challenge: {
      title: "Your First Program",
      description: 'Modify the code to print "Hello Blueberry" to the console instead of "Hello World".',
      hint: 'Look at the text inside the quotation marks "".',
    }
  };

  const defaultCode = `public class Main {
    public static void main(String[] args) {
        // Write your code below
        System.out.println("Hello World");
    }
}`;

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const runCode = () => {
    setIsRunning(true);
    setOutput("> Compiling...");
    
    setTimeout(() => {
        const code = editorRef.current.getValue();
        
        // Simple check for the required output string
        if (code.indexOf("Hello Blueberry") !== -1) {
            setOutput("> Compiling... Done.\n> Running Main...\n\nHello Blueberry\n\n> Program finished with exit code 0\n> ✅ Challenge Completed!");
        } else if (code.indexOf("System.out.println") !== -1) {
             setOutput(`> Compiling... Done.\n> Running Main...\n\n(Output processing...)\n\n> Program finished with exit code 0\n> ⚠️ Challenge not met: Output must be "Hello Blueberry"`);
        } else {
            setOutput("> Compiling... Error.\n> Syntax Error: Missing print statement.");
        }
        setIsRunning(false);
    }, 800);
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {isSidebarOpen && <Sidebar />}
      
      <main className="flex-1 flex flex-col relative h-full">
        
        {/* Top Header */}
        <header className="h-14 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4 z-20 shrink-0">
            <div className="flex items-center gap-4">
                <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="h-4 w-[1px] bg-zinc-800" />
                <Link href="/courses/java/101" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <ChevronLeft size={16} />
                    Back to Path
                </Link>
                <div className="h-4 w-[1px] bg-zinc-800" />
                <span className="text-sm font-semibold text-white">{lesson.title}</span>
            </div>

            <div className="flex items-center gap-3">
                <Button 
                    size="sm" 
                    className="bg-blue-600 text-white font-bold"
                    startContent={<Play size={16} fill="currentColor" />}
                    isLoading={isRunning}
                    onPress={runCode}
                >
                    Run Code
                </Button>
            </div>
        </header>

        {/* IDE Layout: Resizable Panels */}
        <div className="flex-1 h-[calc(100vh-56px)] overflow-hidden">
            <PanelGroup direction="horizontal">
                
                {/* LEFT PANEL: Content */}
                <Panel defaultSize={25} minSize={15} collapsible={true} className="bg-zinc-950 flex flex-col border-r border-zinc-800">
                    <ScrollShadow className="flex-1 p-6 h-full">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Introduction</h2>
                            <div className="text-sm text-zinc-400 leading-relaxed">
                                <p className="whitespace-pre-line">{lesson.theory}</p>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5">
                            <div className="flex items-center gap-2 mb-3 text-blue-400">
                                <AlertCircle size={18} />
                                <h3 className="font-bold text-sm uppercase tracking-wide">Challenge</h3>
                            </div>
                            <p className="text-sm text-zinc-300 mb-4">{lesson.challenge.description}</p>
                            
                            <div className="text-xs text-zinc-500 bg-black/30 p-3 rounded-lg border border-white/5">
                                <span className="font-bold text-zinc-400">Hint:</span> {lesson.challenge.hint}
                            </div>
                        </div>
                    </ScrollShadow>
                </Panel>

                <PanelResizeHandle className="w-1 bg-zinc-900 hover:bg-blue-600 transition-colors" />

                {/* RIGHT PANEL: Editor & Console */}
                <Panel defaultSize={75} minSize={30}>
                    <PanelGroup direction="vertical">
                        
                        {/* TOP: Editor */}
                        <Panel className="flex flex-col bg-[#1e1e1e] min-h-0">
                            <div className="h-9 bg-zinc-900 border-b border-zinc-800 flex items-end px-2 gap-1 shrink-0">
                                <div className="px-4 py-2 bg-[#1e1e1e] text-blue-400 text-xs font-medium border-t-2 border-blue-500 flex items-center gap-2 rounded-t">
                                    <FileCode size={14} />
                                    Main.java
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                <Editor
                                    height="100%"
                                    defaultLanguage="java"
                                    defaultValue={defaultCode}
                                    theme="vs-dark"
                                    onMount={handleEditorDidMount}
                                    options={{
                                        fontSize: 14,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        padding: { top: 16 },
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    }}
                                />
                            </div>
                        </Panel>

                        <PanelResizeHandle className="h-1 bg-zinc-900 hover:bg-blue-600 transition-colors" />

                        {/* BOTTOM: Console */}
                        <Panel defaultSize={30} minSize={10} collapsible={true} className="bg-[#0f0f10] border-t border-zinc-800 flex flex-col">
                            <div className="h-9 bg-zinc-900/50 border-b border-zinc-800/50 flex items-center justify-between px-4 shrink-0">
                                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                                    <TerminalIcon size={14} />
                                    Console Output
                                </div>
                                <button 
                                    onClick={() => setOutput("> Ready to run...")}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                >
                                    <RotateCcw size={14} />
                                </button>
                            </div>
                            <ScrollShadow className="flex-1 p-4 font-mono text-sm h-full">
                                <pre className="text-zinc-300 whitespace-pre-wrap">{output}</pre>
                            </ScrollShadow>
                        </Panel>

                    </PanelGroup>
                </Panel>

            </PanelGroup>
        </div>
      </main>
    </div>
  );
}
