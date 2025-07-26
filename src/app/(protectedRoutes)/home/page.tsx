import {TrendingUp, Users, Briefcase, UserCheck, Target, Calendar, MessageSquare } from "lucide-react";
import FeatureCard from "./_components/FeatureCard";
import FeatureSectionLayout from "./_components/FeatureSectionLayout";
import Image from "next/image";
import { potentialCustomer } from "@/lib/data";
import UserInfoCard from "@/components/ui/ReusableComponents/UserInfoCard";

const HomePage = () => {
    return (
        <div className="w-full mx-auto h-full space-y-12 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden min-h-screen">
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
            </div>
            
            <div className="relative z-10 p-6">
            {/* Hero Section */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12">
                <div className="space-y-8 flex-1">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-200/30 dark:border-emerald-700/30 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
                            <span className="text-sm font-medium text-slate-700 dark:text-emerald-300">AI-Powered Hiring & Collaboration</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 dark:from-emerald-100 dark:via-emerald-200 dark:to-teal-200 bg-clip-text text-transparent leading-tight">
                            Revolutionize How You Hire & Collaborate
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-emerald-400 max-w-2xl">
                            Leverage AI-powered interview bots and real-time intelligence to transform candidate screening and maximize hiring success rates.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 place-content-center w-full lg:w-auto">
                    <FeatureCard
                        Icon={<UserCheck className="w-12 h-12 text-emerald-600 dark:text-emerald-400"/>}
                        heading="AI Interview Bots"
                        description="Intelligent voice conversations that screen candidates and assess qualifications"
                        link="#"
                    />
                    <FeatureCard
                        Icon={<Users className="w-12 h-12 text-teal-600 dark:text-teal-400"/>}
                        heading="Virtual Collaboration"
                        description="Live meetings and job fairs that adapt to each participant's journey"
                        link="/webinars"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200/30 dark:border-emerald-700/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-500/20">
                            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400"/>
                        </div>
                        <div>
                            {/* <p className="text-2xl font-bold text-slate-800 dark:text-emerald-100">2.4K</p> */}
                            <p className="text-sm text-slate-600 dark:text-emerald-300">Total Hires</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-200/30 dark:border-teal-700/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-teal-500/20">
                            <Users className="w-6 h-6 text-teal-600 dark:text-teal-400"/>
                        </div>
                        <div>
                            {/* <p className="text-2xl font-bold text-slate-800 dark:text-teal-100">15.2K</p> */}
                            <p className="text-sm text-slate-600 dark:text-teal-300">Active Candidates</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200/30 dark:border-emerald-700/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-500/20">
                            <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400"/>
                        </div>
                        <div>
                            {/* <p className="text-2xl font-bold text-slate-800 dark:text-emerald-100">98%</p> */}
                            <p className="text-sm text-slate-600 dark:text-emerald-300">Interview Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FeatureSectionLayout
                    heading="AI-Powered Candidate Intelligence"
                    link="/lead"
                >
                    <div className="p-6 flex flex-col gap-6 items-start border rounded-3xl border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <div className="w-full flex justify-between items-center gap-3"> 
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Successful Hires</p>
                            <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                                <p className="text-sm font-medium text-green-700 dark:text-green-400">50</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 items-start w-full">
                            {
                                Array.from({length: 3}).map((_, index) => (
                                    <div key={index} className="w-full group hover:scale-105 transition-all duration-300">
                                        <Image
                                            src='/featurecard.png'
                                            alt='Conversion card'
                                            width={250}
                                            height={250}
                                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </FeatureSectionLayout>

                <FeatureSectionLayout
                    heading='Conversion Pipeline Tracking'
                    link='/pipeline'
                >
                    <div className="flex gap-4 items-center h-full w-full justify-center relative flex-wrap">
                        {
                            potentialCustomer.slice(0, 2).map((customer, index) => (
                                <UserInfoCard
                                    customer={customer}
                                    tags={customer.tags}
                                    key={index}
                                />
                            ))
                        }

                        <Image
                            src={'/glowCard.png'}
                            alt='Info-card'
                            width={350}
                            height={350}
                            className="object-cover rounded-3xl absolute px-25 mb-28 hidden sm:flex backdrop-blur-[20px] shadow-2xl"
                        />
                    </div>
                </FeatureSectionLayout>
            </div>
            </div>
        </div>
    )
}

export default HomePage;