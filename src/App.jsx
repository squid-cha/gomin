import React, { useState, useEffect } from 'react';
import Page1_Splash from './components/Page1_Splash';
import ExtraPage1 from './components/ExtraPage1';
import Page2_Input from './components/Page2_Input';
import ExtraPage2 from './components/ExtraPage2';
import ExtraPage2_1 from './components/ExtraPage2_2'; // 가벼운 고민 2번째 브릿지
import ExtraPage3 from './components/ExtraPage3';   // 무거운 고민 1번째 브릿지
import ExtraPage3_1 from './components/ExtraPage3_2'; // 무거운 고민 2번째 브릿지
import Page3_Menu from './components/Page3_Menu';     // 메뉴판
import Page4_Receipt from './components/Page4_Receipt';

// 🤖 실제 AI 서비스 함수 import
import { getTastingAnalysis } from './services/aiService';

function App() {
  // 1. 현재 화면 단계 관리
  const [step, setStep] = useState(1);

  // 2. 공유 링크로 들어온 방문자(B)인지 여부 플래그
  const [isSharedView, setIsSharedView] = useState(false);

  // 3. 유저가 입력한 고민 데이터 및 결과 관리
  const [userData, setUserData] = useState({
    nickname: '',
    worryType: 'light',
    optionA: '',
    optionB: '',
    selectedOption: null,
    brainMelt: 85,
    tasteSummary: '',
    aiResult: null // 👈 AI가 생성한 분석 결과 보관함
  });

  // 🔗 🎯 B가 공유 링크를 타고 들어왔을 때 URL 파라미터 감지 및 영수증(step 9) 직행
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('shared') === 'true') {
      const sharedData = {
        nickname: params.get('name') || '친구',
        optionA: params.get('optA') || '메뉴A',
        optionB: params.get('optB') || '메뉴B',
        selectedOption: params.get('selected') || params.get('optA') || '메뉴A',
        brainMelt: params.get('melt') ? Number(params.get('melt')) : 85,
        worryType: params.get('type') || 'light'
      };

      setUserData((prev) => ({ ...prev, ...sharedData }));
      setIsSharedView(true);
      setStep(9); // 바로 Page4_Receipt 단계로 이동
    }
  }, []);

  // 다음 단계 이동 함수
  const handleNext = () => setStep((prev) => prev + 1);

  // 이전/처음으로 리셋 함수
  const handleReset = () => {
    window.history.replaceState({}, '', window.location.pathname);
    setIsSharedView(false);
    setUserData({
      nickname: '',
      worryType: 'light',
      optionA: '',
      optionB: '',
      selectedOption: null,
      brainMelt: 85,
      tasteSummary: '',
      aiResult: null
    });
    setStep(1);
  };

  // 🤖 Page2_Input에서 제출 시: 브릿지 화면으로 넘어가면서 백그라운드 AI 호출 시작
  const handleInputSubmit = async (formData) => {
    setUserData((prev) => ({ ...prev, ...formData }));

    // 1. 화면은 브릿지 페이지로 먼저 이동
    if (formData.worryType === 'light') {
      setStep(4); // ExtraPage2
    } else {
      setStep(6); // ExtraPage3
    }

    // 2. 브릿지 화면을 보고 있는 동안 백그라운드에서 AI 요청
    try {
      const aiData = await getTastingAnalysis(
        formData.optionA,
        formData.optionB,
        formData.worryType
      );

      // 3. 분석 결과를 userData에 보관
      setUserData((prev) => ({
        ...prev,
        aiResult: aiData
      }));
    } catch (err) {
      console.error('AI 분석 실패:', err);
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

        {/* 8. 메뉴판 화면 */}
        {step === 8 && (
          <Page3_Menu
            userData={userData}
            onNext={(selectedData) => {
              if (typeof selectedData === 'object' && selectedData !== null) {
                setUserData((prev) => ({
                  ...prev,
                  selectedOption: selectedData.selectedOption,
                  brainMelt: selectedData.brainMelt,
                  tasteSummary: selectedData.tasteSummary
                }));
              } else {
                setUserData((prev) => ({
                  ...prev,
                  selectedOption: selectedData,
                  brainMelt: selectedData === prev.optionB ? 15 : 85
                }));
              }
              setStep(9); // Page4_Receipt(영수증) 단계로 이동
            }}
          />
        )}

        {/* 9. 영수증 및 공유하기 */}
        {step === 9 && (
          <Page4_Receipt
            userData={userData}
            isSharedView={isSharedView}
            onReset={handleReset}
          />
        )}

      </div>
    </div>
  );
}

export default App;