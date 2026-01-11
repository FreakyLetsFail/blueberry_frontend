"use client";
import { Sidebar, SidebarTrigger } from "../../../../components/Sidebar";
import { useState, useRef, useEffect, use } from "react";
import { Breadcrumbs, BreadcrumbItem, Button, Input, ScrollShadow, Avatar } from "@heroui/react";
import { Send, Phone, Video, MoreVertical, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ChatPage({ params }) {
  const unwrappedParams = use(params);
  const { friendId } = unwrappedParams;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default for focus
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hey! Did you check out the new Java challenge?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Yeah, the recursion one? It's tough!", time: "10:32 AM" },
    { id: 3, sender: "them", text: "Exactly! I'm stuck on the base case. Wanna pair program later?", time: "10:33 AM" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { 
        id: Date.now(), 
        sender: "me", 
        text: message, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Mock friend data based on ID (normally fetched)
  const friendName = friendId === "1" ? "Sarah_Dev" : friendId === "2" ? "MaxCoder" : "Friend";

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {isSidebarOpen && <Sidebar />}
      
      <main className="flex-1 flex flex-col relative h-full bg-[#050505]">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
                <Link href="/friends" className="text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 border border-white/10">
                            {friendName.charAt(0)}
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 bg-emerald-500" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white text-sm">{friendName}</h2>
                        <span className="text-xs text-emerald-500 font-medium">Online</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <Button isIconOnly variant="light" size="sm" className="text-zinc-400 hover:text-white"><Phone size={18} /></Button>
                <Button isIconOnly variant="light" size="sm" className="text-zinc-400 hover:text-white"><Video size={18} /></Button>
                <Button isIconOnly variant="light" size="sm" className="text-zinc-400 hover:text-white"><MoreVertical size={18} /></Button>
            </div>
        </header>

        {/* Messages Area */}
        <ScrollShadow className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                {/* Date Divider */}
                <div className="flex justify-center my-4">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full">Today</span>
                </div>

                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex flex-col max-w-[80%] ${msg.sender === "me" ? "self-end items-end" : "self-start items-start"}`}
                    >
                        <div 
                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                msg.sender === "me" 
                                    ? "bg-blue-600 text-white rounded-tr-sm" 
                                    : "bg-zinc-800 text-zinc-200 rounded-tl-sm"
                            }`}
                        >
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-zinc-600 mt-1 px-1">
                            {msg.time}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </ScrollShadow>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-zinc-950">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
                <Input 
                    placeholder="Type a message..." 
                    variant="faded" 
                    radius="full"
                    value={message}
                    onValueChange={setMessage}
                    onKeyDown={handleKeyPress}
                    classNames={{
                        inputWrapper: "bg-zinc-900 border-zinc-800 hover:bg-zinc-800/80 text-white",
                        input: "text-sm pl-2"
                    }}
                />
                <Button 
                    isIconOnly 
                    radius="full" 
                    className="bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    onPress={handleSend}
                >
                    <Send size={18} />
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
