"use client";

import { useState } from "react";
import Globe from "@/components/Globe";
import FlipClock from "@/components/FlipClock";
import WeatherDisplay from "@/components/WeatherDisplay";
import AlarmManager from "@/components/AlarmManager";
import Stopwatch from "@/components/Stopwatch";
import WorldClocks from "@/components/WorldClocks";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800'
    }`}>
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-white/10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          World Clock Dashboard
        </h1>
        <Button
          onClick={toggleTheme}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </Button>
      </header>

      {/* Main Content - Horizontal Layout */}
      <main className="p-6 space-y-8">
        {/* Row 1: Globe, Main Clock, Weather */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-center">Interactive Globe</h2>
            <Globe />
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-center">Current Time</h2>
            <FlipClock />
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-center">Weather</h2>
            <WeatherDisplay />
          </div>
        </div>

        {/* Row 2: Alarms, Stopwatch, World Clocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-center">Alarms</h2>
            <AlarmManager />
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-center">Stopwatch</h2>
            <Stopwatch />
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-center">World Timezones</h2>
            <WorldClocks />
          </div>
        </div>
      </main>
    </div>
  );
}