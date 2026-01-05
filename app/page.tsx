"use client";
import { useState, useEffect } from "react";

const BEANS = {
  A: { name: "ETHIOPIAN V60", color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/20" },
  B: { name: "COLOMBIAN DRIP", color: "from-blue-600 to-indigo-600", shadow: "shadow-blue-600/20" },
  C: { name: "BRAZILIAN BODY", color: "from-indigo-600 to-purple-600", shadow: "shadow-indigo-600/20" },
  D: { name: "INDONESIAN DARK", color: "from-purple-600 to-fuchsia-600", shadow: "shadow-fuchsia-600/20" }
};

const questions = [
  { id: 1, text: "تحديد نمط الاستيقاظ (Wake-up Pattern)؟", options: [{ t: "نشاط فوري خارق", s: "A" }, { t: "استيعاب تدريجي هادئ", s: "B" }, { t: "تركيز عميق ومنعزل", s: "C" }, { t: "طاقة للعمل الشاق", s: "D" }] },
  { id: 2, text: "برمجة النكهة (Flavor Programming)؟", options: [{ t: "حمضيات منعشة", s: "A" }, { t: "حلاوة فاكهية", s: "B" }, { t: "مكسرات وكاكاو", s: "C" }, { t: "ترابية وتابلية", s: "D" }] },
  { id: 3, text: "كثافة البيانات (Body Density)؟", options: [{ t: "01 - خفيف جداً", s: "A" }, { t: "02 - متوسط", s: "B" }, { t: "03 - كثيف", s: "C" }, { t: "04 - مركز جداً", s: "D" }] },
  { id: 4, text: "مستوى التحميص المعالج (Roast Level)؟", options: [{ t: "LIGHT CORE", s: "A" }, { t: "MEDIUM CORE", s: "B" }, { t: "MEDIUM-DARK", s: "C" }, { t: "DARK CORE", s: "D" }] },
  { id: 5, text: "بيئة التحضير المفضلة؟", options: [{ t: "مختبر منزلي هادئ", s: "A" }, { t: "مقهى عملي سريع", s: "B" }, { t: "تحضير يدوي كلاسيكي", s: "C" }, { t: "ماكينة إسبريسو قوية", s: "D" }] },
  { id: 6, text: "تأثير ما بعد الرشفة (Output)؟", options: [{ t: "صفاء ذهني", s: "A" }, { t: "تعديل مزاج", s: "B" }, { t: "يقظة مستمرة", s: "C" }, { t: "استمتاع بالمذاق", s: "D" }] },
  { id: 7, text: "درجة الحرارة المستهدفة؟", options: [{ t: "باردة جداً (ICE)", s: "A" }, { t: "ساخنة معتدلة", s: "B" }, { t: "حرارة مرتفعة", s: "C" }, { t: "بدرجة حرارة الغرفة", s: "D" }] },
  { id: 8, text: "الهدف النهائي من المعالجة؟", options: [{ t: "إلهام وإبداع", s: "A" }, { t: "استرخاء عضلي", s: "B" }, { t: "تنفيذ مهام", s: "C" }, { t: "تواصل اجتماعي", s: "D" }] }
];

export default function Home() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(0); 
  const [currentQ, setCurrentQ] = useState(0);
  const [ratios, setRatios] = useState({ A: 25, B: 25, C: 25, D: 25 });
  const [blendCode, setBlendCode] = useState("");

  const handleAnswer = (s: string) => {
    const updated = { ...ratios };
    const type = s as keyof typeof ratios;
    updated[type] = Math.min(updated[type] + 15, 85);
    const sumOthers = 100 - updated[type];
    const otherKeys = (Object.keys(updated) as Array<keyof typeof ratios>).filter(k => k !== type);
    otherKeys.forEach(k => updated[k] = sumOthers / 3);
    
    setRatios(updated);
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else {
      setBlendCode(`#${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`);
      setStep(3);
    }
  };

  return (
    <main className="min-h-screen bg-[#000] text-[#e0e0e0] p-6 font-mono selection:bg-cyan-500/30">
      {/* AI Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="fixed inset-0 bg-radial-at-t from-cyan-900/20 via-black to-black"></div>

      <div className="relative z-10 max-w-5xl mx-auto min-h-screen flex flex-col items-center justify-center">
        
        {step === 0 && (
          <div className="text-center space-y-10 animate-pulse">
            <h2 className="text-cyan-500 text-xs tracking-[1em] mb-4">SYSTEM INITIALIZATION</h2>
            <h1 className="text-6xl font-thin tracking-tighter text-white uppercase">Asperanza <span className="font-bold text-cyan-400">Core</span></h1>
            <div className="relative group">
               <input 
                type="text" 
                placeholder="Identify Operator..." 
                className="bg-transparent border border-cyan-500/30 p-5 w-72 text-center focus:border-cyan-400 transition-all outline-none rounded-sm uppercase text-sm tracking-widest"
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className="absolute -inset-1 bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <button onClick={() => userName && setStep(1)} className="block mx-auto px-10 py-3 border border-cyan-500 text-cyan-500 text-[10px] hover:bg-cyan-500 hover:text-black transition-all">CONNECT</button>
          </div>
        )}

        {step === 1 && (
          <div className="text-center space-y-8 animate-in fade-in duration-1000">
            <h2 className="text-3xl font-light tracking-widest uppercase">Operator: <span className="text-cyan-400">{userName}</span></h2>
            <p className="text-cyan-500/50 text-xs">Access Granted. Calibrating taste sensors...</p>
            <button onClick={() => setStep(2)} className="px-12 py-4 bg-cyan-500 text-black text-[10px] font-bold tracking-[0.5em] hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]">START ANALYSIS</button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12 animate-in slide-in-from-left-10 duration-700">
              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 text-cyan-500 text-[9px]">PROCESS_STAGE_0{currentQ + 1}</div>
              <h2 className="text-3xl font-bold uppercase tracking-tighter leading-none text-white">{questions[currentQ].text}</h2>
              <div className="grid gap-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-5 border border-white/5 bg-white/[0.02] hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left text-xs tracking-widest group flex justify-between items-center">
                    <span>{opt.t}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-cyan-400">-{">"}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-black border border-cyan-500/20 p-10 rounded-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/30 animate-scan"></div>
               <h3 className="text-[10px] text-cyan-500/50 mb-10 tracking-[0.3em]">REAL-TIME_DATA_STREAM</h3>
               <div className="space-y-8">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-gray-500">{BEANS[key].name}</span>
                        <span className="text-cyan-400">{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-[2px] bg-white/5 w-full relative">
                        <div className={`h-full bg-gradient-to-r ${BEANS[key].color} transition-all duration-700`} style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-12 animate-in zoom-in duration-700 w-full max-w-3xl">
            <h2 className="text-cyan-500 text-[10px] tracking-[1em] font-bold">DNA_EXTRACTION_COMPLETE</h2>
            <h1 className="text-7xl font-black italic tracking-tighter text-white uppercase">{userName}_V1.0</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-6 border border-cyan-500/20 bg-cyan-950/10 group hover:border-cyan-500/50 transition-all">
                  <span className="text-3xl font-bold block mb-1 text-white">{Math.round(ratios[key])}%</span>
                  <span className="text-[8px] text-cyan-600 tracking-widest uppercase">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="p-10 border border-cyan-500/50 bg-black relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-cyan-500 text-[9px] tracking-widest">UNIQUE_ACCESS_KEY</span>
              <div className="text-5xl font-mono font-bold text-white tracking-widest">{blendCode}</div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button onClick={() => window.location.reload()} className="px-10 py-4 bg-cyan-500 text-black text-[10px] font-bold tracking-widest hover:bg-cyan-400 transition-all">REBOOT_SYSTEM</button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 3s linear infinite;
        }
      `}</style>
    </main>
  );
} 