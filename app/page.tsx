"use client";
import { useState } from "react";

// هوية بلاك نايت المعكوسة (خلفية ذهبية وعناصر سوداء)
const BEANS = {
  A: { name: "بلاك نايت - أثيوبي", color: "bg-black", text: "text-black" },
  B: { name: "بلاك نايت - كولومبي", color: "bg-black", text: "text-black" },
  C: { name: "بلاك نايت - برازيلي", color: "bg-black", text: "text-black" },
  D: { name: "بلاك نايت - إندونيسي", color: "bg-black", text: "text-black" }
};

const questions = [
  { id: 1, text: "كيف تفضل بداية يومك؟", options: [{ t: "انتعاش وحيوية", s: "A" }, { t: "هدوء وعمق", s: "B" }, { t: "تأمل صامت", s: "C" }, { t: "إنجاز مكثف", s: "D" }] },
  { id: 2, text: "ما هو الإيحاء المفضل لديك؟", options: [{ t: "ياسمين وفواكه", s: "A" }, { t: "عسل كراميل", s: "B" }, { t: "مكسرات داكنة", s: "C" }, { t: "بهارات وتراب", s: "D" }] },
  { id: 3, text: "القوام (Body) المثالي؟", options: [{ t: "خفيف حريري", s: "A" }, { t: "متوسط متزن", s: "B" }, { t: "كريمي كثيف", s: "C" }, { t: "ثقيل جداً", s: "D" }] },
  { id: 4, text: "درجة حمضية القهوة؟", options: [{ t: "بارزة جداً", s: "A" }, { t: "متوسطة الحلاوة", s: "B" }, { t: "منخفضة جداً", s: "C" }, { t: "شبه منعدمة", s: "D" }] }
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
      setBlendCode(`#123456`); // استخدام الكود المفضل لديك في الحفظ
      setStep(3);
    }
  };

  return (
    <main className="min-h-screen bg-[#D4AF37] text-black p-6 font-sans flex items-center justify-center relative overflow-hidden">
      {/* خلفية ذهبية متدرجة للفخامة */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#D4AF37] via-[#F1D279] to-[#B8860B] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        
        {step === 0 && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <h2 className="text-black/60 text-[10px] tracking-[1.2em] uppercase font-bold">The Golden Edition</h2>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase">BLACK <span className="text-white">KNIGHT</span></h1>
            <div className="flex flex-col items-center gap-6">
              <input 
                type="text" 
                placeholder="ادخل اسمك هنا..." 
                className="bg-black/5 border-b-2 border-black p-4 w-72 text-center outline-none focus:bg-black/10 transition-all text-xl placeholder:text-black/40 font-bold"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={() => userName && setStep(1)} className="px-12 py-4 bg-black text-[#D4AF37] font-black rounded-sm text-[11px] tracking-widest hover:bg-black/80 transition-colors shadow-2xl uppercase">Initialize Lab</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <h2 className="text-5xl font-black uppercase">مرحباً <span className="underline">{userName}</span></h2>
            <p className="text-black/70 font-bold text-sm tracking-widest uppercase italic">نحن الآن في مختبر بلاك نايت الذهبي</p>
            <button onClick={() => setStep(2)} className="px-14 py-5 bg-black text-[#D4AF37] text-[10px] font-black tracking-[0.4em] rounded-sm shadow-2xl">START ANALYSIS</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-right">
            <div className="space-y-10">
              <span className="text-black text-[10px] tracking-widest font-black border-b-2 border-black pb-1">STAGE 0{currentQ + 1}</span>
              <h2 className="text-4xl font-black leading-tight text-black italic">{questions[currentQ].text}</h2>
              <div className="grid gap-4">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-5 border-2 border-black bg-black/5 rounded-sm hover:bg-black hover:text-[#D4AF37] transition-all text-sm font-black text-black text-right px-8 uppercase">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-black text-[#D4AF37] p-10 rounded-sm shadow-[20px_20px_0px_rgba(0,0,0,1)]">
               <h3 className="text-center text-[10px] tracking-widest mb-10 uppercase font-black">Live DNA Ratios</h3>
               <div className="space-y-8">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black">
                        <span className="uppercase">{BEANS[key].name}</span>
                        <span>{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-[4px] bg-[#D4AF37]/20 w-full overflow-hidden">
                        <div className="h-full bg-[#D4AF37] transition-all duration-1000" style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-700">
            <h2 className="text-black/60 text-[11px] tracking-[0.8em] font-black uppercase font-mono">Mission Accomplished</h2>
            <h1 className="text-8xl font-black italic tracking-tighter uppercase text-black">{userName}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-8 border-4 border-black bg-black/5 rounded-sm group hover:bg-black transition-all">
                  <span className="text-4xl font-black block mb-2 group-hover:text-[#D4AF37]">{Math.round(ratios[key])}%</span>
                  <span className="text-[9px] text-black group-hover:text-white tracking-widest font-black uppercase">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="p-12 bg-black text-[#D4AF37] rounded-sm inline-block shadow-[15px_15px_0px_rgba(255,255,255,0.3)]">
              <span className="text-[10px] tracking-[0.4em] block mb-4 uppercase font-black">Your Progress Code</span>
              <div className="text-6xl font-black tracking-widest">{blendCode}</div>
            </div>

            <div className="flex justify-center gap-6 pt-6">
               <button onClick={() => window.location.reload()} className="px-14 py-4 bg-black text-[#D4AF37] text-[11px] font-black tracking-[0.3em] uppercase hover:scale-105 transition-all">RE-BOOT</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 