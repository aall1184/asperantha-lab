"use client";
import { useState } from "react";

// تعريف الأسئلة
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
  }
];

export default function Home() {
  const [step, setStep] = useState(0); // 0: welcome, 1: questions, 2: result
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ drip: 0, espresso: 0 });

  const handleAnswer = (type: string) => {
    setScores({ ...scores, [type]: scores[type as keyof typeof scores] + 1 });
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep(2);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex flex-col items-center justify-center p-6">
      {/* 1. شاشة الترحيب */}
      {step === 0 && (
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-extralight text-white">ASPERANZA <span className="text-amber-600">LAB</span></h1>
          <button onClick={() => setStep(1)} className="px-8 py-3 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition-all">دخول المختبر</button>
        </div>
      )}

      {/* 2. شاشة الأسئلة */}
      {step === 1 && (
        <div className="w-full max-w-xl bg-[#111] p-10 rounded-2xl border border-white/5">
          <p className="text-amber-500 mb-2">السؤال {currentQ + 1} من {questions.length}</p>
          <h2 className="text-2xl mb-8">{questions[currentQ].text}</h2>
          <div className="flex flex-col gap-4">
            {questions[currentQ].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.score)} className="text-right p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-600 transition-all">
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. شاشة النتيجة */}
      {step === 2 && (
        <div className="text-center space-y-6 animate-in zoom-in duration-500">
          <h2 className="text-3xl font-light">بناءً على تحليلك المخبري..</h2>
          <div className="p-10 bg-amber-600/10 border border-amber-600 rounded-3xl">
            <h3 className="text-5xl font-bold text-amber-500 mb-4">
              {scores.drip > scores.espresso ? "V60 - Ethiopia" : "Double Espresso"}
            </h3>
            <p className="text-gray-300">هذه القهوة تناسب كيمياء يومك الحالية.</p>
          </div>
          <button onClick={() => window.location.reload()} className="text-sm underline text-gray-500">إعادة التحليل</button>
        </div>
      )}
    </main>
  );
} 