import React, { useState } from "react";

const CodeWindow: React.FC<{ title: string; children: React.ReactNode; rawCode: string }> = ({ title, children, rawCode }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#060a15] shadow-2xl relative w-full group transition-all duration-300 hover:border-sky-500/50 hover:shadow-sky-500/10 hover:-translate-y-1">
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10 relative">
                <div className="flex gap-2 absolute left-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-white/50">{title}</div>
                <button
                    onClick={handleCopy}
                    className="absolute right-4 text-white/40 hover:text-white transition-colors"
                    aria-label="Copy to clipboard"
                    title="Copy code"
                >
                    {copied ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-400">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    )}
                </button>
            </div>
            <div className="p-5 font-mono text-[0.85rem] sm:text-sm overflow-x-auto text-left whitespace-pre leading-relaxed text-white/90">
                {children}
            </div>
        </div>
    );
};

const StepRow: React.FC<{
    number: string;
    title: string;
    description: React.ReactNode;
    codeBlock: React.ReactNode;
}> = ({ number, title, description, codeBlock }) => (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 py-16 border-b border-white/5 last:border-0 animate-fade-in opacity-0 [animation-fill-mode:forwards]">
        <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-400 font-bold text-xl mb-2 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                {number}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h3>
            <div className="text-lg text-white/60 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 space-y-4">
                {typeof description === 'string' ? <p>{description}</p> : description}
            </div>
        </div>
        <div className="flex-1 w-full max-w-2xl">
            {codeBlock}
        </div>
    </div>
);

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="container mx-auto px-8 py-24 relative">
            <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Get <span className="text-sky-400">Started</span></h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">Build locally, push to Git, and run directly on any device.</p>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col">
                <StepRow
                    number="1"
                    title="Install FullStacked"
                    description="Initialize your JavaScript or TypeScript project and install the FullStacked runtime package."
                    codeBlock={
                        <CodeWindow title="terminal" rawCode="npm i fullstacked@alpha">
                            <span className="text-sky-400">$</span> npm i fullstacked@alpha
                        </CodeWindow>
                    }
                />

                <StepRow
                    number="2"
                    title="Build"
                    description="Develop your project seamlessly by combining Node.js and Browser APIs within the same environment."
                    codeBlock={
                        <CodeWindow title="index.tsx" rawCode={`import React from "react";
import { createRoot } from "react-dom/client";
import fs from "node:fs";

function App() {
  const message = fs.readFileSync("message.txt", "utf8");
  return <h1>{message}</h1>;
}

const root = document.createElement("div");
document.body.append(root);
createRoot(root).render(<App />);`}>
                            <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-emerald-300">"react"</span>;{"\n"}
                            <span className="text-pink-400">import</span> {"{ createRoot }"} <span className="text-pink-400">from</span> <span className="text-emerald-300">"react-dom/client"</span>;{"\n"}
                            <span className="text-pink-400">import</span> {"fs"} <span className="text-pink-400">from</span> <span className="text-emerald-300">"node:fs"</span>;{"\n\n"}
                            <span className="text-pink-400">function</span> <span className="text-sky-200">App</span>() {"{"}{"\n"}
                            {"  "}<span className="text-sky-300">const</span> message = fs.<span className="text-sky-200">readFileSync</span>(<span className="text-emerald-300">"message.txt"</span>, <span className="text-emerald-300">"utf8"</span>);{"\n"}
                            {"  "}<span className="text-pink-400">return</span> <span className="text-white/50">&lt;</span><span className="text-sky-300">h1</span><span className="text-white/50">&gt;</span>{"{"}message{"}"}<span className="text-white/50">&lt;/</span><span className="text-sky-300">h1</span><span className="text-white/50">&gt;</span>;{"\n"}
                            {"}\n\n"}
                            <span className="text-sky-300">const</span> root = document.<span className="text-sky-200">createElement</span>(<span className="text-emerald-300">"div"</span>);{"\n"}
                            document.body.<span className="text-sky-200">append</span>(root);{"\n"}
                            <span className="text-sky-200">createRoot</span>(root).<span className="text-sky-200">render</span>(<span className="text-white/50">&lt;</span><span className="text-sky-300">App</span> <span className="text-white/50">/&gt;</span>);{"\n"}
                        </CodeWindow>
                    }
                />

                <StepRow
                    number="3"
                    title="Run Locally"
                    description="Run and test locally using the FullStacked command."
                    codeBlock={
                        <CodeWindow title="terminal" rawCode="npx fullstacked">
                            <span className="text-sky-400">$</span> npx fullstacked
                        </CodeWindow>
                    }
                />

                <StepRow
                    number="4"
                    title="Push to Git"
                    description="Push your code directly to any Git repository. No complex CI/CD pipelines or cloud deployments required."
                    codeBlock={
                        <CodeWindow title="terminal" rawCode={`git commit -am "my awesome commit"
git push`}>
                            <span className="text-sky-400">$</span> git commit -am <span className="text-emerald-300">"my awesome commit"</span>{"\n"}
                            <span className="text-sky-400">$</span> git push
                        </CodeWindow>
                    }
                />

                <StepRow
                    number="5"
                    title="Pull & Run Anywhere"
                    description={
                        <>
                            <p>Open the FullStacked app on your device, clone/pull your repository, and run your project directly.</p>
                            <p>FullStacked v1 is currently available on <a href="https://testflight.apple.com/join/CUYvvR4b" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">TestFlight</a> for iPadOS and iOS.</p>
                            <p>We are currently experiencing Review Wait Time issues with the macOS app on TestFlight. In the meantime, you can <a href="https://files.fullstacked.org/fullstacked-v1-1589.zip" className="text-sky-400 hover:underline">download the macOS app directly here</a>.</p>
                            <p>Android, Windows, and Linux coming soon!</p>
                        </>
                    }
                    codeBlock={
                        <CodeWindow title="FullStacked App" rawCode={`git clone my-awesome-project
cd my-awesome-project
npm install
fullstacked`}>
                            <span className="text-white/40 italic"># Open the FullStacked app on your device</span>{"\n"}
                            <span className="text-sky-400">$</span> git clone my-awesome-project{"\n"}
                            <span className="text-sky-400">$</span> cd my-awesome-project{"\n"}
                            <span className="text-sky-400">$</span> npm install{"\n"}
                            <span className="text-sky-400">$</span> fullstacked
                        </CodeWindow>
                    }
                />
            </div>
        </section>
    );
};

export default HowItWorks;
