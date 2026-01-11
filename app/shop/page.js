"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { useState } from "react";
import { BreadcrumbItem, Button } from "@heroui/react";
import {
  Coins,
  Sparkles,
  Crown,
  Palette,
  Frame,
  Zap,
  Check,
  Clock,
  Search,
  ShoppingBag
} from "lucide-react";

const categories = [
  { id: "all", name: "All", icon: Sparkles },
  { id: "frames", name: "Frames", icon: Frame },
  { id: "themes", name: "Themes", icon: Palette },
  { id: "badges", name: "Badges", icon: Crown },
  { id: "effects", name: "Effects", icon: Zap },
  { id: "real-life", name: "Real Life", icon: ShoppingBag },
];

const featuredItem = {
  id: "featured",
  name: "Cosmic Aura",
  type: "Premium Bundle",
  description: "Animated avatar frame, exclusive theme, and profile badge",
  price: 500,
  originalPrice: 750,
  items: ["Cosmic Frame", "Nebula Theme", "Star Badge"],
};

const shopItems = [
  { id: 1, name: "Neon Pulse", type: "Avatar Frame", category: "frames", price: 150, rarity: "rare", isNew: true },
  { id: 2, name: "Midnight", type: "Theme", category: "themes", price: 220, rarity: "epic", isNew: false },
  { id: 3, name: "Lightning", type: "Effect", category: "effects", price: 180, rarity: "rare", isNew: true },
  { id: 4, name: "Champion", type: "Badge", category: "badges", price: 120, rarity: "common", isNew: false },
  { id: 5, name: "Holographic", type: "Avatar Frame", category: "frames", price: 280, rarity: "legendary", isNew: false },
  { id: 6, name: "Ember", type: "Effect", category: "effects", price: 160, rarity: "rare", isNew: false },
  { id: 7, name: "Aurora", type: "Theme", category: "themes", price: 250, rarity: "epic", isNew: true },
  { id: 8, name: "Diamond", type: "Badge", category: "badges", price: 300, rarity: "legendary", isNew: false },
  { id: 9, name: "Developer Mug", type: "Physical Item", category: "real-life", price: 100000, rarity: "legendary", isNew: true },
  { id: 10, name: "Eco Tote Bag", type: "Physical Item", category: "real-life", price: 100000, rarity: "epic", isNew: true },
  { id: 11, name: "Sticker Pack", type: "Physical Item", category: "real-life", price: 50000, rarity: "rare", isNew: false },
  { id: 12, name: "Hoodie", type: "Physical Item", category: "real-life", price: 250000, rarity: "legendary", isNew: true },
];

const rarityColors = {
  common: "text-zinc-500",
  rare: "text-blue-400",
  epic: "text-purple-400",
  legendary: "text-amber-400",
};

const categoryIcons = {
  frames: Frame,
  themes: Palette,
  badges: Crown,
  effects: Zap,
  "real-life": ShoppingBag,
};

export default function ShopPage() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();
  const [activeCategory, setActiveCategory] = useState("all");
  const userBalance = 1240;

  const filteredItems = activeCategory === "all"
    ? shopItems
    : shopItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-[#050505]">
        <PageTopBar
          left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
          breadcrumbs={
            <>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Shop</BreadcrumbItem>
        </>
      }
          className="z-10"
        />

        <div className="p-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="flex items-end justify-between mb-12 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">Shop</h1>
              <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
                Customize your experience with exclusive digital assets.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Balance</span>
                <span className="font-mono text-xl">{userBalance.toLocaleString()}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                 <Coins size={20} />
              </div>
            </div>
          </header>

          {/* Featured Banner */}
          <div className="mb-16 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 overflow-hidden">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider border border-purple-500/20">
                           Featured Bundle
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-red-400 font-medium bg-red-500/5 px-2 py-0.5 rounded-full">
                           <Clock size={12} /> Ends soon
                        </span>
                     </div>
                     
                     <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{featuredItem.name}</h2>
                        <p className="text-zinc-400 max-w-lg leading-relaxed">{featuredItem.description}</p>
                     </div>

                     <div className="flex items-center gap-4 pt-2">
                        {featuredItem.items.map((item, i) => (
                           <div key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                              <Check size={14} className="text-emerald-500" />
                              {item}
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 min-w-[200px]">
                     <div className="text-right">
                        <span className="text-zinc-600 line-through text-sm mr-2">{featuredItem.originalPrice}</span>
                        <span className="text-3xl font-bold text-white tracking-tight">{featuredItem.price}</span>
                        <span className="text-amber-400 ml-1 text-lg">TK</span>
                     </div>
                     <Button className="w-full bg-white text-black font-bold h-12 rounded-xl hover:scale-105 transition-transform">
                        Purchase Bundle
                     </Button>
                  </div>
               </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-8">
               {categories.map((cat) => (
                  <button
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     className={`text-sm font-medium transition-colors pb-1 relative ${
                        activeCategory === cat.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                     }`}
                  >
                     {cat.name}
                     {activeCategory === cat.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                     )}
                  </button>
               ))}
            </div>
            
            {/* Simple Search - Visual Only */}
            <button className="text-zinc-500 hover:text-white transition-colors">
               <Search size={18} />
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const ItemIcon = categoryIcons[item.category] || Sparkles;
              return (
                <div
                  key={item.id}
                  className="group relative bg-[#0a0a0a] hover:bg-[#111] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon Area */}
                  <div className="h-32 w-full bg-zinc-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-zinc-900/50 transition-colors relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <ItemIcon size={32} className={`text-zinc-600 group-hover:text-white transition-colors duration-500 ${item.rarity === 'legendary' ? 'drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]' : ''}`} />
                     
                     {item.isNew && (
                        <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                     )}
                  </div>

                  <div className="space-y-1 mb-4">
                     <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${rarityColors[item.rarity]}`}>
                           {item.rarity}
                        </span>
                     </div>
                     <h3 className="font-bold text-white text-lg">{item.name}</h3>
                     <p className="text-xs text-zinc-500">{item.type}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <span className="font-mono font-medium text-zinc-300">
                        {item.price} <span className="text-zinc-600 text-xs">TK</span>
                     </span>
                     <button 
                        className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${
                           userBalance >= item.price 
                              ? "bg-white text-black hover:bg-zinc-200" 
                              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                        disabled={userBalance < item.price}
                     >
                        Get
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
