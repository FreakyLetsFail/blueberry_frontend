"use client";
import { Sidebar, SidebarTrigger } from "../../components/Sidebar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input, Switch, User } from "@heroui/react";
import { Palette, User as UserIcon, Shield, CreditCard, ShoppingBag, Gift } from "lucide-react";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const shopItems = [
    { id: 1, name: "Neon Frame", type: "Avatar Frame", price: 150, image: "https://i.imgur.com/8Q5QY5M.png", color: "bg-purple-500/20 text-purple-400" },
    { id: 2, name: "Midnight Theme", type: "Theme", price: 220, image: "https://i.imgur.com/8Q5QY5M.png", color: "bg-blue-900/20 text-blue-400" },
    { id: 3, name: "Holo Trail", type: "Path FX", price: 180, image: "https://i.imgur.com/8Q5QY5M.png", color: "bg-cyan-500/20 text-cyan-400" },
    { id: 4, name: "Champion Badge", type: "Profile Badge", price: 120, image: "https://i.imgur.com/8Q5QY5M.png", color: "bg-yellow-500/20 text-yellow-400" },
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {isSidebarOpen && <Sidebar />}
      
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
                <BreadcrumbItem>Settings</BreadcrumbItem>
              </Breadcrumbs>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full">
            <header className="mb-10">
                <h1 className="text-3xl font-bold mb-1 tracking-tight">Settings</h1>
                <p className="text-zinc-500">Manage your account, preferences, and redeem rewards.</p>
            </header>

            <Tabs 
                aria-label="Settings Options" 
                variant="underlined"
                classNames={{
                    base: "w-full mb-8",
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-zinc-800",
                    cursor: "w-full bg-white",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-white text-zinc-500 font-medium transition-colors"
                }}
            >
                <Tab key="account" title={<div className="flex items-center gap-2"><UserIcon size={16}/>Account</div>}>
                    <div className="space-y-8 max-w-2xl">
                        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
                            <h3 className="text-lg font-bold mb-6">Profile Information</h3>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold border border-zinc-700">
                                    JW
                                </div>
                                <div>
                                    <Button size="sm" variant="flat" className="bg-white text-black font-semibold mb-2">Upload New Picture</Button>
                                    <p className="text-xs text-zinc-500">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" placeholder="Justus" variant="bordered" />
                                    <Input label="Last Name" placeholder="Waechter" variant="bordered" />
                                </div>
                                <Input label="Email Address" placeholder="justus@blueberry.app" variant="bordered" />
                            </div>
                        </div>
                    </div>
                </Tab>
                
                <Tab key="preferences" title={<div className="flex items-center gap-2"><Palette size={16}/>Preferences</div>}>
                    <div className="max-w-2xl space-y-6">
                        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white">Dark Mode</h3>
                                <p className="text-sm text-zinc-500">Adjust the appearance of the application</p>
                            </div>
                            <Switch defaultSelected color="primary" />
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-white">Email Notifications</h3>
                                <p className="text-sm text-zinc-500">Receive updates about your course progress</p>
                            </div>
                            <Switch defaultSelected color="primary" />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
