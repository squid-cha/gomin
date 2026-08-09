import React, { useState } from 'react';
import Page1_Splash from './components/Page1_Splash';
import ExtraPage1 from './components/ExtraPage1';
import Page2_Input from './components/Page2_Input';
import Page3_Loading from './components/Page3_Loading';
import Page4_TastingNote from './components/Page4_TastingNote';
import Page5_Receipt from './components/Page5_Receipt';
import { MOCK_TASTING_NOTE } from './mockData'; // 또는 가짜 데이터 직접 전달

function App() {
  // 1 ~ 5 단계 페이지 전환 상태
  const [step, setStep] = useState(1);

  // 다음 페이지로 이동하는 함수
  const handleNext = () => setStep((prev) => prev + 1);

  // 처음으로 돌아가는 함수
  const handleReset = () => setStep(1);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* 모바일 뷰 감싸기 (가로 390px 표준) */}
      <div className="w-full max-w-sm min-h-[700px] bg-black rounded-3xl p-6 flex flex-col justify-between shadow-2xl border border-gray-800">

        {/* 상단 스텝 표시기 (개발 확인용) */}
        <div className="text-xs text-gray-500 text-center mb-4">
          현재 단계: {step} / 6
        </div>

        {/* step 값에 따른 조건부 화면 렌더링 */}
        {/* step 값에 따른 조건부 화면 렌더링 */}
        {step === 1 && <Page1_Splash onNext={handleNext} />}
        {step === 2 && <ExtraPage1 onNext={handleNext} />}
        {step === 3 && <Page2_Input onNext={handleNext} />}
        {step === 4 && <Page3_Loading onNext={handleNext} />}
        {step === 5 && <Page4_TastingNote onNext={handleNext} data={MOCK_TASTING_NOTE} />}
        {step === 6 && <Page5_Receipt onReset={handleReset} />}

      </div>
    </div>
  );
}

export default App;