import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="container mx-auto px-8 pt-[10rem] sm:pt-[15rem] pb-32 text-center relative animate-fade-in overflow-hidden">
            <div className="relative z-10">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-sm font-medium text-sky-300 bg-sky-500/10 border border-sky-400/20 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)] backdrop-blur-sm">
                    v1 now in alpha
                </div>
                <h1 className="text-4xl md:text-[4.5rem] font-extrabold leading-[1.1] mb-10 tracking-tight">
                    The <span className="gradient-text text-glow">Portable JavaScript Runtime.</span>
                </h1>
                <p className="text-xl md:text-2xl max-w-[800px] mx-auto mb-14 text-white/70 leading-relaxed font-sans">
                    FullStacked is a single environment that runs JavaScript and TypeScript projects supporting both <b>Browser and Node.js APIs</b> within the same file. Skip the server and ship straight to the user. Build locally, share with Git, and run everything on-device without any cloud infrastructure.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <a href="#how-it-works" className="btn-primary w-full md:w-auto text-center inline-block">Get Started</a>
                    <a href="https://fullstacked.notion.site/FullStacked-v1-21d47d89d19a80429cb2f85dcf71fdc9" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full md:w-auto text-center inline-block">Track Progress</a>
                </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[150vw] sm:max-w-[100vw] h-[60vh] sm:h-[80vh] bg-[radial-gradient(circle,rgba(14,165,233,0.1)_0%,transparent_70%)] pointer-events-none -z-0"></div>
        </section>
    );
};

export default Hero;
