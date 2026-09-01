import React, { useState, useEffect } from 'react';
// src/assets/배경ExtraPage1.png 이미지를 번들 변수로 안전하게 불러옵니다.
import bgImage from '../assets/배경ExtraPage1.png';

const FULL_TEXT = "어서오십시오.\n당신의 선택을 완벽하게 맛보게 해드리는\n'고민 미식회'입니다.\n고민이 있으시다면, 의뢰서를 작성해주세요.";

export default function ExtraPage1({ onNext }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < FULL_TEXT.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + FULL_TEXT[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 45); // 글자 출력 속도 (ms 단위, 조절 가능)

            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    return (
        // Page1_Splash와 동일한 360x800 피그마 도화지 레이아웃 (정중앙 배치)
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

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
                alt="고민 미식회 메인 배경"
            />

            {/* 2. 어두운 그라데이션 오버레이 */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 360,
                    height: 800,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)'
                }}
            />

            {/* 3. 안내 카드 반투명 배경 (Glassmorphism) */}
            <div
                style={{
                    width: 305,
                    height: 109,
                    left: 27,
                    top: 589,
                    position: 'absolute',
                    background: 'rgba(255, 255, 255, 0.55)',
                    borderRadius: 12,
                }}
            />

            {/* 4. 안내 문구 영역 (타이핑 애니메이션 적용) */}
            <div
                style={{
                    width: 262,
                    left: 49,
                    top: 603,
                    position: 'absolute',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: '700',
                    lineHeight: '20px',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line'
                }}
            >
                {displayedText}
                {/* 타이핑 중일 때 깜빡이는 커서 */}
                {currentIndex < FULL_TEXT.length && (
                    <span
                        style={{
                            display: 'inline-block',
                            marginLeft: 2,
                            width: 2,
                            height: 14,
                            background: '#000000',
                            verticalAlign: 'middle',
                            animation: 'blink 0.8s infinite'
                        }}
                    />
                )}
            </div>

            {/* 깜빡임 애니메이션 스타일 정의 */}
            <style>
                {`
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `}
            </style>

            {/* 5. 다음으로 넘어가기 버튼 */}
            <button
                onClick={onNext}
                style={{
                    position: 'absolute',
                    left: 27,
                    top: 705,
                    width: 305,
                    height: 50,
                    background: '#1F2329',
                    color: 'white',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
            >
                의뢰서 작성하기
            </button>

        </div>
    );
}