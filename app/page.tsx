"use client";
import { useState } from "react";

// الألوان المستخرجة من صورتك بدقة
const BEANS = {
  A: { name: "أثيوبي (عطري)", color: "bg-[#9D59B1]", text: "text-[#9D59B1]" },
  B: { name: "كولومبي (ناعم)", color: "bg-[#4A90E2]", text: "text-[#4A90E2]" },
  C: { name: "برازيلي (غني)", color: "bg-[#7A4988]", text: "text-[#7A4988]" },
  D: { name: "إندونيسي (عميق)", color: "bg-[#3B6EA5]", text: "text-[#3B6EA5]" }
};

const questions = [
  { id: 1, text: "برمجة نمط الاستيقاظ؟", options: [{ t: "نشاط فوري", s: "A" }, { t: "هدوء تدريجي", s: "B" }, { t: "تركيز عميق", s: "C" }, { t: "طاقة قصوى", s: "D" }] },
  { id: 2, text: "تحديد مسار النكهة؟", options: [{ t: "أزهار وحمضيات", s: "A" }, { t: "حلاوة متزنة", s: "B" }, { t: "مكسرات داكنة", s: "C" }, { t: "توابل معقدة", s: "D" }] },
  { id: 3, text: "كثافة البيانات (Body)؟", options: [{ t: "خفيف وحريري", s: "A" }, { t: "متوسط النعومة", s: "B" }, { t: "كثيف وممتلئ", s: "C" }, { t: "ثقيل ومركز", s: "D" }] },
  { id: 4, text: "الهدف من المعالجة؟", options: [{ t: "إلهام وإبداع", s: "A" }, { t: "راحة وصفاء", s: "B" }, { t: "إنجاز مهام", s: "C" }, { t: "متعة المذاق", s: "D" }] },
  { id: 5, text: "نوع مشروبك المعتاد؟", options: [{ t: "V60 / Cold Brew", s: "A" }, { t: "Aeropress", s: "B" }, { t: "Cortado / Latte", s: "C" }, { t: "Espresso", s: "D" }] },
  { id: 6, text: "نهاية الطعم (Aftertaste)؟", options: [{ t: "نظيف وسريع", s: "A" }, { t: "حلاوة متبقية", s: "B" }, { t: "مرارة لطيفة", s: "C" }, { t: "نكهة معقدة", s: "D" }] },
  { id: 7, text: "درجة التحميص؟", options: [{ t: "Light Roast", s: "A" }, { t: "Medium Roast", s: "B" }, { t: "Medium-Dark", s: "C" }, { t: "Dark Roast", s: "D" }] },
  { id: 8, text: "الغرض من الكوب الآن؟", options: [{ t: "استكشاف سلالة", s: "A" }, { t: "تعديل مزاج", s: "B" }, { t: "تركيز للعمل", s: "C" }, { t: "استمتاع ختامي", s: "D" }] }
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
    <main className="min-h-screen bg-[#0A0A0B] text-white p-6 font-sans flex items-center justify-center relative overflow-hidden">
      {/* إضاءات الخلفية المستوحاة من صورتك */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#9D59B1]/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-[#4A90E2]/15 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        {step === 0 && (
          <div className="space-y-8">
            <h2 className="text-[#9D59B1] text-[10px] tracking-[1em] uppercase">Laboratory Access</h2>
            <h1 className="text-6xl font-black italic tracking-tighter">ASPERANZA <span className="text-[#4A90E2]">CORE</span></h1>
            <div className="flex flex-col items-center gap-4">
              <input 
                type="text" 
                placeholder="Identify Operator..." 
                className="bg-white/5 border border-white/10 p-4 w-72 text-center outline-none focus:border-[#9D59B1] transition-all rounded-xl"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={() => userName && setStep(1)} className="px-10 py-3 bg-gradient-to-r from-[#9D59B1] to-[#4A90E2] text-white font-bold rounded-full text-[10px] tracking-widest">INITIALIZE</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-pulse">
            <h2 className="text-4xl font-light tracking-tight">Operator Identified: <span className="text-[#9D59B1] font-bold">{userName}</span></h2>
            <button onClick={() => setStep(2)} className="px-12 py-4 border border-[#4A90E2] text-[#4A90E2] text-[10px] tracking-[0.4em] rounded-full hover:bg-[#4A90E2] hover:text-white transition-all">START ANALYSIS</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-right">
            <div className="space-y-8">
              <span className="text-[#9D59B1] text-[10px] tracking-widest font-bold">STAGE 0{currentQ + 1} / 08</span>
              <h2 className="text-3xl font-medium leading-tight">{questions[currentQ].text}</h2>
              <div className="grid gap-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-4 border border-white/5 bg-white/[0.03] rounded-xl hover:border-[#9D59B1]/50 hover:bg-[#9D59B1]/5 transition-all text-sm text-gray-300">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/[0.02] p-8 border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
               <h3 className="text-center text-[9px] tracking-widest text-[#4A90E2] mb-8 uppercase">Live DNA Data</h3>
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
          <div className="space-y-10 animate-in zoom-in duration-700">
            <h2 className="text-[#9D59B1] text-[10px] tracking-[0.5em] font-bold uppercase">Extraction Complete</h2>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase">{userName}'S DNA</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl group hover:border-[#9D59B1]/30 transition-all">
                  <span className={`text-2xl font-bold block ${BEANS[key].text}`}>{Math.round(ratios[key])}%</span>
                  <span className="text-[8px] text-gray-600 tracking-widest uppercase">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="p-8 border border-[#4A90E2]/30 bg-[#4A90E2]/5 rounded-[2rem] inline-block">
              <span className="text-[10px] text-[#4A90E2] tracking-widest block mb-2 uppercase">Your Blend Code</span>
              <div className="text-4xl font-mono font-bold text-white uppercase">{blendCode}</div>
            </div>

            <div className="flex justify-center gap-4">
               <button onClick={() => window.location.reload()} className="px-10 py-4 border border-white/10 text-[10px] font-bold tracking-widest rounded-full hover:bg-white hover:text-black transition-all">NEW EXPERIMENT</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}  