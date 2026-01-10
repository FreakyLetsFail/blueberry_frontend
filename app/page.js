"use client";
import { Globe } from "../components/Globe";
import { Footer } from "../components/Footer";
import { useState } from "react";

export default function Page() {
  const [focus, setFocus] = useState(null);

  // Markers are dynamic based on hover state
  const markers = focus ? [{ location: focus, size: 0.1 }] : [];

  return (
    <div className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-black text-white selection:bg-blue-500/30">
      
      {/* Global Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ 
            backgroundImage: `
                linear-gradient(#222 1px, transparent 1px), 
                linear-gradient(90deg, #222 1px, transparent 1px)
            `, 
            backgroundSize: '40px 40px',
            zIndex: 0
        }}
      />

      {/* Hero Section */}
      <div className="relative flex min-h-screen w-full snap-start flex-col items-center justify-center pt-32 pb-48 z-10">
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="z-10 flex flex-col items-center px-4 text-center">
          {/* New Blueberry Logo (Scaled Up) */}
          <div className="mb-12 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40" width="300" height="60">
                <g transform="translate(4, 5)">
                    <polygon 
                    points="15,2 20,5.5 20,12.5 15,16 10,12.5 10,5.5" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    />
                    <polygon 
                    points="8,14 13,17.5 13,24.5 8,28 3,24.5 3,17.5" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    />
                    <polygon 
                    points="22,14 27,17.5 27,24.5 22,28 17,24.5 17,17.5" 
                    fill="#ffffff"
                    stroke="#ffffff" 
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    />
                    <path 
                    d="M 15 2 C 15 -1, 16 -2, 19 -3" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    />
                    <circle cx="19.5" cy="-3" r="1.2" fill="#ffffff"/>
                </g>
                <text 
                    x="44" 
                    y="26" 
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
                    fontSize="20"
                    fontWeight="600"
                    fill="#ffffff"
                    letterSpacing="-0.5"
                >Blueberry</text>
            </svg>
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
            Simplest way to learn <br />
            with and for your <span className="text-blue-500">University</span>
          </h1>
          
          <p className="mt-6 text-xl leading-8 text-zinc-400 max-w-2xl">
            Master your curriculum with AI-powered paths, interactive coding environments, and a global student community.
          </p>

          <div className="mt-12 flex items-center justify-center gap-x-8">
            <a 
              href="/auth"
              className="rounded-full bg-white px-10 py-4 text-base font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all"
            >
              Get Started
            </a>
            <a href="#why-blueberry" className="text-base font-semibold leading-6 text-white hover:text-blue-400 transition-colors flex items-center gap-2 group">
              Learn more <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Why to use Blueberry Section */}
      <section id="why-blueberry" className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-48 text-center z-10 border-t border-zinc-900">
        <div className="max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-24">
            Why choose <span className="text-blue-500">Blueberry</span>?
          </h2>
          <div className="grid gap-12 sm:grid-cols-3 text-left">
            
            {/* Feature 1 */}
            <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl hover:bg-zinc-900 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 13v6"/><path d="M9 16h6"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Centralized Intelligence</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                All your lecture notes, assignments, and external resources unified in one intelligent knowledge base.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl hover:bg-zinc-900 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Global Collaboration</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Connect with peers worldwide. Share flashcards, solve challenges together, and master your exams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl hover:bg-zinc-900 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Smart Scheduling</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">
                Never miss a deadline. Our AI optimizes your study plan based on your exam dates and learning pace.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How to use? */}
      <section id="how-to-use" className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black/80 px-4 py-48 text-center backdrop-blur-sm z-10 border-t border-zinc-900">
        <div className="max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-24">
            How it works
          </h2>
          <div className="grid gap-12 sm:grid-cols-3 relative">
            {/* Connector Line */}
            <div className="hidden sm:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-0" />

            <div className="flex flex-col items-center relative z-10 group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black border-2 border-zinc-800 text-3xl font-bold text-white mb-8 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors shadow-2xl">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
              <p className="text-zinc-400 max-w-xs">Register securely with your university email to verify your status and join your campus network.</p>
            </div>
            
            <div className="flex flex-col items-center relative z-10 group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black border-2 border-zinc-800 text-3xl font-bold text-white mb-8 group-hover:border-purple-500 group-hover:text-purple-500 transition-colors shadow-2xl">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Select Courses</h3>
              <p className="text-zinc-400 max-w-xs">Browse our catalog or import your semester schedule to sync with your current modules.</p>
            </div>

            <div className="flex flex-col items-center relative z-10 group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black border-2 border-zinc-800 text-3xl font-bold text-white mb-8 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors shadow-2xl">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Start Learning</h3>
              <p className="text-zinc-400 max-w-xs">Access AI tutors, interactive coding environments, and peer notes instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where do we operate */}
      <section id="where-we-operate" className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black px-4 py-48 text-center overflow-hidden z-10 border-t border-zinc-900">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
            Global Presence
          </h2>
          <p className="text-zinc-400 mb-20 max-w-2xl text-lg">
            We are currently launching in Germany, bringing students together across top universities.
          </p>
          
          <div className="flex w-full flex-col items-center lg:flex-row lg:justify-between gap-12">
             {/* Globe */}
            <div className="relative flex h-[600px] w-full max-w-[600px] items-center justify-center lg:w-1/2">
               <Globe className="h-full w-full" focus={focus} markers={markers} />
            </div>

            {/* Country List */}
            <div className="flex w-full flex-col items-center justify-center gap-6 lg:w-1/2 lg:items-start lg:pl-12">
              <p className="text-lg text-zinc-500 mb-8 text-center lg:text-left">
                Hover over a region to explore our active campuses.
              </p>
              
              <div className="flex flex-col gap-6 w-full max-w-md">
                  <div 
                    className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-blue-500 hover:bg-blue-500/10"
                    onMouseEnter={() => setFocus([51.1657, 10.4515])}
                    onMouseLeave={() => setFocus(null)}
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-4xl">🇩🇪</span>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-xl text-white">Germany</span>
                        <span className="text-sm font-medium text-emerald-500">Active</span>
                      </div>
                    </div>
                    <span className="opacity-0 transition-opacity group-hover:opacity-100 text-blue-500 transform translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                  </div>

                  <div 
                    className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-purple-500 hover:bg-purple-500/10"
                    onMouseEnter={() => setFocus([37.0902, -95.7129])}
                    onMouseLeave={() => setFocus(null)}
                  >
                     <div className="flex items-center gap-6">
                      <span className="text-4xl">🇺🇸</span>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-xl text-white">USA</span>
                        <span className="text-sm font-medium text-zinc-500">Coming Soon</span>
                      </div>
                    </div>
                    <span className="opacity-0 transition-opacity group-hover:opacity-100 text-purple-500 transform translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black/80 px-4 py-48 text-center backdrop-blur-sm z-10 border-t border-zinc-900">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-12">
            Get in touch
          </h2>
          <p className="text-xl text-zinc-400 mb-16 leading-relaxed">
            Have questions or want to bring Blueberry to your university? <br/>We'd love to hear from you.
          </p>
          
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
            <a 
              href="mailto:hello@blueberry.app" 
              className="rounded-full bg-white px-10 py-4 text-base font-bold text-black shadow-lg hover:bg-zinc-200 transition-all"
            >
              Email Us
            </a>
            <a 
              href="#" 
              className="rounded-full border border-zinc-700 bg-transparent px-10 py-4 text-base font-bold text-white hover:bg-zinc-900 transition-all"
            >
              Follow on Twitter
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}