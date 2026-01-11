"use client";
import { Sidebar, SidebarTrigger } from "../../components/Sidebar";
import { useState, useRef, useEffect } from "react";
import { 
    Breadcrumbs, 
    BreadcrumbItem, 
    Button, 
    Input, 
    addToast, 
    ToastProvider,
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    useDisclosure,
    ScrollShadow,
    Tabs,
    Tab,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@heroui/react";
import { UsersRound, Search, UserPlus, MessageCircle, Copy, Check, Shield, Trophy, Send, Lock, UserMinus, X, Activity, UserCheck, Image as ImageIcon, Smile, MoreVertical, Reply, Heart, Paperclip, Mic, Phone, Video, MoreHorizontal } from "lucide-react";
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';

// Initialize Giphy API with environment variable
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'sXpGFg1JpeOW60E8Y7CPbh729w1079J2');

export default function FriendsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [friendId, setFriendId] = useState("");
  const userId = "USR-7X9K2M4P";
  const [activityReactions, setActivityReactions] = useState({});

  // Chat State
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [activeChatFriend, setActiveChatFriend] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [gifSearchTerm, setGifSearchTerm] = useState("");
  
  const [chatHistory, setChatHistory] = useState([
      { id: 1, sender: "them", type: "text", content: "Hey there! How's it going?", time: "9:00", liked: false },
      { id: 2, sender: "me", type: "text", content: "Hi! Not bad, just trying to get through the day. How about you?", time: "9:12", liked: true },
      { id: 3, sender: "them", type: "text", content: "Same here... Anything exciting happening on your end?", time: "9:20", liked: false }
  ]);
  const messagesEndRef = useRef(null);

  // Unfriend State
  const {isOpen: isUnfriendOpen, onOpen: onUnfriendOpen, onOpenChange: onUnfriendOpenChange} = useDisclosure();
  const [friendToRemove, setFriendToRemove] = useState(null);

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addFriend = () => {
    if (friendId.trim()) {
      setFriendId("");
    }
  };

  const openChat = (friend) => {
      setActiveChatFriend(friend);
      onOpen();
  };

  const confirmUnfriend = (friend) => {
      setFriendToRemove(friend);
      onUnfriendOpen();
  };

  const handleUnfriend = () => {
      setFriendToRemove(null);
      onUnfriendOpenChange(false); 
  };

  const sendMessage = (content, type = "text") => {
      if (type === "text" && !content.trim()) return;
      
      const newMsg = { 
          id: Date.now(), 
          sender: "me", 
          type, 
          content, 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          replyTo: replyingTo
      };
      setChatHistory(prev => [...prev, newMsg]);
      if (type === "text") setChatMessage("");
      setReplyingTo(null);
      
      // Scroll to bottom
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const toggleLike = (msgId) => {
      setChatHistory(prev => prev.map(msg => msg.id === msgId ? { ...msg, liked: !msg.liked } : msg));
  };

  // Giphy fetch function with search support
  const fetchGifs = (offset) => {
      return gifSearchTerm ? gf.search(gifSearchTerm, { offset, limit: 10 }) : gf.trending({ offset, limit: 10 });
  };

  const friends = [
    { id: 1, name: "Sarah_Dev", status: "online", activity: "Coding in Java 101", avatar: "S", league: "Diamond", leagueColor: "text-cyan-400", weeklyXp: 2100 },
    { id: 2, name: "MaxCoder", status: "offline", activity: "Last seen 2h ago", avatar: "M", league: "Gold", leagueColor: "text-yellow-400", weeklyXp: 1250 },
    { id: 3, name: "PixelArt", status: "online", activity: "Completing Daily Challenge", avatar: "P", league: "Silver", leagueColor: "text-zinc-400", weeklyXp: 980 },
    { id: 4, name: "CodeNinja", status: "idle", activity: "Away", avatar: "C", league: "Diamond", leagueColor: "text-cyan-400", weeklyXp: 450 },
  ];

  const friendRequests = [
      { id: 101, name: "NewbieDev", avatar: "N", time: "2h ago" }
  ];

  const activities = [
      { id: 1, user: "Sarah_Dev", action: "completed", target: "Java 101: Variables", time: "10m ago", icon: Check, color: "text-emerald-500" },
      { id: 2, user: "MaxCoder", action: "earned", target: "500 XP in Daily Challenge", time: "2h ago", icon: Trophy, color: "text-yellow-500" },
      { id: 3, user: "CodeNinja", action: "started", target: "Python for Data Science", time: "5h ago", icon: Activity, color: "text-blue-500" },
      { id: 4, user: "Max", action: "hat es in 5 Tagen nicht geschafft", target: "eine Übung zu machen", time: "5d ago", icon: Activity, color: "text-red-400" },
  ];

  const reactionOptions = [
    { key: "like", label: "Like", emoji: "👍" },
    { key: "clap", label: "Clap", emoji: "👏" },
    { key: "fire", label: "Fire", emoji: "🔥" },
    { key: "lol", label: "Funny", emoji: "😂" },
    { key: "wow", label: "Wow", emoji: "🤯" },
    { key: "support", label: "Support", emoji: "💪" },
    { key: "sad", label: "Oof", emoji: "😢" },
    { key: "party", label: "Party", emoji: "🎉" },
    { key: "mindblown", label: "Mind blown", emoji: "🤯" },
    { key: "eyes", label: "Watching", emoji: "👀" },
    { key: "100", label: "Keep it 100", emoji: "💯" },
  ];

  const toggleReaction = (activityId, reactionKey) => {
    setActivityReactions((prev) => {
      const current = prev[activityId];
      return {
        ...prev,
        [activityId]: current === reactionKey ? null : reactionKey,
      };
    });
  };

  // Sort friends for leaderboard by weekly XP
  const leaderboardFriends = [...friends].sort((a, b) => b.weeklyXp - a.weeklyXp);
  const leaderboardMax = Math.max(...leaderboardFriends.map((f) => f.weeklyXp), 1);
  const youEntry = { name: "You", weeklyXp: 450, rank: 4 };
  const leaderboardRows = [
    ...leaderboardFriends.slice(0, 3).map((f, idx) => ({ ...f, rank: idx + 1 })),
    youEntry,
  ];
  const rankStyles = (rank) => {
    switch (rank) {
      case 1:
        return { badgeBg: "bg-amber-400 text-black", bar: "bg-amber-400", glow: "from-amber-400/30" };
      case 2:
        return { badgeBg: "bg-zinc-300 text-black", bar: "bg-zinc-300", glow: "from-white/30" };
      case 3:
        return { badgeBg: "bg-orange-500 text-white", bar: "bg-orange-500", glow: "from-orange-500/30" };
      default:
        return { badgeBg: "bg-blue-500 text-white", bar: "bg-blue-500", glow: "from-blue-500/30" };
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <ToastProvider placement="bottom-right" />
      
      <main className="flex-1 h-full overflow-y-auto flex flex-col relative bg-[#050505]">
        <header className="h-14 border-b border-white/5 flex items-center px-4 gap-4 bg-black/50 backdrop-blur-md sticky top-0 z-10">
            <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="h-4 w-[1px] bg-white/10" />
            <Breadcrumbs 
                variant="light"
                classNames={{ list: "gap-2" }}
                itemClasses={{ item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors", separator: "text-zinc-700" }}
            >
                <BreadcrumbItem>Platform</BreadcrumbItem>
                <BreadcrumbItem>Friends</BreadcrumbItem>
            </Breadcrumbs>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 flex flex-col">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-1 tracking-tight flex items-center gap-3">
                        <UsersRound className="text-purple-500" /> Community
                    </h1>
                    <p className="text-zinc-500">Connect and collaborate with your peers.</p>
                </header>

                {/* Friend Requests */}
                {friendRequests.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-1">Friend Requests</h3>
                        <div className="space-y-2">
                            {friendRequests.map(req => (
                                <div key={req.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-blue-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-300">
                                            {req.avatar}
                                        </div>
                                        <div>
                                            <span className="font-bold text-white text-sm block">{req.name}</span>
                                            <span className="text-xs text-zinc-500">Sent {req.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="flat" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400" isIconOnly><X size={16} /></Button>
                                        <Button size="sm" className="bg-blue-600 text-white" startContent={<UserCheck size={16} />}>Accept</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Tabs 
                    aria-label="Friends Options" 
                    variant="underlined"
                    classNames={{
                        base: "w-full mb-6",
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-zinc-800",
                        cursor: "w-full bg-white",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-white text-zinc-500 font-medium transition-colors"
                    }}
                >
                    <Tab key="all" title="All Friends">
                        <div className="mb-6">
                            <Input 
                                placeholder="Search friends..." 
                                startContent={<Search size={18} className="text-zinc-500" />}
                                classNames={{
                                    inputWrapper: "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 h-12 rounded-xl text-white",
                                    input: "text-sm"
                                }}
                            />
                        </div>

                        <div className="grid gap-4">
                            {friends.map((friend) => (
                                <div key={friend.id} className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-300 border border-white/5 relative overflow-hidden">
                                                {friend.avatar}
                                                {friend.status === 'online' && (
                                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500 opacity-20 animate-pulse" />
                                                )}
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050505] flex items-center justify-center bg-zinc-900`}>
                                                <div className={`w-2 h-2 rounded-full ${
                                                    friend.status === 'online' ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : 
                                                    friend.status === 'idle' ? "bg-yellow-500" : "bg-zinc-600"
                                                }`} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-white text-sm">{friend.name}</h3>
                                                <Shield size={12} className={friend.leagueColor} />
                                            </div>
                                            <p className="text-xs text-zinc-500">{friend.activity}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                                        <Button isIconOnly size="sm" className="bg-zinc-800 text-zinc-400 hover:text-white rounded-lg min-w-[32px] w-8 h-8" onPress={() => openChat(friend)}>
                                            <MessageCircle size={16} />
                                        </Button>
                                        <Button 
                                            isIconOnly size="sm" 
                                            className="bg-zinc-800 text-zinc-400 hover:text-red-500 rounded-lg min-w-[32px] w-8 h-8"
                                            onPress={() => confirmUnfriend(friend)}
                                        >
                                            <UserMinus size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab>
                    <Tab key="activity" title="Activity Feed">
                        <div className="space-y-4">
                            {activities.map((act) => {
                                const selectedReaction = reactionOptions.find((opt) => opt.key === activityReactions[act.id]);
                                return (
                                    <div key={act.id} className="flex flex-col gap-3 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/10">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={`mt-1 p-2 rounded-lg bg-zinc-900 border border-zinc-800 ${act.color}`}>
                                                    <act.icon size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-zinc-300">
                                                        <span className="font-bold text-white">{act.user}</span> {act.action} <span className="text-white">{act.target}</span>
                                                    </p>
                                                    <span className="text-xs text-zinc-600">{act.time}</span>
                                                </div>
                                            </div>
                                            <Popover placement="top">
                                                <PopoverTrigger>
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        className="bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20"
                                                    >
                                                        <Smile size={16} />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-2 bg-[#0b0c10] border border-white/10 rounded-xl shadow-xl">
                                                    <div className="grid grid-cols-6 gap-2">
                                                        {reactionOptions.map((opt) => (
                                                            <button
                                                                key={opt.key}
                                                                className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-colors ${
                                                                    activityReactions[act.id] === opt.key 
                                                                    ? "bg-blue-600/30 border border-blue-500/40" 
                                                                    : "bg-zinc-900 border border-white/5 hover:border-white/20"
                                                                }`}
                                                                onClick={() => toggleReaction(act.id, opt.key)}
                                                                aria-label={opt.label}
                                                                type="button"
                                                            >
                                                                {opt.emoji}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        {selectedReaction && (
                                            <div className="flex justify-start">
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-blue-600/15 border border-blue-500/30 text-blue-100">
                                                    <span className="text-lg leading-none">{selectedReaction.emoji}</span>
                                                    <span className="capitalize">{selectedReaction.label}</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Tab>
                </Tabs>
            </div>

            {/* Right Column: Widgets */}
            <div className="lg:col-span-1 space-y-6 lg:mt-[110px] lg:self-start">
                
                {/* Friend Leaderboard */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-10 right-0 w-44 h-44 bg-white/5 blur-3xl rounded-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-white/5 text-white border border-white/10">
                                <Trophy size={16} className="text-amber-300" />
                            </span>
                            <div>
                                <h3 className="text-sm font-bold text-white">Friend Leaderboard</h3>
                                <p className="text-[11px] text-zinc-500">Weekly XP • Resets in 4d</p>
                            </div>
                        </div>
                        <span className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">Top performers</span>
                    </div>

                    <div className="mt-5 space-y-4 relative z-10">
                        {leaderboardRows.map((row) => {
                            const { badgeBg, bar, glow } = rankStyles(row.rank);
                            const widthPct = Math.min(100, Math.round((row.weeklyXp / leaderboardMax) * 100));
                            const isYou = row.name === "You";
                            return (
                                <div 
                                    key={`${row.name}-${row.rank}`} 
                                    className={`p-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition hover:border-white/15 hover:bg-white/10 ${isYou ? "ring-1 ring-blue-500/40" : ""}`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold ${badgeBg}`}>
                                                {row.rank}
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <span className="text-sm font-semibold text-white">{row.name}</span>
                                                <span className="text-[11px] text-zinc-500">{row.weeklyXp} XP</span>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-zinc-400">{widthPct}%</span>
                                    </div>
                                    <div className="mt-2 h-2 w-full bg-zinc-900 rounded-full overflow-hidden relative">
                                        <div 
                                            className={`h-full rounded-full ${bar}`} 
                                            style={{ width: `${widthPct}%` }} 
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-r ${glow} to-transparent opacity-60 pointer-events-none`} style={{ width: `${widthPct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Connect Widget */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-zinc-400 mb-6">Add Friend</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 font-mono text-xs text-zinc-300 overflow-hidden text-ellipsis">
                                {userId}
                            </div>
                            <Button
                                isIconOnly size="sm" variant="flat"
                                className={`h-9 w-9 min-w-9 rounded-lg ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                                onPress={copyUserId}
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Friend's ID..."
                                variant="bordered"
                                size="sm"
                                value={friendId}
                                onValueChange={setFriendId}
                                classNames={{
                                    inputWrapper: "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 h-9 rounded-lg",
                                    input: "font-mono text-xs",
                                }}
                            />
                            <Button
                                isIconOnly size="sm"
                                className="bg-emerald-500 text-white h-9 w-9 min-w-9 rounded-lg"
                                isDisabled={!friendId.trim()}
                                onPress={addFriend}
                            >
                                <UserPlus size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Chat Modal - REDESIGNED */}
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="3xl"
            classNames={{
                base: "bg-[#121212] border border-[#222] text-white rounded-[35px] overflow-hidden h-[800px] max-h-[90vh]",
                header: "p-0 bg-transparent",
                body: "p-0 bg-[#121212] flex-1 overflow-hidden relative",
                footer: "hidden", 
                closeButton: "top-6 right-6 z-50 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2"
            }}
        >
            <ModalContent className="h-full flex flex-col">
                {(onClose) => (
                    <>
                        {/* Custom Header - COMPACT & LEFT ALIGNED */}
                        <div className="flex-none flex items-center justify-between px-8 py-5 bg-gradient-to-r from-[#1a1a1a] to-[#121212] border-b border-[#222]">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 border border-[#333] flex items-center justify-center font-bold text-zinc-400 shadow-lg overflow-hidden">
                                        <img 
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChatFriend?.name}`} 
                                            alt="avatar" 
                                            className="w-full h-full object-cover opacity-80"
                                            onError={(e) => {e.target.style.display = 'none'}}
                                        />
                                        <span className="absolute text-sm">{activeChatFriend?.avatar}</span>
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#121212] rounded-full flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-base font-bold text-white tracking-tight leading-tight">{activeChatFriend?.name}</h2>
                                    <p className="text-zinc-500 text-[11px] font-medium">@{activeChatFriend?.name?.toLowerCase().replace(/\s/g, '')}</p>
                                </div>
                            </div>
                        </div>

                        <ModalBody className="flex flex-col h-full min-h-0">
                            
                            {/* Messages Area */}
                            <ScrollShadow className="flex-1 px-8 py-6 overflow-y-auto min-h-0">
                                <div className="flex justify-center mb-10">
                                    <span className="px-3 py-1 rounded-full bg-zinc-900/50 text-[10px] text-zinc-600 font-bold uppercase tracking-widest border border-white/5">Today</span>
                                </div>
                                
                                <div className="flex flex-col gap-4">
                                    {chatHistory.map((msg) => {
                                        const selectedReaction = reactionOptions.find(opt => opt.key === msg.reaction);
                                        return (
                                            <div 
                                                key={msg.id} 
                                                className={`flex flex-col max-w-[85%] group relative ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}
                                            >
                                                {/* Reply Context Bubble */}
                                                {msg.replyTo && (
                                                    <div className={`mb-1 text-xs text-zinc-500 flex items-center gap-1 ${msg.sender === 'me' ? 'mr-2' : 'ml-2'}`}>
                                                        <Reply size={10} />
                                                        <span className="opacity-70">Replying to {msg.replyTo.sender === 'me' ? 'yourself' : activeChatFriend?.name}</span>
                                                    </div>
                                                )}

                                                <div className="relative group/bubble">
                                                    {/* Message Actions (Hover) */}
                                                    <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover/bubble:opacity-100 transition-opacity flex items-center gap-1 z-10 ${msg.sender === 'me' ? '-left-20 pr-2' : '-right-20 pl-2'}`}>
                                                        <Button 
                                                            isIconOnly size="sm" radius="full" 
                                                            className="w-8 h-8 min-w-8 bg-[#222] text-zinc-400 hover:text-white border border-white/5 shadow-lg"
                                                            onPress={() => setReplyingTo(msg)}
                                                        >
                                                            <Reply size={16} />
                                                        </Button>
                                                        
                                                        <Popover placement="top">
                                                            <PopoverTrigger>
                                                                <Button 
                                                                    isIconOnly size="sm" radius="full" 
                                                                    className="w-8 h-8 min-w-8 bg-[#222] text-zinc-400 hover:text-white border border-white/5 shadow-lg"
                                                                >
                                                                    <Smile size={16} />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="p-2 bg-[#0b0c10] border border-white/10 rounded-xl shadow-xl">
                                                                <div className="grid grid-cols-6 gap-2">
                                                                    {reactionOptions.map((opt) => (
                                                                        <button
                                                                            key={opt.key}
                                                                            className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-colors hover:bg-white/10 ${msg.reaction === opt.key ? "bg-blue-500/20 border border-blue-500/50" : ""}`}
                                                                            onClick={() => {
                                                                                setChatHistory(prev => prev.map(m => m.id === msg.id ? { ...m, reaction: m.reaction === opt.key ? null : opt.key } : m));
                                                                            }}
                                                                        >
                                                                            {opt.emoji}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    <div 
                                                        className={`px-5 py-3 text-[14px] leading-relaxed shadow-sm transition-all relative z-0 ${
                                                            msg.sender === 'me' 
                                                                ? 'bg-[#2a2a2a] text-zinc-200 rounded-3xl rounded-tr-sm' 
                                                                : 'bg-[#1f1f1f] text-zinc-300 rounded-3xl rounded-tl-sm border border-white/5'
                                                        }`}
                                                    >
                                                        {msg.type === "gif" ? (
                                                            <img src={msg.content.images.fixed_height.url} alt="gif" className="rounded-2xl w-48 h-auto" />
                                                        ) : (
                                                            <>
                                                                {msg.content}
                                                                {/* Reaction Badge on Message */}
                                                                {selectedReaction && (
                                                                    <div className={`absolute -bottom-2 ${msg.sender === 'me' ? '-left-2' : '-right-2'} w-6 h-6 bg-[#222] rounded-full flex items-center justify-center text-[12px] border border-[#333] shadow-sm animate-in zoom-in duration-200`}>
                                                                        {selectedReaction.emoji}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1.5 mt-1.5 px-2">
                                                    <span className="text-[9px] text-zinc-600 font-bold uppercase">{msg.time}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollShadow>

                            {/* Reply Preview Bar */}
                            {replyingTo && (
                                <div className="px-8 pb-2 pt-0 flex-none animate-in slide-in-from-bottom-2 fade-in duration-200">
                                    <div className="flex items-center justify-between bg-[#1a1a1a] border border-blue-500/30 rounded-2xl p-3 pl-4 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">Replying to {replyingTo.sender === 'me' ? 'Yourself' : activeChatFriend?.name}</span>
                                            <p className="text-xs text-zinc-400 truncate max-w-[250px]">{replyingTo.type === 'gif' ? 'GIF Image' : replyingTo.content}</p>
                                        </div>
                                        <Button isIconOnly size="sm" variant="light" className="text-zinc-500 hover:text-white h-6 w-6 min-w-6" onPress={() => setReplyingTo(null)}>
                                            <X size={14} />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Custom Input Footer */}
                            <div className="p-8 pt-2 bg-[#121212] flex-none">
                                <div className="relative flex items-center w-full h-14 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2 focus-within:border-zinc-700 transition-all shadow-inner">
                                    <Popover placement="top-start">
                                        <PopoverTrigger>
                                            <Button isIconOnly radius="full" variant="light" className="text-zinc-500 hover:text-white w-10 h-10 ml-1">
                                                <ImageIcon size={22} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0 bg-[#0b0c10] border border-white/10 overflow-hidden rounded-3xl shadow-2xl">
                                            <div className="w-[320px] h-[350px] flex flex-col">
                                                <div className="p-3 border-b border-white/5 bg-[#121212]">
                                                    <Input 
                                                        placeholder="Search GIFs..." 
                                                        variant="bordered"
                                                        size="sm"
                                                        classNames={{
                                                            inputWrapper: "bg-[#1a1a1a] border-[#222] hover:border-[#333] h-10 rounded-xl",
                                                            input: "text-white text-xs"
                                                        }}
                                                        onValueChange={setGifSearchTerm}
                                                    />
                                                </div>
                                                <div className="flex-1 overflow-y-auto p-3 bg-[#09090b]">
                                                    <Grid 
                                                        key={gifSearchTerm}
                                                        width={300} 
                                                        columns={3} 
                                                        fetchGifs={fetchGifs} 
                                                        onGifClick={(gif, e) => {
                                                            e.preventDefault();
                                                            sendMessage(gif, "gif");
                                                        }} 
                                                    />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    
                                    <input 
                                        className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-600 px-3 text-sm h-full font-medium"
                                        placeholder="Write a message"
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage(chatMessage)}
                                    />

                                    <Button 
                                        isIconOnly 
                                        radius="full" 
                                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white w-10 h-10 mr-1 shadow-md transition-all"
                                        onPress={() => sendMessage(chatMessage)}
                                    >
                                        <Send size={20} />
                                    </Button>
                                </div>
                            </div>

                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>

        {/* Unfriend Confirmation Modal */}
        <Modal
            isOpen={isUnfriendOpen}
            onOpenChange={onUnfriendOpenChange}
            backdrop="blur"
            size="sm"
            classNames={{
                base: "bg-zinc-950 border border-zinc-800 text-white",
                header: "border-b border-zinc-800",
                footer: "border-t border-zinc-800"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Remove Friend</ModalHeader>
                        <ModalBody className="py-6">
                            <p className="text-zinc-400">
                                Are you sure you want to remove <strong>{friendToRemove?.name}</strong> from your friends list?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>Cancel</Button>
                            <Button color="danger" onPress={handleUnfriend}>Remove</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

      </main>
    </div>
  );
}
