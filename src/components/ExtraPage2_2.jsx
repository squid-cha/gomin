import React, { useState, useEffect } from 'react';
// src/assets/배경ExtraPage2_2.png 이미지를 불러옵니다.
import bgImage from '../assets/배경ExtraPage2_2.png';

const FULL_TEXT = '이모님이 낡은 주문서를 건넨다.\n"왔어? 자, 딱 골라!"';

export default function ExtraPage2_2({ onNext }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < FULL_TEXT.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + FULL_TEXT[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 45); // 한 글자당 출력 속도 (ms)

            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    return (
        /* Page1, ExtraPage1과 동일한 360x800 피그마 도화지 레이아웃 (정중앙 배치) */
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
                alt="가벼운 고민 배경"
            />

            {/* 2. 안내 카드 반투명 배경 (Glassmorphism) */}
            <div
                style={{
                    width: 302,
                    height: 70,
                    left: 30,
                    top: 583,
                    position: 'absolute',
                    background: 'rgba(217, 217, 217, 0.55)',
                    borderRadius: 5,
                }}
            />

            {/* 3. 안내 문구 영역 (타이핑 효과 적용) */}
            <div
                style={{
                    width: 342,
                    left: 10,
                    top: 600,
                    position: 'absolute',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: '400',
                    lineHeight: '16px',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line'
                }}
            >
                {displayedText}
                {/* 타이핑 진행 중에만 깜빡이는 커서 노출 */}
                {currentIndex < FULL_TEXT.length && (
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