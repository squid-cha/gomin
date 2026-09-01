import React, { useState, useEffect } from 'react';
// src/assets/배경ExtraPage3_2.png 이미지를 불러옵니다.
import bgImage from '../assets/배경ExtraPage3_2.png';

const FULL_TEXT = '직원이 메뉴판을 건넨다.\n"아가씨, 오셨습니까. 당신만을 위한\n완벽한 메뉴가 준비되어 있습니다."';

export default function ExtraPage3_2({ onNext }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const isTyping = currentIndex < FULL_TEXT.length;

    useEffect(() => {
        if (currentIndex < FULL_TEXT.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + FULL_TEXT[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 45); // 글자당 출력 속도 (ms)

            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    return (
        /* 360x800 피그마 도화지 레이아웃 (정중앙 배치) */
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
                alt="무거운 고민 배경"
            />

            {/* 2. 안내 카드 반투명 배경 (블러 제거) */}
            <div
                style={{
                    width: 302,
                    height: 74,
                    left: 30,
                    top: 581,
                    position: 'absolute',
                    background: 'rgba(217, 217, 217, 0.65)',
                    borderRadius: 5
                }}
            />

            {/* 3. 안내 문구 영역 (수직/수평 중앙 정렬 적용) */}
            <div
                style={{
                    width: 302,
                    height: 74,
                    left: 30,
                    top: 581,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: '500',
                    lineHeight: '17px',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                    padding: '0 10px',
                    boxSizing: 'border-box'
                }}
            >
                <div>
                    {displayedText}
                    {/* 타이핑 진행 중에만 깜빡이는 커서 노출 */}
                    {isTyping && (
                        <span
                            style={{
                                display: 'inline-block',
                                marginLeft: 2,
                                width: 2,
                                height: 12,
                                background: '#000000',
                                verticalAlign: 'middle',
                                animation: 'blink 0.8s infinite'
                            }}
                        />
                    )}
                </div>
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

            {/* 4. 다음으로 넘어가기 버튼 */}
            <button
                onClick={onNext}
                style={{
                    position: 'absolute',
                    left: 27,
                    top: 670,
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
                메뉴판 확인하기
            </button>

        </div>
    );
}