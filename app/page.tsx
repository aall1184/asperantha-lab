"use client";
import { useState, useEffect } from "react";

// إعدادات المختبر
const BEANS = {
  A: { name: "أثيوبي (فاكهي)", color: "bg-amber-500", text: "text-amber-500" },
  B: { name: "كولومبي (متزن)", color: "bg-orange-600", text: "text-orange-600" },
  C: { name: "برازيلي (قوام)", color: "bg-yellow-700", text: "text-yellow-700" },
  D: { name: "إندونيسي (توابل)", color: "bg-stone-600", text: "text-stone-600" }
};

const questions = [
  { id: 1, text: "كيف تفضل بداية يومك؟", options: [{ t: "انتعاش وحيوية", s: "A" }, { t: "هدوء وعمق", s: "B" }, { t: "تأمل صامت", s: "C" }, { t: "إنجاز مكثف", s: "D" }] },
  { id: 2, text: "ما هو الإيحاء المفضل لديك؟", options: [{ t: "ياسمين وفواكه", s: "A" }, { t: "عسل كراميل", s: "B" }, { t: "مكسرات داكنة", s: "C" }, { t: "بهارات وتراب", s: "D" }] },
  { id: 3, text: "القوام (Body) المثالي؟", options: [{ t: "خفيف حريري", s: "A" }, { t: "متوسط متزن", s: "B" }, { t: "كريمي كثيف", s: "C" }, { t: "ثقيل جداً", s: "D" }] },
  { id: 4, text: "درجة الحمضية؟", options: [{ t: "بارزة جداً", s: "A" }, { t: "متوسطة الحلاوة", s: "B" }, { t: "منخفضة جداً", s: "C" }, { t: "شبه منعدمة", s: "D" }] },
  { id: 5, text: "نوع مشروبك المعتاد؟", options: [{ t: "V60 / Cold Brew", s: "A" }, { t: "Aeropress", s: "B" }, { t: "Cortado / Latte", s: "C" }, { t: "Espresso / Turkish", s: "D" }] },
  { id: 6, text: "نهاية الطعم (Aftertaste)؟", options: [{ t: "نظيف وسريع", s: "A" }, { t: "حلاوة متبقية", s: "B" }, { t: "مرارة محببة", s: "C" }, { t: "نكهة معقدة", s: "D" }] },
  { id: 7, text: "درجة التحميص؟", options: [{ t: "Light Roast", s: "A" }, { t: "City Roast", s: "B" }, { t: "Full City", s: "C" }, { t: "Dark Roast", s: "D" }] },
  { id: 8, text: "الغرض من الكوب؟", options: [{ t: "استكشاف سلالة", s: "A" }, { t: "تعديل مزاج", s: "B" }, { t: "تركيز للعمل", s: "C" }, { t: "استمتاع ختامي", s: "D" }] }
];

