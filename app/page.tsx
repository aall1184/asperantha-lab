"use client";
import { useState } from "react";

export default function AsperanzaUltimateLab() {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [prefs, setPrefs] = useState({ acid: 0, body: 0, sweet: 0, roast: 0 });

  const questions = [
    {
      q: "ما هي الأداة التي ستستخدمينها لتحضير فنّك؟",
      options: [
        { t: "V60 / كيمكس (حار)", v: { acid: 3, body: 1 } },
        { t: "V60 (بارد / Ice Drip)", v: { acid: 4, sweet: 2 } },
        { t: "إسبريسو (Black)", v: { body: 4, sweet: 2 } },
        { t: "مشروبات الحليب (لاتيه/كورتادو)", v: { body: 5, sweet: 3 } },
      ]
    },
    {
      q: "ما هو الوقت الذي يمثّل ذروة إبداعك؟",
      options: [
        { t: "الفجر (أحتاج وضوح عالي)", v: { acid: 3 } },
        { t: "الظهيرة (أحتاج طاقة مستمرة)", v: { body: 2, sweet: 2 } },
        { t: "المساء (أحتاج روقان هادئ)", v: { sweet: 4 } },
      ]
    },
    {
      q: "في عالم العطور، أي خط تفضلين؟",
      options: [
        { t: "الحمضيات والأزهار المنعشة", v: { acid: 4, sweet: 1 } },
        { t: "المسك، العود، والروائح الخشبية", v: { body: 4 } },
        { t: "الفانيلا والروائح السكرية", v: { sweet: 4 } },
      ]
    },
    {
      q: "كيف تصفين ذائقتك في الفواكه؟",
      options: [
        { t: "أحب لسعة الحموضة (توت/كرز)", v: { acid: 5 } },
        { t: "أحب الحلاوة القوية (مانجو/تمر)", v: { sweet: 5 } },
        { t: "أحب الطعم المتزن (تفاح/عنب)", v: { acid: 2, sweet: 2, body: 2 } },
      ]
    }
  ];

  const handleChoice = (val: any) => {
    setPrefs({
      acid: prefs.acid + (val.acid || 0),
      body: prefs.body + (val.body || 0),
      sweet: prefs.sweet + (val.sweet || 0),
      roast: prefs.roast + (val.roast || 0),
    });
    setStep(step + 1);
  };

  // خوارزمية حساب النسب الاحترافية (Blending Logic)
  const calculateBlend = () => {
    const total = prefs.acid + prefs.body + prefs.sweet;
    const eth = Math.round((prefs.acid / total) * 100) || 25;
    const bra = Math.round((prefs.body / total) * 100) || 25;
    const col = Math.round((prefs.sweet / total) * 100) || 25;
    const sum = 100 - (eth + bra + col);
    return { eth, bra, col, sum: sum < 0 ? 0 : sum };
  };

  const blend = calculateBlend();

  return (
    <main className="min-h-screen bg-[#0a0c10] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px]"></div>
      </div>

      {step === 0 && (
        <div className="z-10 text-center animate-in fade-in zoom-in duration-700">
          <h1 className="text-9xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-4">ASPERANZA</h1>
          <p className="text-blue-400 tracking-[0.8em] uppercase text-sm mb-12">The Master Architect of Coffee</p>
          <input 
            type="text" placeholder="ما هو اسمك؟" 
            className="block mx-auto bg-white/5 border-2 border-white/10 p-5 rounded-2xl mb-6 w-80 text-center text-xl focus:border-blue-500 outline-none transition-all"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => userName && setStep(1)} className="px-16 py-5 bg-blue-600 hover:bg-purple-600 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(37,99,235,0.4)]">
            دخول المختبر
          </button>
        </div>
      )}

      {step > 0 && step <= questions.length && (
        <div className="z-10 max-w-3xl w-full">
          <p className="text-blue-500 font-mono text-sm mb-2 uppercase tracking-widest text-center">Step {step} / {questions.length}</p>
          <h2 className="text-5xl font-light text-center mb-12 leading-tight">{questions[step-1].q}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions[step-1].options.map((opt, i) => (
              <button 
                key={i} onClick={() => handleChoice(opt.v)}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl text-right hover:bg-gradient-to-l hover:from-blue-900/40 hover:to-purple-900/40 hover:border-blue-500 transition-all duration-300 group"
              >
                <span className="text-xl group-hover:text-blue-300 transition-colors">{opt.t}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step > questions.length && (
        <div className="z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-bottom-10 duration-1000">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 font-black text-6xl italic">LAB-001</div>
            <h3 className="text-blue-400 font-mono mb-2 uppercase tracking-widest">Master Blend Result</h3>
            <h2 className="text-6xl font-black mb-8 italic">{userName}'s Formula</h2>
            
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <span className="text-zinc-400 uppercase text-xs">إثيوبيا (حمضية وفاكهية)</span>
                  <span className="text-2xl font-bold text-blue-400">{blend.eth}%</span>
               </div>
               <div className="w-full h-1 bg-white/10 rounded-full"><div className="h-full bg-blue-500" style={{width: `${blend.eth}%`}}></div></div>

               <div className="flex justify-between items-end">
                  <span className="text-zinc-400 uppercase text-xs">البرازيل (قوام وشوكولاتة)</span>
                  <span className="text-2xl font-bold text-purple-400">{blend.bra}%</span>
               </div>
               <div className="w-full h-1 bg-white/10 rounded-full"><div className="h-full bg-purple-500" style={{width: `${blend.bra}%`}}></div></div>

               <div className="flex justify-between items-end">
                  <span className="text-zinc-400 uppercase text-xs">كولومبيا (حلاوة متزنة)</span>
                  <span className="text-2xl font-bold text-white">{blend.col}%</span>
               </div>
               <div className="w-full h-1 bg-white/10 rounded-full"><div className="h-full bg-white" style={{width: `${blend.col}%`}}></div></div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
             <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-3xl">
                <h4 className="text-blue-400 font-bold mb-4 italic">توصية المهندس:</h4>
                <p className="text-lg text-zinc-300 leading-relaxed italic">
                  بناءً على تفضيلك لـ {questions[0].options.find((o,i)=>i===0)?.t}، قمنا برفع نسبة {blend.eth > 40 ? "البن الإثيوبي لتعزيز الإيحاءات العطرية." : "البن البرازيلي لضمان قوام مخملي."}
                </p>
             </div>
             <button className="w-full py-6 bg-white text-black rounded-[2rem] font-black text-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                اعتماد وتجهيز الخلطة
             </button>
          </div>
        </div>
      )}
    </main>
  );
}