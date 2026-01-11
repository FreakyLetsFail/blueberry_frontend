"use client";
import { Sidebar, SidebarTrigger, useResponsiveSidebarState } from "../../components/Sidebar";
import { PageTopBar } from "../../components/PageTopBar";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import {
  Coins,
  Sparkles,
  Crown,
  Palette,
  Frame,
  Zap,
  Star,
  TrendingUp,
  Clock,
  Check,
  ShoppingBag
} from "lucide-react";

const categories = [
  { id: "all", name: "All Items", icon: Sparkles },
  { id: "frames", name: "Avatar Frames", icon: Frame },
  { id: "themes", name: "Themes", icon: Palette },
  { id: "badges", name: "Badges", icon: Crown },
  { id: "effects", name: "Effects", icon: Zap },
];

const featuredItem = {
  id: "featured",
  name: "Cosmic Aura",
  type: "Premium Bundle",
  description: "Includes animated avatar frame, exclusive theme, and profile badge",
  price: 500,
  originalPrice: 750,
  gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  items: ["Cosmic Frame", "Nebula Theme", "Star Badge"],
};

const shopItems = [
  {
    id: 1,
    name: "Neon Pulse",
    type: "Avatar Frame",
    category: "frames",
    price: 150,
    rarity: "rare",
    gradient: "from-cyan-500 to-blue-600",
    icon: Frame,
    isNew: true,
  },
  {
    id: 2,
    name: "Midnight",
    type: "Theme",
    category: "themes",
    price: 220,
    rarity: "epic",
    gradient: "from-slate-700 to-zinc-900",
    icon: Palette,
    isNew: false,
  },
  {
    id: 3,
    name: "Lightning",
    type: "Path Effect",
    category: "effects",
    price: 180,
    rarity: "rare",
    gradient: "from-amber-400 to-orange-500",
    icon: Zap,
    isNew: true,
  },
  {
    id: 4,
    name: "Champion",
    type: "Profile Badge",
    category: "badges",
    price: 120,
    rarity: "common",
    gradient: "from-emerald-500 to-teal-600",
    icon: Crown,
    isNew: false,
  },
  {
    id: 5,
    name: "Holographic",
    type: "Avatar Frame",
    category: "frames",
    price: 280,
    rarity: "legendary",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    icon: Frame,
    isNew: false,
  },
  {
    id: 6,
    name: "Ember",
    type: "Path Effect",
    category: "effects",
    price: 160,
    rarity: "rare",
    gradient: "from-red-500 to-orange-600",
    icon: Zap,
    isNew: false,
  },
  {
    id: 7,
    name: "Aurora",
    type: "Theme",
    category: "themes",
    price: 250,
    rarity: "epic",
    gradient: "from-green-400 via-cyan-500 to-blue-500",
    icon: Palette,
    isNew: true,
  },
  {
    id: 8,
    name: "Diamond",
    type: "Profile Badge",
    category: "badges",
    price: 300,
    rarity: "legendary",
    gradient: "from-cyan-300 to-blue-400",
    icon: Crown,
    isNew: false,
  },
];

const rarityColors = {
  common: "text-zinc-400 bg-zinc-800/50",
  rare: "text-blue-400 bg-blue-500/10",
  epic: "text-purple-400 bg-purple-500/10",
  legendary: "text-amber-400 bg-amber-500/10",
};

