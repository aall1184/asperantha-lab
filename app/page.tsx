"use client";
import { useState } from "react";

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
  { id: 4, text: "الهدف من المعالجة؟", options: [{ t: "إلهام وإبداع", s: "A" }, { t: "راحة وصفاء", s: "B" }, { t: "إنجاز مهام", s: "C" }, { t: "متعة المذاق", s: "D" }] }
  // يمكنك إضافة الـ 4 أسئلة المتبقية هنا بنفس النمط
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
    updated[type] = Math.min(updated[type] + 20, 80);
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
    <main className="min-h-screen bg-[#0A0A0B] text-[#F0F0F0] p-6 font-sans flex items-center justify-center relative overflow-hidden">
      
      {/* التأثيرات اللونية المستوحاة من صورتك */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#9D59B1]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#4A90E2]/15 blur-[100px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        
        {/* مكان الأيقونة (Logo) */}
        <div className="mb-8 animate-pulse">
           {/* استبدلي src برابط أيقونتك لاحقاً */}
           <div className="w-20 h-20 bg-gradient-to-tr from-[#9D59B1] to-[#4A90E2] rounded-full mx-auto flex items-center justify-center border border-white/10 shadow-lg shadow-[#9D59B1]/20">
              <span className="text-white font-bold text-xl">A</span>
           </div>
        </div>

        {step === 0 && (
          <div className="space-y-10 animate-in fade-in duration-1000">
             <h2 className="text-[#9D59B1] text-[10px] tracking-[1em] uppercase">Laboratory Access</h2>
             <h1 className="text-5xl font-extralight tracking-tighter">ASPERANZA <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9D59B1] to-[#4A90E2]">CORE</span></h1>
             <input 
                type="text" 
                placeholder="Identify Operator..." 
                className="bg-white/5 border border-white/10 p-4 w-full max-w-xs text-center outline-none focus:border-[#9D59B1] transition-all rounded-2xl text-lg"
                onChange={(e) => setUserName(e.target.value)}
              />
             <button onClick={() => userName && setStep(1)} className="block mx-auto px-12 py-4 bg-gradient-to-r from-[#9D59B1] to-[#4A90E2] text-white font-bold rounded-full text-xs tracking-widest hover:scale-105 transition-transform">INITIALIZE SYSTEM</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-right">
            <div className="space-y-8">
              <span className="text-[#9D59B1] text-xs font-bold tracking-widest uppercase">Processing Stage 0{currentQ + 1}</span>
              <h2 className="text-4xl font-light leading-tight">{questions[currentQ].text}</h2>
              <div className="grid gap-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-5 border border-white/5 bg-white/[0.03] rounded-2xl hover:border-[#9D59B1]/50 hover:bg-[#9D59B1]/5 transition-all text-sm font-light">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/[0.02] p-10 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
               <h3 className="text-center text-[10px] tracking-widest text-[#4A90E2] mb-8 uppercase">Live DNA Stream</h3>
               <div className="space-y-8">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>{BEANS[key].name}</span>
                        <span>{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${BEANS[key].color} transition-all duration-1000`} style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in zoom-in duration-700">
            <h2 className="text-[#9D59B1] text-[10px] tracking-[0.5em] font-bold uppercase">Extraction Complete</h2>
            <h1 className="text-7xl font-black tracking-tighter uppercase italic">{userName}'S BLEND</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-8 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:bg-white/[0.05] transition-all">
                  <span className={`text-3xl font-bold block mb-1 ${BEANS[key].text}`}>{Math.round(ratios[key])}%</span>
                  <span className="text-[8px] text-gray-500 tracking-widest uppercase">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="p-10 border border-[#4A90E2]/30 bg-[#4A90E2]/5 rounded-[3rem] inline-block">
              <span className="text-[10px] text-[#4A90E2] tracking-widest block mb-4 uppercase">Unique DNA Key</span>
              <div className="text-5xl font-mono font-bold text-white tracking-widest">{blendCode}</div>
            </div>

            <div className="flex justify-center gap-6 pt-8">
               <button onClick={() => window.location.reload()} className="px-12 py-4 border border-white/10 text-[10px] font-bold tracking-widest rounded-full hover:bg-white hover:text-black transition-all">RESET CORE</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
import { useState } from "react";

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
  { id: 4, text: "الهدف من المعالجة؟", options: [{ t: "إلهام وإبداع", s: "A" }, { t: "راحة وصفاء", s: "B" }, { t: "إنجاز مهام", s: "C" }, { t: "متعة المذاق", s: "D" }] }
  // يمكنك إضافة الـ 4 أسئلة المتبقية هنا بنفس النمط
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
    updated[type] = Math.min(updated[type] + 20, 80);
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
    <main className="min-h-screen bg-[#0A0A0B] text-[#F0F0F0] p-6 font-sans flex items-center justify-center relative overflow-hidden">
      
      {/* التأثيرات اللونية المستوحاة من صورتك */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#9D59B1]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#4A90E2]/15 blur-[100px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        
        {/* مكان الأيقونة (Logo) */}
        <div className="mb-8 animate-pulse">
           {/* استبدلي src برابط أيقونتك لاحقاً */}
           <div className="w-20 h-20 bg-gradient-to-tr from-[#9D59B1] to-[#4A90E2] rounded-full mx-auto flex items-center justify-center border border-white/10 shadow-lg shadow-[#9D59B1]/20">
              <span className="text-white font-bold text-xl">A</span>
           </div>
        </div>

        {step === 0 && (
          <div className="space-y-10 animate-in fade-in duration-1000">
             <h2 className="text-[#9D59B1] text-[10px] tracking-[1em] uppercase">Laboratory Access</h2>
             <h1 className="text-5xl font-extralight tracking-tighter">ASPERANZA <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9D59B1] to-[#4A90E2]">CORE</span></h1>
             <input 
                type="text" 
                placeholder="Identify Operator..." 
                className="bg-white/5 border border-white/10 p-4 w-full max-w-xs text-center outline-none focus:border-[#9D59B1] transition-all rounded-2xl text-lg"
                onChange={(e) => setUserName(e.target.value)}
              />
             <button onClick={() => userName && setStep(1)} className="block mx-auto px-12 py-4 bg-gradient-to-r from-[#9D59B1] to-[#4A90E2] text-white font-bold rounded-full text-xs tracking-widest hover:scale-105 transition-transform">INITIALIZE SYSTEM</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-right">
            <div className="space-y-8">
              <span className="text-[#9D59B1] text-xs font-bold tracking-widest uppercase">Processing Stage 0{currentQ + 1}</span>
              <h2 className="text-4xl font-light leading-tight">{questions[currentQ].text}</h2>
              <div className="grid gap-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-5 border border-white/5 bg-white/[0.03] rounded-2xl hover:border-[#9D59B1]/50 hover:bg-[#9D59B1]/5 transition-all text-sm font-light">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/[0.02] p-10 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
               <h3 className="text-center text-[10px] tracking-widest text-[#4A90E2] mb-8 uppercase">Live DNA Stream</h3>
               <div className="space-y-8">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>{BEANS[key].name}</span>
                        <span>{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${BEANS[key].color} transition-all duration-1000`} style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
              <div className="text-5xl font-mono font-bold text-white tracking-widest">{blendCode}</div>
            </div>

            <div className="flex justify-center gap-6 pt-8">
               <button onClick={() => window.location.reload()} className="px-12 py-4 border border-white/10 text-[10px] font-bold tracking-widest rounded-full hover:bg-white hover:text-black transition-all">RESET CORE</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
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
                        <span>{Ma