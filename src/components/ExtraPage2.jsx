import React from 'react';
// src/assets/배경ExtraPage2.png (또는 사용하시는 배경 이미지 경로)를 불러옵니다.
import bgImage from '../assets/배경ExtraPage2.png';

export default function ExtraPage2({ onNext }) {
    return (
        /* Page1, ExtraPage1과 동일한 360x800 피그마 도화지 레이아웃 (정중앙 배치) 
           최상위 div에 onClick={onNext}를 추가하여 아무 곳이나 클릭해도 다음 페이지로 이동합니다. */
        <div
            onClick={onNext}
            style={{
                width: 360,
                height: 800,
                position: 'relative',
                background: 'white',
                overflow: 'hidden',
                cursor: 'pointer' // 클릭 가능함을 시각적으로 안내
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
                alt="가벼운 고민 배경"
            />

            {/* 2. 안내 카드 반투명 배경 (Glassmorphism) */}
            <div
                style={{
                    width: 302,
                    height: 96,
                    left: 30,
                    top: 608,
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
                    top: 623,
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
                오늘도 어김없이 찾아온 결정장애. <br />
                혼자 머리를 쥐어뜯다 <br />
                결국 또 익숙한 빨간 천막을 들치고 말았다. <br />
                그래, 내 가벼운 고민 정도는 이모님이 맛있게 볶아주시겠지.
            </div>

        </div>
    );
}