"use client";
import { Sidebar, SidebarTrigger } from "../../components/Sidebar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Input, Textarea, Button, Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Mail, MessageSquare, Send, Globe, Sparkles, Wand2, Zap } from "lucide-react";

export default function ContactPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                <BreadcrumbItem>Contact</BreadcrumbItem>
            </Breadcrumbs>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full relative z-10 pt-16">
            {/* Minimalist Header */}
            <header className="mb-12">
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                    Let's Build Something <span className="text-blue-500">Extraordinary</span>
                </h1>
                <p className="text-sm text-zinc-500 max-w-xl leading-relaxed">
                    Whether you're a student, educator, or enterprise – we're here to help you revolutionize learning.
                </p>
            </header>

            <Tabs 
                aria-label="Contact options" 
                variant="underlined"
                classNames={{
                    base: "mb-8",
                    tabList: "gap-8 w-full relative rounded-none p-0 border-b border-white/5",
                    cursor: "w-full bg-white",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-white text-zinc-500 font-medium transition-colors"
                }}
            >
                {/* AI Assistant Tab */}
                <Tab key="ai" title={
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-blue-400" />
                        <span>AI Assistant</span>
                    </div>
                }>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <Card className="relative bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl">
                            <CardBody className="p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Wand2 size={18} className="text-blue-400" />
                                            How can I help you today?
                                        </h3>
                                        <p className="text-xs text-zinc-500">Describe your inquiry and our AI will route you to the best solution.</p>
                                    </div>
                                    <div className="relative">
                                        <Input 
                                            placeholder="I want to integrate Blueberry into my Java curriculum..." 
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "bg-black border-zinc-800 hover:border-blue-500/50 h-14 rounded-xl px-4",
                                                input: "text-white text-base"
                                            }}
                                            endContent={
                                                <Button isIconOnly size="sm" className="bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20">
                                                    <Send size={16} />
                                                </Button>
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['University Pricing', 'Custom Courses', 'Technical Support'].map((tag) => (
                                            <button key={tag} className="px-3 py-1 rounded-full border border-zinc-800 text-[10px] font-bold text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all uppercase tracking-wider">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Tab>

                {/* Manual Form Tab */}
                <Tab key="form" title={
                    <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>Direct Inquiry</span>
                    </div>
                }>
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Name" placeholder="Justus" variant="bordered" classNames={{ inputWrapper: "bg-zinc-900/30 border-zinc-800" }} />
                            <Input label="Email" placeholder="justus@example.com" variant="bordered" classNames={{ inputWrapper: "bg-zinc-900/30 border-zinc-800" }} />
                        </div>
                        <Textarea label="Message" placeholder="How can we help?" minRows={4} variant="bordered" classNames={{ inputWrapper: "bg-zinc-900/30 border-zinc-800" }} />
                        <Button className="w-full bg-white text-black font-bold h-12 rounded-xl">
                            Send Message
                        </Button>
                    </div>
                </Tab>

                {/* Direct Info Tab */}
                <Tab key="info" title="Global HQ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                        <Card className="bg-zinc-900/20 border border-white/5 shadow-none">
                            <CardBody className="p-6 flex flex-row items-start gap-4">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">Berlin Hub</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        Blueberry Inc.<br />
                                        Tech Hub Berlin<br />
                                        10115 Berlin, Germany
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="bg-zinc-900/20 border border-white/5 shadow-none">
                            <CardBody className="p-6 flex flex-row items-start gap-4">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">Live Support</h4>
                                    <p className="text-xs text-zinc-500 mb-2">Available Mon-Fri</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold uppercase text-emerald-500">Active Now</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Tab>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
