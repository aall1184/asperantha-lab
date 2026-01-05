"use client";
import { useState } from "react";

const BEANS = {
  A: { name: "ETHIOPIAN V60", color: "bg-cyan-500", text: "text-cyan-400" },
  B: { name: "COLOMBIAN DRIP", color: "bg-blue-600", text: "text-blue-400" },
  C: { name: "BRAZILIAN BODY", color: "bg-indigo-600", text: "text-indigo-400" },
  D: { name: "INDONESIAN DARK", color: "bg-purple-600", text: "text-purple-400" }
};

const questions = [
  { id: 1, text: "تحديد نمط الاستيقاظ (Wake-up Pattern)؟", options: [{ t: "نشاط فوري خارق", s: "A" }, { t: "استيعاب تدريجي هادئ", s: "B" }, { t: "تركيز عميق ومنعزل", s: "C" }, { t: "طاقة للعمل الشاق", s: "D" }] },
  { id: 2, text: "برمجة النكهة (Flavor Programming)؟", options: [{ t: "حمضيات منعشة", s: "A" }, { t: "حلاوة فاكهية", s: "B" }, { t: "مكسرات وكاكاو", s: "C" }, { t: "ترابية وتابلية", s: "D" }] },
  { id: 3, text: "كثافة البيانات (Body Density)؟", options: [{ t: "خفيف جداً", s: "A" }, { t: "متوسط", s: "B" }, { t: "كثيف", s: "C" }, { t: "مركز جداً", s: "D" }] },
  { id: 4, text: "مستوى التحميص (Roast Level)؟", options: [{ t: "LIGHT CORE", s: "A" }, { t: "MEDIUM CORE", s: "B" }, { t: "MEDIUM-DARK", s: "C" }, { t: "DARK CORE", s: "D" }] },
  { id: 5, text: "بيئة التحضير المفضلة؟", options: [{ t: "مختبر منزلي", s: "A" }, { t: "مقهى عملي", s: "B" }, { t: "تحضير يدوي", s: "C" }, { t: "ماكينة قوية", s: "D" }] },
  { id: 6, text: "تأثير الإخراج (Output)؟", options: [{ t: "صفاء ذهني", s: "A" }, { t: "تعديل مزاج", s: "B" }, { t: "يقظة مستمرة", s: "C" }, { t: "استمتاع بالمذاق", s: "D" }] },
  { id: 7, text: "درجة الحرارة المستهدفة؟", options: [{ t: "باردة جداً (ICE)", s: "A" }, { t: "ساخنة معتدلة", s: "B" }, { t: "حرارة مرتفعة", s: "C" }, { t: "بدرجة حرارة الغرفة", s: "D" }] },
  { id: 8, text: "الهدف النهائي؟", options: [{ t: "إلهام وإبداع", s: "A" }, { t: "استرخاء عضلي", s: "B" }, { t: "تنفيذ مهام", s: "C" }, { t: "تواصل اجتماعي", s: "D" }] }
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
    <main className="min-h-screen bg-black text-white p-6 font-mono flex items-center justify-center relative overflow-hidden">
      {/* AI Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-4xl">
        {step === 0 && (
          <div className="text-center space-y-10">
             <h2 className="text-cyan-500 text-[10px] tracking-[1em] uppercase">System Booting...</h2>
             <h1 className="text-6xl font-black tracking-tighter italic">ASPERANZA <span className="text-cyan-400">CORE</span></h1>
             <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Identify Operator..." 
                  className="bg-transparent border border-cyan-500/20 p-4 w-full max-w-xs text-center outline-none focus:border-cyan-500 transition-all rounded-lg"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={() => userName && setStep(1)} className="block mx-auto px-10 py-3 bg-cyan-500 text-black text-[10px] font-bold rounded-full">INITIALIZE</button>
             </div>
          </div>
        )}

        {step === 1 && (
          <div className="text-center space-y-8 animate-pulse">
            <h2 className="text-3xl font-light">ACCESS GRANTED: <span className="text-cyan-400 font-bold">{userName}</span></h2>
            <button onClick={() => setStep(2)} className="px-12 py-4 border border-cyan-500 text-cyan-500 text-[10px] tracking-[0.4em] rounded-full hover:bg-cyan-500 hover:text-black transition-all">START ANALYSIS</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="text-cyan-600 text-[10px] tracking-widest font-bold">CALIBRATING_STAGE_{currentQ + 1}</span>
              <h2 className="text-3xl font-medium tracking-tight leading-snug">{questions[currentQ].text}</h2>
              <div className="grid gap-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-4 text-right border border-white/5 bg-white/[0.02] hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-xs text-gray-400 hover:text-white">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/[0.03] p-8 border border-white/10 rounded-3xl backdrop-blur-xl">
               <h3 className="text-center text-[9px] tracking-widest text-cyan-500 mb-6 uppercase">Real-time Stream</h3>
               <div className="space-y-6">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500">
                        <span>{BEANS[key].name}</span>
                        <span>{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${BEANS[key].color} transition-all duration-700`} style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-10">
            <h2 className="text-cyan-500 text-[10px] tracking-[0.5em] font-bold uppercase">Analysis Complete</h2>
            <h1 className="text-6xl font-black italic">{userName}'S DNA</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                  <span className={`text-2xl font-bold block ${BEANS[key].text}`}>{Math.round(ratios[key])}%</span>
                  <span className="text-[8px] text-gray-600 tracking-widest uppercase">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="p-8 border border-cyan-500/30 bg-cyan-950/20 rounded-3xl inline-block">
              <span className="text-[9px] text-cyan-500 tracking-widest block mb-2">ACCESS_CODE</span>
              <div className="text-4xl font-mono font-bold text-white uppercase tracking-tighter">{blendCode}</div>
            </div>

            <div className="flex justify-center gap-4">
               <button onClick={() => window.location.reload()} className="px-10 py-4 bg-cyan-500 text-black text-[10px] font-bold tracking-widest rounded-full">REBOOT SYSTEM</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 