"use client";
import { useState } from "react";

// 1. تعريف أنواع البن الأربعة
const BEANS = {
  A: { name: "أثيوبي (فاكهي)", color: "bg-amber-500" },
  B: { name: "كولومبي (متزن)", color: "bg-orange-600" },
  C: { name: "برازيلي (قوام)", color: "bg-yellow-700" },
  D: { name: "إندونيسي (توابل)", color: "bg-stone-600" }
};

const questions = [
  { id: 1, text: "ما هو الوقت المفضل لقهوتك؟", options: [{ t: "الصباح الباكر", s: "A" }, { t: "بعد الظهر", s: "B" }, { t: "المساء الهادئ", s: "C" }, { t: "وقت العمل المكثف", s: "D" }] },
  { id: 2, text: "أي إيحاء تفضل أن يبرز؟", options: [{ t: "ياسمين وحمضيات", s: "A" }, { t: "كراميل وعسل", s: "B" }, { t: "شوكولاتة ومكسرات", s: "C" }, { t: "ترابي وتابلي", s: "D" }] },
  { id: 3, text: "كيف تحب قوام القهوة؟", options: [{ t: "خفيف جداً", s: "A" }, { t: "متوسط", s: "B" }, { t: "ثقيل", s: "C" }, { t: "كريمي دسم", s: "D" }] },
  { id: 4, text: "ما هي درجة التحميص المفضلة؟", options: [{ t: "Light", s: "A" }, { t: "Medium", s: "B" }, { t: "Medium-Dark", s: "C" }, { t: "Dark", s: "D" }] },
  { id: 5, text: "أي من هذه الفواكه تفضل؟", options: [{ t: "توت وفراولة", s: "A" }, { t: "تفاح وخوخ", s: "B" }, { t: "تمور وزبيب", s: "C" }, { t: "حمضيات لاذعة", s: "D" }] },
  { id: 6, text: "طريقة التحضير المفضلة؟", options: [{ t: "V60 / Chemex", s: "A" }, { t: "Aeropress", s: "B" }, { t: "Espresso", s: "C" }, { t: "French Press", s: "D" }] },
  { id: 7, text: "ما الذي تبحث عنه في الطعم؟", options: [{ t: "حمضية منعشة", s: "A" }, { t: "حلاوة واضحة", s: "B" }, { t: "مرارة لطيفة", s: "C" }, { t: "توازن كامل", s: "D" }] },
  { id: 8, text: "شعورك بعد أول رشفة؟", options: [{ t: "إلهام وإبداع", s: "A" }, { t: "استرخاء تام", s: "B" }, { t: "تركيز عالي", s: "C" }, { t: "استمتاع بالمذاق", s: "D" }] }
];

export default function Home() {
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(0); // 0: Name, 1: Welcome, 2: Questions, 3: Result
  const [currentQ, setCurrentQ] = useState(0);
  const [ratios, setRatios] = useState({ A: 25, B: 25, C: 25, D: 25 });
  const [blendCode] = useState(`#${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`);

  const handleAnswer = (s: string) => {
    const updated = { ...ratios };
    const type = s as keyof typeof ratios;
    // منطق الحسبة: زيادة النوع المختار وتقليل البقية بالتساوي للحفاظ على 100%
    updated[type] = Math.min(updated[type] + 12, 100);
    const remainder = (100 - updated[type]) / 3;
    (Object.keys(updated) as Array<keyof typeof ratios>).forEach(key => {
      if (key !== type) updated[key] = remainder;
    });
    
    setRatios(updated);
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else setStep(3);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans uppercase">
      
      {/* 1. شاشة تسجيل الاسم */}
      {step === 0 && (
        <div className="text-center space-y-8 animate-in fade-in duration-700">
          <h2 className="text-amber-600 tracking-[0.5em] text-[10px]">Identify Yourself</h2>
          <h1 className="text-4xl font-light tracking-widest">مرحباً بك في المختبر</h1>
          <input 
            type="text" 
            placeholder="أدخل اسمك هنا..." 
            className="bg-transparent border-b border-white/20 p-4 w-64 text-center focus:outline-none focus:border-amber-600 transition-all"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => userName && setStep(1)} className="block mx-auto text-[10px] tracking-[0.4em] border border-white/10 px-10 py-4 hover:bg-white hover:text-black transition-all">Continue</button>
        </div>
      )}

      {/* 2. الترحيب بالاسم */}
      {step === 1 && (
        <div className="text-center space-y-8 animate-in zoom-in duration-700">
          <h1 className="text-6xl font-black italic tracking-tighter">HELLO, {userName}</h1>
          <p className="text-gray-500 max-w-sm mx-auto lowercase text-sm">نحن جاهزون الآن لتحليل ذائقتك وتصميم الـ Blend الخاص بك.</p>
          <button onClick={() => setStep(2)} className="px-12 py-4 bg-amber-600 text-[10px] tracking-[0.3em] font-bold">Start Lab Analysis</button>
        </div>
      )}

      {/* 3. شاشة الأسئلة والنسب الحية */}
      {step === 2 && (
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 text-right">
            <span className="text-amber-600 font-mono text-xs">Q {currentQ + 1} / 8</span>
            <h2 className="text-3xl font-medium tracking-tight normal-case">{questions[currentQ].text}</h2>
            <div className="grid gap-3">
              {questions[currentQ].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.s)} className="p-6 border border-white/5 bg-white/[0.02] hover:bg-amber-600/10 hover:border-amber-600/50 transition-all text-sm font-light tracking-widest">
                  {opt.t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 space-y-8">
             <h3 className="text-center text-[9px] tracking-[0.4em] text-gray-500">Live Blending Ratios</h3>
             <div className="space-y-6">
                {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-[9px] tracking-widest text-gray-400">
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

      {/* 4. النتيجة وكود البلند */}
      {step === 3 && (
        <div className="text-center space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-2">
            <h2 className="text-amber-500 tracking-[0.5em] text-[10px]">Your Formula is Ready</h2>
            <h1 className="text-6xl font-black italic">{userName}'S BLEND</h1>
          </div>

          <div className="bg-white/[0.03] p-10 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="text-center">
                  <span className={`text-4xl font-bold block ${BEANS[key].color.replace('bg-', 'text-')}`}>{Math.round(ratios[key])}%</span>
                  <span className="text-[8px] text-gray-500 tracking-widest">{BEANS[key].name}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-white/10">
              <span className="text-gray-500 text-[10px] tracking-widest">Unique Blend Code:</span>
              <div className="text-3xl font-mono mt-2 text-amber-600">{blendCode}</div>
            </div>
          </div>

          <button onClick={() => window.location.reload()} className="text-[10px] tracking-[0.4em] text-gray-600 border-b border-gray-900 pb-2">New Experiment</button>
        </div>
      )}
    </main>
  );
} 