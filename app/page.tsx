"use client";
import { useState, useEffect } from "react";

// تعريف أنواع البن في المختبر
const BEANS = {
  A: "Ethiopian (Aricha)", // يمثل الحمضية والفاكهية
  B: "Brazilian (Santos)"  // يمثل القوام والشكولاتة
};

const questions = [
  { id: 1, text: "كيف تفضل بداية يومك؟", options: [{ t: "انتعاش وحيوية", s: "A" }, { t: "هدوء وعمق", s: "B" }] },
  { id: 2, text: "ما هو الإيحاء المفضل لديك؟", options: [{ t: "ياسمين وفواكه", s: "A" }, { t: "مكسرات وكاكاو", s: "B" }] },
  { id: 3, text: "درجة حمضية القهوة بالنسبة لك؟", options: [{ t: "بارزة وممتعة", s: "A" }, { t: "منخفضة ومتزنة", s: "B" }] },
  { id: 4, text: "قوام القهوة (Body) المفضل؟", options: [{ t: "خفيف وحريري", s: "A" }, { t: "ثقيل وكريمي", s: "B" }] },
  { id: 5, text: "كيف تشرب قهوتك غالباً؟", options: [{ t: "سوداء صافية", s: "A" }, { t: "مع حليب أو مكثفة", s: "B" }] },
  { id: 6, text: "بعد التذوق، ما الذي يهمك أكثر؟", options: [{ t: "ما بعد الطعم (Aftertaste) المطول", s: "A" }, { t: "المرارة اللطيفة والمتزنة", s: "B" }] },
  { id: 7, text: "درجة التحميص المفضلة؟", options: [{ t: "فاتحة (Light)", s: "A" }, { t: "متوسطة (Medium)", s: "B" }] },
  { id: 8, text: "الهدف من الكوب الآن؟", options: [{ t: "تذوق وتجربة سلالة", s: "A" }, { t: "تعديل مزاج وتركيز", s: "B" }] }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [ratioA, setRatioA] = useState(50); // البن الأثيوبي
  const [ratioB, setRatioB] = useState(50); // البن البرازيلي

  const handleAnswer = (type: string) => {
    if (type === "A") {
      setRatioA(prev => Math.min(prev + 10, 100));
      setRatioB(prev => Math.max(prev - 10, 0));
    } else {
      setRatioB(prev => Math.min(prev + 10, 100));
      setRatioA(prev => Math.max(prev - 10, 0));
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(2);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-amber-500">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/10 blur-[150px] rounded-full"></div>
      </div>

      {step === 0 && (
        <div className="text-center space-y-8 animate-in fade-in duration-1000">
          <h2 className="text-amber-600 tracking-[0.8em] text-[10px] font-bold">ASPERANZA LAB v2.0</h2>
          <h1 className="text-7xl font-black tracking-tighter italic">THE BLENDING ENGINE</h1>
          <p className="text-gray-500 max-w-sm mx-auto font-light leading-relaxed text-sm">أجب على 8 أسئلة مخبرية لنصمم لك نسب الـ Blend المثالية لذائقتك.</p>
          <button onClick={() => setStep(1)} className="px-12 py-4 bg-white text-black text-[10px] tracking-[0.3em] font-bold rounded-full hover:bg-amber-600 hover:text-white transition-all duration-500">START ANALYSIS</button>
        </div>
      )}

      {step === 1 && (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in slide-in-from-bottom-10 duration-700">
          
          {/* Left Side: Question */}
          <div className="space-y-10">
            <div className="space-y-2">
              <span className="text-amber-600 font-mono text-xs">PHASE 0{currentQ + 1}</span>
              <h2 className="text-4xl font-medium leading-tight">{questions[currentQ].text}</h2>
            </div>
            <div className="grid gap-4">
              {questions[currentQ].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.s)} className="w-full p-6 text-right border border-white/5 bg-white/[0.03] rounded-2xl hover:border-amber-600/50 hover:bg-amber-600/5 transition-all group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">{opt.t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Real-time Blending Meter */}
          <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] backdrop-blur-3xl space-y-8">
            <h3 className="text-center text-[10px] tracking-[0.4em] text-gray-500 uppercase">Live Blending Ratio</h3>
            
            <div className="flex justify-between items-end h-64 gap-4">
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-amber-600/20 rounded-t-2xl relative overflow-hidden transition-all duration-700" style={{ height: `${ratioA}%` }}>
                  <div className="absolute inset-0 bg-amber-600 animate-pulse opacity-50"></div>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{BEANS.A}</span>
                <span className="text-2xl font-bold">{ratioA}%</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full bg-white/10 rounded-t-2xl relative overflow-hidden transition-all duration-700" style={{ height: `${ratioB}%` }}>
                  <div className="absolute inset-0 bg-white/20"></div>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{BEANS.B}</span>
                <span className="text-2xl font-bold">{ratioB}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center space-y-10 animate-in zoom-in duration-700">
          <div className="space-y-4">
            <h2 className="text-amber-500 tracking-[0.5em] text-[10px] font-bold">ANALYSIS COMPLETE</h2>
            <h3 className="text-6xl font-black italic">YOUR CUSTOM BLEND</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="p-10 border border-amber-600/30 bg-amber-600/5 rounded-[2rem]">
              <span className="text-5xl font-bold block mb-2 text-amber-500">{ratioA}%</span>
              <span className="text-xs tracking-widest text-gray-400 uppercase">{BEANS.A}</span>
            </div>
            <div className="text-2xl text-gray-700">+</div>
            <div className="p-10 border border-white/10 bg-white/5 rounded-[2rem]">
              <span className="text-5xl font-bold block mb-2 text-white">{ratioB}%</span>
              <span className="text-xs tracking-widest text-gray-400 uppercase">{BEANS.B}</span>
            </div>
          </div>

          <p className="max-w-md mx-auto text-gray-500 font-light italic leading-relaxed">"هذا المزيج صُمم برمجياً ليتوافق مع معايير ذائقتك التي تم تحليلها عبر 8 مراحل مخبرية."</p>
          
          <button onClick={() => window.location.reload()} className="text-[10px] tracking-[0.4em] text-gray-600 hover:text-white transition-colors border-b border-gray-900 hover:border-white pb-2">NEW ANALYSIS</button>
        </div>
      )}
    </main>
  );
}