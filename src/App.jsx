import React, { useState } from 'react';
import Page1_Splash from './components/Page1_Splash';
import ExtraPage1 from './components/ExtraPage1';
import Page2_Input from './components/Page2_Input';
import ExtraPage2 from './components/ExtraPage2';
import ExtraPage2_1 from './components/ExtraPage2_2'; // 가벼운 고민 2번째 브릿지
import ExtraPage3 from './components/ExtraPage3';   // 무거운 고민 1번째 브릿지
import ExtraPage3_1 from './components/ExtraPage3_2'; // 무거운 고민 2번째 브릿지
import Page3_Menu from './components/Page3_Menu';     // 메뉴판 (상세보기 버튼 포함)
//import Page4_Detail from './components/Page4_Menu'; // 메뉴 상세보기
import Page5_Receipt from './components/Page5_Receipt';

function App() {
  // 1. 현재 화면 단계 관리
  const [step, setStep] = useState(1);

  // 2. 유저가 입력한 고민 데이터 및 고민 무게(light / heavy) 관리
  const [userData, setUserData] = useState({
    nickname: '',
    worryType: 'light', // 'light' (가벼운 고민) or 'heavy' (무거운 고민)
    optionA: '',
    optionB: '',
    selectedOption: null // Page4에서 선택한 최종 메뉴
  });

  // 다음 단계 이동 함수
  const handleNext = () => setStep((prev) => prev + 1);

  // 이전/처음으로 리셋 함수
  const handleReset = () => {
    setStep(1);
    setUserData({
      nickname: '',
      worryType: 'light',
      optionA: '',
      optionB: '',
      selectedOption: null
    });
  };

  // Page2_Input에서 제출 시 데이터를 받고 적절한 단계로 이동
  const handleInputSubmit = (formData) => {
    setUserData((prev) => ({ ...prev, ...formData }));

    // worryType에 따라 이동하는 step 지정
    if (formData.worryType === 'light') {
      setStep(4); // ExtraPage2 (가벼운 고민 흐름 진입)
    } else {
      setStep(6); // ExtraPage3 (무거운 고민 흐름 진입)
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* 360x800 피그마 규격 프레임 고정 */}
      <div className="w-[360px] h-[800px] relative bg-white overflow-hidden shadow-2xl">

        {/* 1. Splash 타이틀 화면 */}
        {step === 1 && <Page1_Splash onNext={handleNext} />}

        {/* 2. 세계관 안내 (ExtraPage1) */}
        {step === 2 && <ExtraPage1 onNext={handleNext} />}

        {/* 3. 닉네임, 고민유형(light/heavy), Option A/B 입력 (Page2) */}
        {step === 3 && <Page2_Input onNext={handleInputSubmit} />}

        {/* --- [가벼운 고민 흐름 (light)] --- */}
        {step === 4 && <ExtraPage2 onNext={handleNext} />}
        {step === 5 && <ExtraPage2_1 onNext={() => setStep(8)} />}

        {/* --- [무거운 고민 흐름 (heavy)] --- */}
        {step === 6 && <ExtraPage3 onNext={handleNext} />}
        {step === 7 && <ExtraPage3_1 onNext={() => setStep(8)} />}

        {/* 8. 메뉴판 화면 (worryType 전달받아 배경 전환) */}
        {step === 8 && (
          <Page3_Menu
            userData={userData}
            onNext={handleNext}
          />
        )}

        {/* 9. 메뉴 상세보기 (Page4) */}
        {step === 9 && (
          <Page4_Detail
            userData={userData}
            onNext={(selected) => {
              setUserData((prev) => ({ ...prev, selectedOption: selected }));
              setStep(10);
            }}
          />
        )}

        {/* 10. 영수증 및 공유하기 (Page5) */}
        {step === 10 && (
          <Page5_Receipt
            userData={userData}
            onReset={handleReset}
          />
        )}

      </div>
    </div>
  );
}

export default App;