import React from "react";
import cloudImg from "../cloud.png";

const Cloud: React.FC = () => {
    return (
        <section id="cloud" className="w-full relative py-24 overflow-hidden">
            {/* Refined Background Design */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.08),transparent_70%)] pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            {/* Faint Glowing Accents */}
            <div className="absolute top-1/3 -left-20 w-64 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent rotate-12 blur-sm pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent -rotate-12 blur-md pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-20 relative z-10">
                <div className="flex-1 space-y-6 text-left animate-fade-in flex flex-col justify-center">
                    <div className="self-start inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-semibold text-sm mb-2 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                        FullStacked Cloud
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Cloud <span className="text-sky-400">Platform</span>
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed font-sans max-w-xl">
                        Projects built with FullStacked are inherently local-first and distributed. The FullStacked Cloud Platform elevates the experience of FullStacked to a pro level, providing secure access and management of your projects and other services like databases, LLMs, S3 storage, MQTT, and much more.
                    </p>
                    <div className="pt-2">
                        <a href="https://auth.fullstacked.cloud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-medium transition-colors shadow-lg shadow-sky-500/20 self-start group/cta">
                            Access FullStacked Cloud
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover/cta:translate-x-1">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex-1 w-full lg:max-w-[50%] relative">
                    <img
                        src={cloudImg}
                        alt="FullStacked Cloud"
                        className="w-full h-auto lg:min-w-[50vw] object-contain relative z-10 transition-all duration-500 hover:-translate-y-2"
                    />
                </div>
            </div>
        </section>
    );
};

export default Cloud;
