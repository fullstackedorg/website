import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Cloud from "./components/Cloud";
import Download from "./components/Download";
import Footer from "./components/Footer";
import "./styles/index.css";

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#020617] selection:bg-sky-500/30">
            <Navbar />
            <main className="flex-grow overflow-hidden">
                <Hero />
                <HowItWorks />
                <Download />
                <Cloud />
            </main>
            <Footer />
        </div>
    );
};

export default App;
