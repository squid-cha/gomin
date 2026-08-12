import React from 'react';
// src/assets/배경ExtraPage2.png (또는 사용하시는 배경 이미지 경로)를 불러옵니다.
import bgImage from '../assets/배경ExtraPage3_2.png';

export default function ExtraPage3_2({ onNext }) {
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
                alt="무거운 고민 배경"
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

            {/* 3. 안내 문구 영역 */}
            <div
                style={{
                    width: 342,
                    left: 10,
                    top: 595,
                    position: 'absolute',
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 12,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: '400',
                    lineHeight: '16px',
                    wordWrap: 'break-word'
                }}
            >
                직원이 메뉴판을 건넨다. <br />
                "아가씨, 오셨습니까. 당신만을 위한<br />
                완벽한 메뉴가 준비되어 있습니다."
            </div>

            {/* 4. 다음으로 넘어가기 버튼 (ExtraPage1과 유사하게 추가) */}
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