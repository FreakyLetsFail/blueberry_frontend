"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { Breadcrumbs, BreadcrumbItem, Input, Textarea, Button } from "@heroui/react";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative">
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
                <BreadcrumbItem>Contact</BreadcrumbItem>
              </Breadcrumbs>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Get in touch</h1>
                <p className="text-zinc-400 max-w-lg mx-auto">
                    We'd love to hear from you. Please fill out this form or shoot us an email.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                            <Mail size={20} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Email</h3>
                        <p className="text-sm text-zinc-500 mb-2">Our friendly team is here to help.</p>
                        <a href="mailto:support@blueberry.app" className="text-sm font-semibold text-blue-400 hover:text-blue-300">support@blueberry.app</a>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                            <MessageSquare size={20} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Live Chat</h3>
                        <p className="text-sm text-zinc-500 mb-2">Weekdays: 9am - 6pm CET</p>
                        <span className="text-sm font-semibold text-zinc-300">Available</span>
                    </div>
                </div>

                {/* Form */}
                <div className="md:col-span-2 p-8 rounded-3xl border border-zinc-800 bg-zinc-900/20">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First Name" placeholder="First name" variant="bordered" classNames={{ inputWrapper: "bg-zinc-950 border-zinc-800" }} />
                            <Input label="Last Name" placeholder="Last name" variant="bordered" classNames={{ inputWrapper: "bg-zinc-950 border-zinc-800" }} />
                        </div>
                        <Input label="Email" placeholder="you@company.com" variant="bordered" classNames={{ inputWrapper: "bg-zinc-950 border-zinc-800" }} />
                        <Textarea label="Message" placeholder="Leave us a message..." minRows={4} variant="bordered" classNames={{ inputWrapper: "bg-zinc-950 border-zinc-800" }} />
                        
                        <Button className="w-full bg-white text-black font-bold h-12 rounded-xl">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