export default function ShopPage() {
  const { open: isSidebarOpen, setOpen: setIsSidebarOpen } = useResponsiveSidebarState();
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState(null);
  const userBalance = 1240;

  const filteredItems = activeCategory === "all"
    ? shopItems
    : shopItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-1 h-full overflow-y-auto flex flex-col relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <PageTopBar
          left={<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
          breadcrumbs={
            <>
              <BreadcrumbItem>Platform</BreadcrumbItem>
              <BreadcrumbItem>Shop</BreadcrumbItem>
            </>
          }
          className="z-10"
        />

        <div className="p-8 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">Token Shop</h1>
              <p className="text-zinc-500">Redeem tokens for exclusive cosmetics and rewards</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <Coins size={18} className="text-amber-400" />
                <span className="text-lg font-bold text-amber-400">{userBalance.toLocaleString()}</span>
                <span className="text-sm text-amber-400/70">Tokens</span>
              </div>
            </div>
          </div>

          {/* Featured Item */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-amber-500" />
              <h2 className="text-sm font-medium text-zinc-400">Featured Deal</h2>
              <div className="flex items-center gap-1 ml-2 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-xs font-bold text-red-400">
                <Clock size={10} />
                Limited Time
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 p-6">
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${featuredItem.gradient} opacity-10`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-8">
                  {/* Featured item preview */}
                  <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${featuredItem.gradient} p-[2px]`}>
                    <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${featuredItem.gradient} opacity-60 blur-sm absolute`} />
                      <Sparkles size={32} className="text-white relative z-10" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                      {featuredItem.type}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{featuredItem.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4 max-w-md">{featuredItem.description}</p>
                    <div className="flex items-center gap-3">
                      {featuredItem.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-xs text-zinc-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <span className="text-zinc-500 line-through text-sm">{featuredItem.originalPrice}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs font-bold text-emerald-400">
                      -33%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-end mb-4">
                    <Coins size={20} className="text-amber-400" />
                    <span className="text-3xl font-bold text-white">{featuredItem.price}</span>
                  </div>
                  <Button
                    className="bg-white text-black font-bold h-11 px-8 rounded-xl hover:bg-zinc-200"
                    startContent={<ShoppingBag size={16} />}
                  >
                    Purchase Bundle
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-white text-black"
                    : "bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-white/5"
                }`}
              >
                <cat.icon size={14} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-300"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* New badge */}
                {item.isNew && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-blue-500 rounded text-[10px] font-bold text-white uppercase">
                    New
                  </div>
                )}

                {/* Item preview */}
                <div className={`relative aspect-square rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] mb-4 overflow-hidden`}>
                  <div className="w-full h-full rounded-xl bg-zinc-950 flex items-center justify-center relative">
                    {/* Glow effect on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-300 ${
                        hoveredItem === item.id ? 'opacity-20' : 'opacity-0'
                      }`}
                    />
                    <item.icon
                      size={40}
                      className={`text-white transition-transform duration-300 ${
                        hoveredItem === item.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  </div>
                </div>

                {/* Item info */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${rarityColors[item.rarity]}`}>
                      {item.rarity}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.name}</h3>
                </div>

                {/* Price and action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Coins size={14} className="text-amber-400" />
                    <span className="font-bold text-white">{item.price}</span>
                  </div>
                  <Button
                    size="sm"
                    className={`font-semibold h-8 px-4 rounded-lg transition-all ${
                      userBalance >= item.price
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    }`}
                    isDisabled={userBalance < item.price}
                  >
                    {userBalance >= item.price ? "Buy" : "Not enough"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 p-4 bg-zinc-900/40 border border-white/5 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" />
                  <span className="text-sm text-zinc-500">Items Owned</span>
                  <span className="text-sm font-bold text-white">12</span>
                </div>
                <div className="h-4 w-px bg-zinc-800" />
                <div className="flex items-center gap-2">
                  <Coins size={14} className="text-amber-500" />
                  <span className="text-sm text-zinc-500">Total Spent</span>
                  <span className="text-sm font-bold text-white">2,450</span>
                </div>
                <div className="h-4 w-px bg-zinc-800" />
                <div className="flex items-center gap-2">
                  <Crown size={14} className="text-purple-500" />
                  <span className="text-sm text-zinc-500">Rarest Item</span>
                  <span className="text-sm font-bold text-amber-400">Legendary</span>
                </div>
              </div>
              <span className="text-xs text-zinc-600">Refreshes in 6h 42m</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