export default function Home() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(0); 
  const [currentQ, setCurrentQ] = useState(0);
  const [ratios, setRatios] = useState({ A: 25, B: 25, C: 25, D: 25 });
  const [history, setHistory] = useState<any[]>([]);
  const [blendCode, setBlendCode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lab_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleAnswer = (s: string) => {
    const updated = { ...ratios };
    const type = s as keyof typeof ratios;
    updated[type] = Math.min(updated[type] + 15, 85);
    const sumOthers = 100 - updated[type];
    const otherKeys = (Object.keys(updated) as Array<keyof typeof ratios>).filter(k => k !== type);
    otherKeys.forEach(k => updated[k] = sumOthers / 3);
    
    setRatios(updated);
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else finishAnalysis(updated);
  };

  const finishAnalysis = (finalRatios: any) => {
    const code = `#${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`;
    setBlendCode(code);
    const result = { name: userName, code, ratios: finalRatios, date: new Date().toLocaleDateString() };
    const newHistory = [result, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("lab_history", JSON.stringify(newHistory));
    setStep(3);
  };

  const shareOnWhatsApp = () => {
    const text = `مرحباً، أنا ${userName}. لقد صممت بلند القهوة الخاص بي في مختبر اسبرنثا بكود: ${blendCode}. النسب: أثيوبي ${Math.round(ratios.A)}%، كولومبي ${Math.round(ratios.B)}%، برازيلي ${Math.round(ratios.C)}%، إندونيسي ${Math.round(ratios.D)}%.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white p-6 font-sans flex items-center justify-center">
      {/* Background Lighting */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black"></div>

      <div className="w-full max-w-4xl space-y-12">
        {step === 0 && (
          <div className="text-center space-y-8 animate-in fade-in duration-1000">
            <h1 className="text-6xl font-black tracking-tighter italic">ASPERANZA LAB</h1>
            <input 
              type="text" 
              placeholder="سجل اسمك لفتح المختبر..." 
              className="bg-transparent border-b border-white/10 p-4 w-full max-w-sm text-center focus:border-amber-600 transition-all outline-none text-2xl"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={() => userName && setStep(1)} className="block mx-auto px-12 py-4 bg-white text-black font-bold tracking-widest text-xs rounded-full">ACCESS LAB</button>
            
            {history.length > 0 && (
              <div className="pt-12 space-y-4">
                <h3 className="text-[10px] tracking-widest text-gray-600">PREVIOUS RECORDS</h3>
                {history.map((h, i) => (
                  <div key={i} className="text-xs text-gray-500">{h.name} - {h.code} - {h.date}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <h2 className="text-5xl font-light">أهلاً، <span className="text-amber-500 font-bold">{userName}</span></h2>
            <p className="text-gray-500 max-w-sm mx-auto lowercase leading-relaxed text-sm">أنت على وشك بدء 8 مراحل من التحليل الهندسي لذائقتك.</p>
            <button onClick={() => setStep(2)} className="px-12 py-4 border border-amber-600/30 text-amber-500 text-[10px] tracking-[0.4em] font-bold rounded-full hover:bg-amber-600 hover:text-white transition-all">START ENGINE</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10 text-right">
              <span className="text-amber-600 font-mono text-xs uppercase tracking-widest">Stage 0{currentQ + 1}</span>
              <h2 className="text-3xl font-medium leading-snug">{questions[currentQ].text}</h2>
              <div className="grid gap-4">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:border-amber-600/50 hover:bg-amber-600/5 transition-all text-sm text-gray-400 hover:text-white">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-2xl">
              <h3 className="text-center text-[9px] tracking-[0.5em] text-gray-600 mb-8 uppercase">Real-time Blending</h3>
              <div className="space-y-6">
                {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                      <span>{BEANS[key].name}</span>
                      <span>{Math.round(ratios[key])}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${BEANS[key].color} transition-all duration-700`} style={{ width: `${ratios[key]}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-10 animate-in fade-in zoom-in duration-1000">
            <h2 className="text-amber-500 text-[10px] tracking-[0.6em] font-bold uppercase">Analysis Final Report</h2>
            <h1 className="text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 uppercase">{userName}'S DNA</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                  <span className={`text-3xl font-bold block mb-1 ${BEANS[key].text}`}>{Math.round(ratios[key])}%</span>
                  <span className="text-[8px] text-gray-600 tracking-widest">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-600/10 border border-amber-600/20 p-8 rounded-[2rem] inline-block">
              <span className="text-[10px] text-amber-500 tracking-widest block mb-2">UNIQUE FORMULA CODE</span>
              <div className="text-4xl font-mono font-bold">{blendCode}</div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button onClick={shareOnWhatsApp} className="px-10 py-4 bg-white text-black text-[10px] font-bold tracking-widest rounded-full hover:bg-amber-600 hover:text-white transition-all">ORDER VIA WHATSAPP</button>
              <button onClick={() => window.location.reload()} className="px-10 py-4 border border-white/10 text-[10px] font-bold tracking-widest rounded-full">NEW EXPERIMENT</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 