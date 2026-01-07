"use client";
import { useState } from "react";

// ألوان مستوحاة من محمصة بلاك نايت (الأسود والذهبي)
const BEANS = {
  A: { name: "أثيوبي (فاكهي)", color: "bg-[#D4AF37]", text: "text-[#D4AF37]" },
  B: { name: "كولومبي (كلاسيكي)", color: "bg-[#B8860B]", text: "text-[#B8860B]" },
  C: { name: "برازيلي (شوكولاتة)", color: "bg-[#AA8439]", text: "text-[#AA8439]" },
  D: { name: "إندونيسي (توابل)", color: "bg-[#8A6D3B]", text: "text-[#8A6D3B]" }
};

const questions = [
  { id: 1, text: "كيف تفضل بداية يومك؟", options: [{ t: "انتعاش وحيوية", s: "A" }, { t: "هدوء وعمق", s: "B" }, { t: "تأمل صامت", s: "C" }, { t: "إنجاز مكثف", s: "D" }] },
  { id: 2, text: "ما هو الإيحاء المفضل لديك؟", options: [{ t: "ياسمين وفواكه", s: "A" }, { t: "عسل كراميل", s: "B" }, { t: "مكسرات داكنة", s: "C" }, { t: "بهارات وتراب", s: "D" }] },
  { id: 3, text: "القوام (Body) المثالي؟", options: [{ t: "خفيف حريري", s: "A" }, { t: "متوسط متزن", s: "B" }, { t: "كريمي كثيف", s: "C" }, { t: "ثقيل جداً", s: "D" }] },
  { id: 4, text: "درجة حمضية القهوة؟", options: [{ t: "بارزة جداً", s: "A" }, { t: "متوسطة الحلاوة", s: "B" }, { t: "منخفضة جداً", s: "C" }, { t: "شبه منعدمة", s: "D" }] },
  { id: 5, text: "نوع مشروبك المعتاد؟", options: [{ t: "V60 / Cold Brew", s: "A" }, { t: "Aeropress", s: "B" }, { t: "Cortado / Latte", s: "C" }, { t: "Espresso", s: "D" }] },
  { id: 6, text: "نهاية الطعم (Aftertaste)؟", options: [{ t: "نظيف وسريع", s: "A" }, { t: "حلاوة متبقية", s: "B" }, { t: "مرارة محببة", s: "C" }, { t: "نكهة معقدة", s: "D" }] },
  { id: 7, text: "درجة التحميص المفضلة؟", options: [{ t: "Light Roast", s: "A" }, { t: "Medium Roast", s: "B" }, { t: "Medium-Dark", s: "C" }, { t: "Dark Roast", s: "D" }] },
  { id: 8, text: "الهدف من الكوب الآن؟", options: [{ t: "استكشاف سلالة", s: "A" }, { t: "تعديل مزاج", s: "B" }, { t: "تركيز للعمل", s: "C" }, { t: "استمتاع ختامي", s: "D" }] }
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
    <main className="min-h-screen bg-black text-white p-6 font-sans flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-[#B8860B]/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        {/* LOGO SECTION */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Lab Logo" 
              className="w-24 h-24 rounded-full border border-[#D4AF37]/30 object-cover shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <h2 className="text-[#D4AF37] text-[10px] tracking-[1.2em] uppercase font-bold">Black Knight Style</h2>
            <h1 className="text-6xl font-black italic tracking-tighter">ASPERANZA <span className="text-[#D4AF37]">CORE</span></h1>
            <div className="flex flex-col items-center gap-6">
              <input 
                type="text" 
                placeholder="ادخل اسمك هنا..." 
                className="bg-transparent border-b border-[#D4AF37]/30 p-4 w-72 text-center outline-none focus:border-[#D4AF37] transition-all text-xl placeholder:text-gray-700"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={() => userName && setStep(1)} className="px-12 py-4 bg-[#D4AF37] text-black font-black rounded-sm text-[11px] tracking-widest hover:bg-[#B8860B] transition-colors shadow-xl">ACCESS THE LAB</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <h2 className="text-4xl font-light">مرحباً بك، <span className="text-[#D4AF37] font-bold uppercase">{userName}</span></h2>
            <p className="text-gray-500 text-sm tracking-widest">سنبدأ الآن تحليل ذائقتك لإيجاد بلند "الفارس الأسود" المثالي لك.</p>
            <button onClick={() => setStep(2)} className="px-12 py-4 border border-[#D4AF37] text-[#D4AF37] text-[10px] tracking-[0.4em] rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all">START ANALYSIS</button>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-right">
            <div className="space-y-10">
              <span className="text-[#D4AF37] text-[10px] tracking-widest font-bold border-b border-[#D4AF37] pb-1">STAGE 0{currentQ + 1} / 08</span>
              <h2 className="text-3xl font-bold leading-tight text-gray-100">{questions[currentQ].text}</h2>
              <div className="grid gap-4">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt.s)} className="p-5 border border-gray-800 bg-gray-900/50 rounded-sm hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-sm text-gray-400 hover:text-white text-right px-8">
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] p-10 border border-gray-800 rounded-lg shadow-2xl">
               <h3 className="text-center text-[10px] tracking-widest text-[#D4AF37] mb-10 uppercase font-bold">Live Blending Ratios</h3>
               <div className="space-y-8">
                  {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                    <div key={key} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span className="uppercase tracking-tighter">{BEANS[key].name}</span>
                        <span className="text-[#D4AF37]">{Math.round(ratios[key])}%</span>
                      </div>
                      <div className="h-[2px] bg-gray-900 w-full overflow-hidden">
                        <div className={`h-full ${BEANS[key].color} transition-all duration-1000 shadow-[0_0_15px_rgba(212,175,55,0.4)]`} style={{ width: `${ratios[key]}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-700">
            <h2 className="text-[#D4AF37] text-[11px] tracking-[0.8em] font-bold uppercase">Mission Accomplished</h2>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase">{userName}'S SIGNATURE</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(Object.keys(ratios) as Array<keyof typeof ratios>).map(key => (
                <div key={key} className="p-8 bg-gray-900/40 border border-gray-800 rounded-sm group hover:border-[#D4AF37] transition-all">
                  <span className={`text-3xl font-bold block mb-2 ${BEANS[key].text}`}>{Math.round(ratios[key])}%</span>
                  <span className="text-[9px] text-gray-600 tracking-widest uppercase font-bold">{BEANS[key].name}</span>
                </div>
              ))}
            </div>

            <div className="p-12 border border-[#D4AF37]/20 bg-[#0A0A0A] rounded-sm inline-block shadow-2xl">
              <span className="text-[10px] text-gray-500 tracking-[0.4em] block mb-4 uppercase">Unique DNA Key</span>
              <div className="text-5xl font-mono font-bold text-[#D4AF37] uppercase tracking-[0.2em]">{blendCode}</div>
            </div>

            <div className="flex justify-center gap-6 pt-6">
               <button onClick={() => window.location.reload()} className="px-14 py-4 bg-white text-black text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#D4AF37] transition-all">RE-INITIALIZE</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 