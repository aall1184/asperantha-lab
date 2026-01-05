"use client";
import { useState } from "react";

const questions = [
  {
    id: 1,
    text: "عن ماذا تبحث في فنجانك القادم؟",
    options: [
      { text: "وضوح النكهات وعذوبة المذاق", score: "drip" },
      { text: "كثافة القوام وعمق التركيز", score: "espresso" }
    ]
  },
  {
    id: 2,
    text: "ما هو الوقت المفضل لمختبرك الخاص؟",
    options: [
      { text: "إشراقة الصباح الهادئة", score: "drip" },
      { text: "انعزال المساء الملهم", score: "espresso" }
    ]
  }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ drip: 0, espresso: 0 });

  const handleAnswer = (type: string) => {
    setScores({ ...scores, [type]: scores[type as keyof typeof scores] + 1 });
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(2);
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* دوائر الإضاءة الخلفية (Professional Ambient Lighting) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-900/20 blur-[150px] rounded-full opacity-50"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-700/10 blur-[130px] rounded-full opacity-30"></div>

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* 1. الشاشة الرئيسية */}
        {step === 0 && (
          <div className="text-center space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="space-y-4">
              <h2 className="text-amber-600 tracking-[0.6em] text-[10px] uppercase font-medium">Asperanza Digital Lab</h2>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                ASPERANZA
              </h1>
              <p className="text-gray-400 font-light text-lg max-w-md mx-auto leading-relaxed">
                مختبر هندسة الذائقة؛ حيث نعتني بكيمياء القهوة لتناسب لحظاتك.
              </p>
            </div>
            
            <button 
              onClick={() => setStep(1)}
              className="px-14 py-5 bg-white text-black font-bold text-xs tracking-[0.2em] rounded-full hover:bg-amber-600 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-amber-600/40"
            >
              دخول المختبر
            </button>
          </div>
        )}

        {/* 2. شاشة الأسئلة (Glassmorphism Design) */}
        {step === 1 && (
          <div className="animate-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] flex-1 bg-white/10"></div>
                <span className="text-amber-600 text-[10px] tracking-[0.4em] font-bold">LAB TEST {currentQ + 1}</span>
                <div className="h-[1px] flex-1 bg-white/10"></div>
              </div>

              <h2 className="text-3xl font-medium text-center mb-12 leading-snug">
                {questions[currentQ].text}
              </h2>

              <div className="grid gap-5">
                {questions[currentQ].options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(opt.score)}
                    className="group relative p-6 text-right rounded-2xl border border-white/5 bg-white/[0.02] hover:border-amber-600/40 hover:bg-amber-600/[0.05] transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">{opt.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-l from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. شاشة النتيجة (The Final Certificate) */}
        {step === 2 && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
            <div className="inline-block p-2 px-4 rounded-full bg-amber-600/10 border border-amber-600/20 mb-4">
               <span className="text-amber-500 text-[9px] tracking-[0.3em] font-bold uppercase">Result Analysis</span>
            </div>
            
            <h3 className="text-2xl font-light text-gray-400">فنجانك المقترح هو:</h3>
            
            <div className="py-10">
               <h4 className="text-7xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                  {scores.drip >= scores.espresso ? "V60 DRIP" : "FLAT WHITE"}
               </h4>
               <p className="mt-6 text-gray-500 font-light tracking-widest text-sm italic">
                  "تم تحليل ذائقتك بدقة في مختبرات اسبرنثا"
               </p>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="mt-12 text-[10px] tracking-[0.4em] text-gray-600 hover:text-white transition-colors uppercase border-b border-gray-900 hover:border-white pb-2"
            >
              إعادة الاختبار
            </button>
          </div>
        )}

      </div>
    </main>
  );
} 