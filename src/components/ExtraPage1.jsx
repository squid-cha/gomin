import React from 'react';
// src/assets/bg.png 이미지를 번들 변수로 안전하게 불러옵니다.
import bgImage from '../assets/배경ExtraPage1.png';

export default function ExtraPage1({ onNext }) {
    return (
        // Page1_Splash와 동일한 360x800 피그마 도화지 레이아웃 (정중앙 배치)
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

            {/* 1. 배경 이미지 영역 (import로 안전하게 연결) */}
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

            {/* 2. 어두운 그라데이션 오버레이 (텍스트 가독성 확보) */}
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

            {/* 4. 안내 문구 영역 */}
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
                    wordWrap: 'break-word'
                }}
            >
                어서오십시오.<br />
                당신의 선택을 완벽하게 맛보게 해드리는<br />
                &apos;고민 미식회&apos;입니다.<br />
                고민이 있으시다면, 의뢰서를 작성해주세요.
            </div>

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