import Link from "next/link";
import { ArrowRight, Play, Users, TrendingUp, Briefcase, UserCheck, Calendar, MessageSquare, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Briefcase className="w-16 h-16 text-emerald-600 rotate-12" />
        </div>
        <div className="absolute top-40 right-32">
          <UserCheck className="w-12 h-12 text-teal-600 -rotate-12" />
        </div>
        <div className="absolute top-60 left-1/4">
          <Calendar className="w-14 h-14 text-emerald-500 rotate-45" />
        </div>
        <div className="absolute bottom-40 right-20">
          <MessageSquare className="w-18 h-18 text-teal-500 -rotate-12" />
        </div>
        <div className="absolute bottom-60 left-16">
          <Target className="w-10 h-10 text-emerald-400 rotate-12" />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <Users className="w-20 h-20 text-teal-400 rotate-6" />
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <Zap className="w-8 h-8 text-emerald-600 -rotate-45" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:p-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-200/30 dark:border-emerald-700/30">
            <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-emerald-100">WorkCast</span>
        </div>
        <Link 
          href="/sign-in"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-200/40 dark:border-emerald-700/40 text-slate-800 dark:text-emerald-100 font-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:from-emerald-500/25 hover:to-teal-500/25"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 lg:px-20 text-center space-y-12 relative z-10">
        <div className="space-y-8 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-200/40 dark:border-emerald-700/40 backdrop-blur-sm">
            <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-emerald-200">AI-Powered Hiring & Collaboration Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 dark:from-emerald-100 dark:via-emerald-200 dark:to-teal-200 bg-clip-text text-transparent leading-tight">
            Transform Every Candidate
            <span className="block">Into a Perfect Hire</span>
          </h1>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-emerald-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionize hiring and team collaboration with AI-powered interview bots, real-time candidate tracking, and intelligent assessment tools that turn every interaction into a successful hire.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              href="/sign-up"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <button className="group px-8 py-4 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 bg-emerald-50/50 dark:bg-emerald-900/30 backdrop-blur-sm text-slate-800 dark:text-emerald-100 font-semibold hover:bg-emerald-100/60 dark:hover:bg-emerald-900/50 transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="text-center space-y-2 p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-slate-800 dark:text-emerald-100">15K+</div>
            <div className="text-slate-600 dark:text-emerald-300">Active Candidates</div>
          </div>
          <div className="text-center space-y-2 p-6 rounded-2xl bg-teal-50/50 dark:bg-teal-900/20 border border-teal-200/30 dark:border-teal-700/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-slate-800 dark:text-teal-100">98%</div>
            <div className="text-slate-600 dark:text-teal-300">Interview Success Rate</div>
          </div>
          <div className="text-center space-y-2 p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 backdrop-blur-sm">
            <div className="text-3xl font-bold text-slate-800 dark:text-emerald-100">2.4K</div>
            <div className="text-slate-600 dark:text-emerald-300">Successful Hires</div>
          </div>
        </div>

        {/* Waitlist */}
        {/* <div className="pt-12">
          <Waitlist />
        </div> */}
      </main>

      {/* Features Preview */}
      <section className="py-20 px-6 lg:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-emerald-100">
              AI-Powered Hiring Experience
            </h2>
            <p className="text-lg text-slate-600 dark:text-emerald-300 max-w-2xl mx-auto">
              From AI interview bots to real-time candidate tracking, we deliver the future of hiring and workplace collaboration with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-900/20 backdrop-blur-sm border border-emerald-200/40 dark:border-emerald-700/40 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <div className="p-4 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/20 w-fit mb-6">
                <UserCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-emerald-100 mb-4">AI Interview Bots</h3>
              <p className="text-slate-600 dark:text-emerald-300">Intelligent voice conversations that screen candidates and assess qualifications in real-time.</p>
            </div>

            <div className="p-8 rounded-3xl bg-teal-50/60 dark:bg-teal-900/20 backdrop-blur-sm border border-teal-200/40 dark:border-teal-700/40 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <div className="p-4 rounded-2xl bg-teal-500/15 dark:bg-teal-500/20 w-fit mb-6">
                <TrendingUp className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-teal-100 mb-4">Candidate Intelligence</h3>
              <p className="text-slate-600 dark:text-teal-300">AI-powered analytics that predict candidate fit and optimize hiring decisions.</p>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-900/20 backdrop-blur-sm border border-emerald-200/40 dark:border-emerald-700/40 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <div className="p-4 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/20 w-fit mb-6">
                <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-emerald-100 mb-4">Team Collaboration</h3>
              <p className="text-slate-600 dark:text-emerald-300">Virtual meeting spaces and collaboration tools that adapt to each team&apos;s unique workflow and preferences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
