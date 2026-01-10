"use client";
import { Globe } from "../components/Globe";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Check, School, Rocket, Sparkles, Infinity, Hourglass } from "lucide-react";

export default function Page() {
  const [focus, setFocus] = useState(null);
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
          {/* Made in Germany Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm font-medium text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Made in Germany
          </div>

          {/* Blueberry Logo (Scaled Up) */}
          <div className="mb-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40" width="300" height="60">
                <g transform="translate(4, 5)">
                    <polygon points="15,2 20,5.5 20,12.5 15,16 10,12.5 10,5.5" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round"/>
                    <polygon points="8,14 13,17.5 13,24.5 8,28 3,24.5 3,17.5" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round"/>
                    <polygon points="22,14 27,17.5 27,24.5 22,28 17,24.5 17,17.5" fill="#ffffff" stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M 15 2 C 15 -1, 16 -2, 19 -3" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="19.5" cy="-3" r="1.2" fill="#ffffff"/>
                </g>
                <text x="44" y="26" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif" fontSize="20" fontWeight="600" fill="#ffffff" letterSpacing="-0.5">Blueberry</text>
            </svg>
          </div>

          <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-7xl mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 leading-tight">
            Academic Excellence meets <br />
            <span className="text-blue-500">Gamified Learning</span>
          </h1>
          
          <p className="mt-4 text-xl leading-8 text-zinc-400 max-w-2xl">
            We bridge the gap between universities and playful coding. Instructors create custom curriculums, students master them through daily challenges.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/auth"
              className="w-full sm:w-auto rounded-full bg-white px-10 py-4 text-base font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all"
            >
              Start Learning Free
            </a>
            <a 
              href="/tutor"
              className="w-full sm:w-auto rounded-full border border-zinc-700 bg-zinc-900/50 px-10 py-4 text-base font-bold text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              For Educators <School size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* The Blueberry Difference */}
      <section className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-32 text-center z-10 border-t border-zinc-900">
        <div className="max-w-7xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-24">
            The Blueberry Difference
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 text-left">
            
            <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl hover:bg-zinc-900 transition-colors">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <School size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">University Integrated</h3>
              <p className="text-zinc-400 leading-relaxed">
                Not just random tutorials. Professors create courses based on <strong>your actual syllabus</strong>. Master your exams by playing every day.
              </p>
            </div>

            <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl hover:bg-zinc-900 transition-colors">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Rocket size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Creator Economy</h3>
              <p className="text-zinc-400 leading-relaxed">
                Are you an expert? Create high-quality public courses and <strong>earn a percentage</strong> of the revenue from active users.
              </p>
            </div>

            <div className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10 shadow-2xl hover:bg-zinc-900 transition-colors">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Gamified Grades</h3>
              <p className="text-zinc-400 leading-relaxed">
                Climb the leaderboard, earn XP, and unlock <strong>bonus points</strong> for your real-world grades through consistent practice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Built for Everyone Section */}
      <section className="flex w-full snap-start flex-col items-center justify-center bg-black px-4 py-32 text-center z-10 border-t border-zinc-900">
        <div className="max-w-4xl p-12 rounded-[40px] bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-8">
                    Coding for <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Everyone</span>
                </h2>
                <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                    Auch wenn du kein Student bist, kannst du uns nutzen. Wir sind eine Code-Learning-Plattform mit Challenges und Lernpfaden für alle – unser Hauptfokus ist es, jedem Programmieren beizubringen.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    <span>Self-Learners</span>
                    <span className="text-zinc-800">•</span>
                    <span>Hobbyists</span>
                    <span className="text-zinc-800">•</span>
                    <span>Career Changers</span>
                </div>
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black px-4 py-32 text-center overflow-hidden z-10 border-t border-zinc-900">
        <div className="max-w-6xl w-full">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-zinc-400 mb-20 text-lg">
            Invest in your future. Start for free, upgrade for mastery.
          </p>
          
          <div className="grid gap-8 sm:grid-cols-3 items-start">
             
             {/* Free Tier */}
             <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 flex flex-col items-center hover:border-zinc-700 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Student Basic</h3>
                <div className="text-4xl font-bold text-white mb-6">Free</div>
                <div className="w-full h-[1px] bg-zinc-800 mb-6" />
                <ul className="space-y-4 text-left w-full text-zinc-400 mb-8 flex-1">
                    <li className="flex items-center gap-3"><Hourglass size={18} className="text-blue-500" /> 10 Lives / day</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-zinc-600" /> Refill 1 life every 3h</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-zinc-600" /> Watch ads to refill</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-zinc-600" /> Access to all public courses</li>
                </ul>
                <a href="/auth" className="w-full rounded-xl border border-zinc-700 bg-transparent py-3 text-sm font-bold text-white hover:bg-zinc-800 transition-all">
                    Start Free
                </a>
             </div>

             {/* Pro Tier (Highlight) */}
             <div className="relative rounded-3xl border border-blue-500/50 bg-zinc-900/80 p-8 flex flex-col items-center shadow-2xl shadow-blue-900/20 transform sm:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Scholar</h3>
                <div className="text-4xl font-bold text-white mb-6">7,99€ <span className="text-lg text-zinc-500 font-normal">/mo</span></div>
                <div className="w-full h-[1px] bg-zinc-800 mb-6" />
                <ul className="space-y-4 text-left w-full text-zinc-300 mb-8 flex-1">
                    <li className="flex items-center gap-3"><Infinity size={18} className="text-blue-400" /> <strong>Unlimited Lives</strong></li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-blue-500" /> No Ads</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-blue-500" /> Offline Mode</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-blue-500" /> Priority Support</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-blue-500" /> Support your creators</li>
                </ul>
                <a href="/auth" className="w-full rounded-xl bg-white py-3 text-sm font-bold text-black hover:bg-zinc-200 transition-all">
                    Get Pro
                </a>
             </div>

             {/* Institution Tier */}
             <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 flex flex-col items-center hover:border-zinc-700 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Schools & Unis</h3>
                <div className="text-4xl font-bold text-white mb-6">Custom</div>
                <div className="w-full h-[1px] bg-zinc-800 mb-6" />
                <ul className="space-y-4 text-left w-full text-zinc-400 mb-8 flex-1">
                    <li className="flex items-center gap-3"><Infinity size={18} className="text-emerald-500" /> Unlimited Lives for all students</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-zinc-600" /> Custom Curriculum Dashboard</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-zinc-600" /> Detailed Analytics</li>
                    <li className="flex items-center gap-3"><Check size={18} className="text-zinc-600" /> SSO Integration</li>
                </ul>
                <a href="/contact" className="w-full rounded-xl border border-zinc-700 bg-transparent py-3 text-sm font-bold text-white hover:bg-zinc-800 transition-all">
                    Contact Sales
                </a>
             </div>

          </div>
        </div>
      </section>

      {/* Where do we operate */}
      <section className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black/80 px-4 py-32 text-center backdrop-blur-sm z-10 border-t border-zinc-900">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
            Global Presence
          </h2>
          <p className="text-zinc-400 mb-20 max-w-2xl text-lg">
            Proudly engineered in Germany, expanding to campuses worldwide.
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
                        <span className="text-sm font-medium text-emerald-500">HQ & Active</span>
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
      
      {/* Timeline Section */}
      <section className="flex min-h-screen w-full snap-start flex-col items-center justify-center bg-black/80 px-4 pt-32 pb-64 text-center backdrop-blur-sm z-10 border-t border-zinc-900">
        <div className="max-w-5xl w-full">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-24">
                Roadmap to Excellence
            </h2>

            <div className="relative">
                {/* Central Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-emerald-600 opacity-50" />

                <div className="flex flex-col gap-24 relative">
                    {/* Q1 2026 */}
                    <div className="flex items-center justify-between w-full flex-row-reverse">
                        <div className="w-5/12 flex justify-start">
                            <span className="text-sm font-bold tracking-wider text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full">
                                Q1 2026
                            </span>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <div className="w-4 h-4 rounded-full border-2 bg-black border-blue-500" />
                        </div>
                        <div className="w-5/12 text-right">
                            <div className="p-6 rounded-2xl border bg-zinc-900/40 border-zinc-800 hover:border-blue-500/30 transition-colors">
                                <h3 className="text-lg font-bold mb-2 text-white">First Prototype</h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    Initial release of the Blueberry learning platform engine.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Q2 2026 */}
                    <div className="flex items-center justify-between w-full">
                        <div className="w-5/12 flex justify-end">
                            <span className="text-sm font-bold tracking-wider text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full">
                                Q2 2026
                            </span>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <div className="w-4 h-4 rounded-full border-2 bg-black border-purple-500" />
                        </div>
                        <div className="w-5/12 text-left">
                            <div className="p-6 rounded-2xl border bg-zinc-900/40 border-zinc-800 hover:border-purple-500/30 transition-colors">
                                <h3 className="text-lg font-bold mb-2 text-zinc-200">First Beta Test</h3>
                                <p className="text-sm leading-relaxed text-zinc-500">
                                    Closed beta with partner universities in Germany.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Q3 2026 */}
                    <div className="flex items-center justify-between w-full flex-row-reverse">
                        <div className="w-5/12 flex justify-start">
                            <span className="text-sm font-bold tracking-wider text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full">
                                Q3 2026
                            </span>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <div className="w-4 h-4 rounded-full border-2 bg-black border-purple-500" />
                        </div>
                        <div className="w-5/12 text-right">
                            <div className="p-6 rounded-2xl border bg-zinc-900/40 border-zinc-800 hover:border-purple-500/30 transition-colors">
                                <h3 className="text-lg font-bold mb-2 text-zinc-200">Go Public</h3>
                                <p className="text-sm leading-relaxed text-zinc-500">
                                    Official launch for all students and public course creators.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Q4 2026 */}
                    <div className="flex items-center justify-between w-full">
                        <div className="w-5/12 flex justify-end">
                            <span className="text-sm font-bold tracking-wider text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full">
                                Q4 2026
                            </span>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <div className="w-4 h-4 rounded-full border-2 bg-black border-emerald-500" />
                        </div>
                        <div className="w-5/12 text-left">
                            <div className="p-6 rounded-2xl border bg-zinc-900/40 border-zinc-800 hover:border-emerald-500/30 transition-colors">
                                <h3 className="text-lg font-bold mb-2 text-zinc-200">Expansion</h3>
                                <p className="text-sm leading-relaxed text-zinc-500">
                                    Scaling to European universities and introducing mobile app.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Q1 2027 */}
                    <div className="flex items-center justify-between w-full flex-row-reverse">
                        <div className="w-5/12 flex justify-start">
                            <span className="text-sm font-bold tracking-wider bg-white text-black px-3 py-1 rounded-full shadow-lg">
                                Q1 2027
                            </span>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <div className="w-4 h-4 rounded-full border-2 bg-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </div>
                        <div className="w-5/12 text-right">
                            <div className="p-6 rounded-2xl border bg-zinc-900/80 border-blue-500/30 shadow-2xl shadow-blue-900/10">
                                <h3 className="text-lg font-bold mb-2 text-white">Mobile App</h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    <strong>Something Special is going to come for the World</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
