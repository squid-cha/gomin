import React, { useState, useEffect } from 'react';
// src/assets/배경ExtraPage3.png 이미지를 불러옵니다.
import bgImage from '../assets/배경ExtraPage3.png';

// 1단계 문구와 2단계 문구 분리 정의
const SCRIPT_STEPS = [
    "은은한 샹들리에 조명 아래,\n나를 향해 정중히 고개를 숙이는 직원들.",
    '"이쪽으로 모시겠습니다, 아가씨."'
];

export default function ExtraPage3({ onNext }) {
    // textStep: 0 (첫 문장) -> 1 (두 번째 문장)
    const [textStep, setTextStep] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentFullText = SCRIPT_STEPS[textStep];
    const isTyping = currentIndex < currentFullText.length;

    // 타이핑 애니메이션 효과
    useEffect(() => {
        if (currentIndex < currentFullText.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + currentFullText[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 45); // 글자 출력 속도 (ms)

            return () => clearTimeout(timer);
        }
    }, [currentIndex, currentFullText]);

    // 화면 어디든 클릭/터치했을 때의 인터랙션 처리
    const handleScreenClick = () => {
        // 1. 아직 타이핑 중인 경우: 클릭 즉시 전체 문장을 완성
        if (isTyping) {
            setDisplayedText(currentFullText);
            setCurrentIndex(currentFullText.length);
            return;
        }

        // 2. 첫 번째 문장 타이핑이 끝난 상태에서 클릭: 다음 문장(Step 1)으로 전환
        if (textStep === 0) {
            setTextStep(1);
            setDisplayedText('');
            setCurrentIndex(0);
            return;
        }

        // 3. 두 번째 문장까지 모두 끝난 상태에서 클릭: 다음 단계(onNext)로 이동
        if (textStep === 1) {
            if (onNext) onNext();
        }
    };

    return (
        /* Page1, ExtraPage1과 동일한 360x800 피그마 규격 프레임 고정 (화면 클릭 시 handleScreenClick 동작) */
        <div
            onClick={handleScreenClick}
            style={{
                width: 360,
                height: 800,
                position: 'relative',
                background: 'white',
                overflow: 'hidden',
                cursor: 'pointer',
                userSelect: 'none'
            }}
        >
            {/* 1. 배경 이미지 영역 */}
            <img
                style={{
                    width: 360,
                    height: 800,
                    left: 0,
                    top: 0,
                    position: 'absolute',
                    objectFit: 'cover'
                }}
                src={bgImage}
                alt="무거운 고민 배경"
            />

            {/* 2. 안내 카드 반투명 배경 (블러 제거) */}
            <div
                style={{
                    width: 302,
                    height: 96,
                    left: 30,
                    top: 608,
                    position: 'absolute',
                    background: 'rgba(217, 217, 217, 0.65)',
                    borderRadius: 5
                }}
            />

            {/* 3. 대사 안내 문구 영역 (수직/수평 정중앙 정렬 적용) */}
            <div
                style={{
                    width: 302,
                    height: 96,
                    left: 30,
                    top: 608,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 13,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: '500',
                    lineHeight: '18px',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                    padding: '0 15px',
                    boxSizing: 'border-box'
                }}
            >
                <div>
                    {displayedText}

                    {/* 타이핑 중일 때 깜빡이는 커서 바 */}
                    {isTyping && (
                        <span
                            style={{
                                display: 'inline-block',
                                marginLeft: 2,
                                width: 2,
                                height: 13,
                                background: '#000000',
                                verticalAlign: 'middle',
                                animation: 'blink 0.8s infinite'
                            }}
                        />
                    )}
                </div>
            </div>

            {/* 타이핑 완료 시 다음 입력을 안내하는 작은 깜빡임 화살표 (▼) */}
            {!isTyping && (
                <div
                    style={{
                        position: 'absolute',
                        right: 42,
                        bottom: 102,
                        fontSize: 10,
                        color: 'rgba(0, 0, 0, 0.5)',
                        animation: 'bounce 1s infinite'
                    }}
                >
                    ▼
                </div>
            )}

            {/* 애니메이션 키프레임 정의 */}
            <style>
                {`
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); opacity: 0.4; }
                        50% { transform: translateY(3px); opacity: 0.9; }
                    }
                `}
            </style>
        </div>
    );
}