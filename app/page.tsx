"use client";
import { useState } from "react";

// 1. تعريف مصفوفة الأسئلة (بيانات المختبر)
const questions = [
  {
    id: 1,
    text: "كيف تصف صباحك المثالي؟",
    options: [
      { text: "هدوء تام وتركيز عميق 🧘‍♂️", score: "drip" },
      { text: "طاقة وانفجار إبداعي ⚡", score: "espresso" }
    ]
  },
  {
    id: 2,
    text: "ما هو المذاق الذي يميل له قلبك؟",
    options: [
      { text: "حمضية فاكهية واضحة 🍓", score: "drip" },
      { text: "قوام ثقيل وإيحاء شوكولاتة 🍫", score: "espresso" }
    ]
  },
  {
    id: 3,
    text: "كيف تحب أن يكون ملمس القهوة؟",
    options: [
      { text: "خفيف مثل الشاي ☕", score: "drip" },
      { text: "كثيف ومخملي ✨", score: "espresso" }
    ]
  }
];

export default function Home() {
  // 2. تعريف حالات الصفحة (States)
  const [step, setStep] = useState(0); // 0: الترحيب، 1: الأسئلة، 2: النتيجة
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ drip: 0, espresso: 0 });

  // 3. دالة معالجة الإجابات
  const handleAnswer = (type: string) => {
    // تحديث النقاط بناءً على نوع الإجابة
    const newScores = { ...scores, [type]: scores[type as keyof typeof scores] + 1 };
    setScores(newScores);

    // الانتقال للسؤال التالي أو عرض النتيجة
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(2);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* --- شاشة الترحيب --- */}
      {step === 0 && (
        <div className="text-center space-y-6 animate-in fade-in duration-1000">
          <h1 className="text-6xl font-extralight tracking-tighter text-white">
            ASPERANZA <span className="text-amber-600">LAB</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto font-light leading-relaxed">
            مرحباً بكِ في مختبر هندسة الذائقة. 
            دعينا نحلل كيمياء يومكِ لنختار قهوتكِ المثالية.
          </p>
          <button 
            onClick={() => setStep(1)}
            className="mt-8 px-8 py-3 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-full text-sm tracking-widest"
          >
            دخول المختبر
          </button>
        </div>
      )}

      {/* --- شاشة الأسئلة التفاعلية --- */}
      {step === 1 && (
        <div className="w-full max-w-xl bg-[#111] p-10 rounded-3xl border border-white/5 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xs tracking-widest text-amber-500 uppercase">Question {currentQ + 1} / {questions.length}</span>
            <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600 transition-all duration-500" 
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                ></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-light mb-10 leading-tight">{questions[currentQ].text}</h2>
          
          <div className="flex flex-col gap-4">
            {questions[currentQ].options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleAnswer(opt.score)}
                className="text-right p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-600 hover:bg-amber-600/5 transition-all duration-300 group"
              >
                <span className="group-hover:text-white transition-colors">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- شاشة النتيجة النهائية --- */}
      {step === 2 && (
        <div className="text-center space-y-8 animate-in zoom-in duration-700">
          <div className="space-y-2">
            <h2 className="text-sm tracking-[0.3em] text-amber-500 uppercase">Analysis Complete</h2>
            <h3 className="text-4xl font-light">النتيجة المخبرية:</h3>
          </div>

          <div className="relative p-12 bg-gradient-to-b from-amber-600/20 to-transparent border border-amber-600/30 rounded-[3rem] overflow-hidden">
            <h4 className="text-6xl font-bold text-white mb-4">
              {scores.drip >= scores.espresso ? "V60 Ethiopia" : "Espresso Blend"}
            </h4>
            <p className="text-amber-200/70 font-light italic">
              {scores.drip >= scores.espresso 
                ? "إيحاءات فاكهية، قوام خفيف، وصفاء ذهني." 
                : "قوام غني، إيحاءات مكسرات، وطاقة مكثفة."}
            </p>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="text-xs tracking-widest text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            إعادة الفحص المجهري
          </button>
        </div>
      )}
    </main>
  );
} 