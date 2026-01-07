"use client";
import { useState } from "react";

const BEANS = {
  A: { name: "BLACK KNIGHT - ETHIOPIAN", color: "bg-[#000080]" },
  B: { name: "BLACK KNIGHT - COLOMBIAN", color: "bg-[#000080]" },
  C: { name: "BLACK KNIGHT - BRAZILIAN", color: "bg-[#000080]" },
  D: { name: "BLACK KNIGHT - INDONESIAN", color: "bg-[#000080]" }
};

const questions = [
  { id: 1, text: "ما هو نمط يومك المعتاد؟", options: [{ t: "نشاط فوري خارق", s: "A" }, { t: "استيعاب هادئ", s: "B" }, { t: "تركيز عميق", s: "C" }, { t: "عمل شاق مستمر", s: "D" }] },
  { id: 2, text: "النكهة التي تبحث عنها؟", options: [{ t: "فاكهية وحمضية", s: "A" }, { t: "متزنة وحلوة", s: "B" }, { t: "كلاسيكية دافئة", s: "C" }, { t: "قوية وترابية", s: "D" }] },
  { id: 3, text: "قوام المشروب المفضل؟", options: [{ t: "خفيف جداً", s: "A" }, { t: "متوسط", s: "B" }, { t: "كثيف", s: "C" }, { t: "ثقيل جداً", s: "D" }] },
  { id: 4, text: "درجة الاستخلاص؟", options: [{ t: "صافية وقصيرة", s: "A" }, { t: "طويلة ومعقدة", s: "B" }, { t: "مركزة جداً", s: "C" }, { t: "متوازنة", s: "D" }] }
];

export default function Home() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(0); 
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [ratios, setRatios] = useState({ A: 25, B: 25, C: 25, D: 25 });
  const [blendCode] = useState("#123456");

  const handleAnswer = (s: string, index: number) => {
    setSelectedOpt(index);
    setTimeout(() => {
      const updated = { ...ratios };
      const type = s as keyof typeof ratios;
      updated[type] = Math.min(updated[type] + 20, 80);
      const sumOthers = 100 - updated[type];
      const otherKeys = (Object.keys(updated) as Array<keyof typeof ratios>).filter(k => k !== type);
      otherKeys.forEach(k => updated[k] = sumOthers / 3);
      
      setRatios(updated);
      setSelectedOpt(null);
      if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
      else setStep(3);
    }, 400); // تأخير بسيط لرؤية التحديد الكحلي
  };

  return (
    <main className="min-h-screen bg-[#FFFF00] text-[#000080] p-6 font-black flex items-center justify-center relative selection:bg-[#000080] selection:text-white">
      
      <div className="relative z-10 w-full max-w-5xl">
        
        {step === 0 && (
          <div className="text-center space-y-12 animate-in fade-in duration-700">
            <h1 className="text-8xl md:text-9xl tracking-tighter leading-none italic uppercase">
              BLACK<br/>KNIGHT
            </h1>
            <div className="space-y-6">
               <input 
                type="text" 
                placeholder="TYPE YOUR NAME..." 
                className="bg-transparent border-b-8 border-[#000080] p-4 w-full max-w-md text-center outline-none text-4xl placeholder:text-[#000080]/30 uppercase"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={() => userName && setStep(1)} className="block mx-auto px-16 py-6 bg-[#000080] text-[#FFFF00] text-xl rounded-none hover:skew-x-2 transition-transform uppercase">Enter The Lab</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start text-left">
            <div className="space-y-10">
              <div className="bg-[#000080] text-[#FFFF00] inline-block px-4 py-1 text-sm uppercase italic">Stage 0{currentQ + 1}</div>
              <h2 className="text-5xl md:text-6xl uppercase italic leading-tight">{questions[currentQ].text}</h2>
              <div className="grid gap-4">
                {questions[currentQ].options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(opt.s, i)} 
                    className={`p-6 border-4 border-[#000080] text-left text-2xl uppercase transition-all flex justify-between items-center
                      ${selectedOpt === i ? 'bg-[#000080] text-white' : 'bg-transparent hover:bg-[#000080]/5'}`}
                  >
                    <span>{opt.t}</span>
                    {selectedOpt === i && <span className="animate-ping">●</span>}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-8 border-[#000080] p-10 bg-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 bg-[#000080] text-[#FFFF00] text-[10px]">LIVE_DATA</div>
               <h3 className="text-2xl mb-10 uppercase italic underline decoration-4">Blending Ratios</h3>
               <div className="space-y-8">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{BEANS[key].name}</span>
                        <span>{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-4 bg-[#000080]/10 rounded-none border-2 border-[#000080]">
                        <div className="h-full bg-[#000080] transition-all duration-500" style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-bottom-20 duration-1000">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
              
              {/* صورة الكيس الاحترافية (تمثيل بصري) */}
              <div className="w-full md:w-1/3 aspect-[3/4] bg-[#000080] relative flex items-center justify-center border-8 border-white shadow-[20px_20px_0px_rgba(0,0,0,0.1)]">
                <div className="text-center p-4">
                  <div className="text-[#FFFF00] text-6xl mb-4 italic">BK</div>
                  <div className="h-px bg-[#FFFF00]/30 w-full mb-4"></div>
                  <div className="text-white text-[10px] tracking-[0.5em] mb-2 uppercase">Signature Blend</div>
                  <div className="text-[#FFFF00] text-xl font-bold uppercase">{userName} EDITION</div>
                </div>
                <div className="absolute bottom-4 left-4 text-[#FFFF00] text-[8px] font-mono">CODE: {blendCode}</div>
              </div>

              <div className="w-full md:w-2/3 space-y-8 text-right">
                <h2 className="text-2xl bg-[#000080] text-[#FFFF00] inline-block px-4 py-2 italic uppercase">Analysis Result</h2>
                <h1 className="text-7xl md:text-8xl italic uppercase leading-none">{userName}'s<br/>Blend</h1>
                
                <div className="grid grid-cols-2 gap-4">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="p-6 border-4 border-[#000080] bg-transparent">
                      <span className="text-4xl block">{Math.round(ratios[key])}%</span>
                      <span className="text-[10px] uppercase opacity-60 font-bold">{BEANS[key].name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 pt-6">
                   <button onClick={() => window.location.reload()} className="px-10 py-4 bg-[#000080] text-white uppercase text-sm hover:invert transition-all">Start New Project</button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
} 