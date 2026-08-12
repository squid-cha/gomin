import React, { useState } from 'react';

// 이미지 import
import bgMainImage from '../assets/배경Page2.png';
import cardBgImage from '../assets/menu.png';

export default function Page2_Input({ onNext }) {
    // 유저 입력값 상태 관리
    const [nickname, setNickname] = useState('');
    const [worryType, setWorryType] = useState('light'); // 'light' (가벼운 고민: 포차) or 'heavy' (무거운 고민: 레스토랑)
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');

    // 제출하기 버튼 클릭 시 동작
    const handleSubmit = () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력해주세요!');
            return;
        }
        if (!optionA.trim() || !optionB.trim()) {
            alert('고민 옵션 A와 B를 모두 작성해주세요!');
            return;
        }

        if (onNext) {
            onNext({
                nickname,
                worryType,
                optionA,
                optionB,
            });
        }
    };

    return (
        /* 360x800 피그마 도화지 레이아웃 (App.jsx 중앙 정렬 연동) */
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

            {/* ========================================================= */}
            {/* 📸 1. [전체 배경 이미지] top: 0부터 꽉 채우도록 위치 조정 */}
            {/* ========================================================= */}
            <img
                src={bgMainImage}
                alt="메인 배경"
                style={{
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0, // top: 105에서 0으로 고쳐서 윗부분 빈 공간을 완전 채움!
                    position: 'absolute',
                    objectFit: 'cover'
                }}
            />

            {/* ========================================================= */}
            {/* 📸 2. [중앙 메뉴판 카드 이미지] - 비치는 연한 카드 */}
            {/* ========================================================= */}
            {/* 💡 카드 이미지 자체의 opacity(투명도)를 주어 뒤의 bgMainImage가 비치게 함 */}
            <div style={{
                width: 362,
                height: 643,
                left: 0,
                top: 168,
                position: 'absolute',
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: '10px 4px 10px 10px rgba(0, 0, 0, 0.15)',
            }}>
                {/* menu.png 이미지 자체에 opacity를 줘서 뒤 배경이 그대로 비치게 만듭니다 */}
                <img
                    src={cardBgImage}
                    alt="메뉴판 카드"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.9, // 👈 0.45(45%) 정도로 연하게 만들어서 뒤의 bgMainImage가 비침! (0.3~0.7로 조절 가능)
                    }}
                />
            </div>

            {/* 3. 타이틀: 고민 의뢰서 */}
            <div style={{
                width: 200,
                left: 80,
                top: 90,
                position: 'absolute',
                textAlign: 'center',
                color: '#ffffff',
                fontSize: 26,
                fontFamily: 'Noto Sans KR',
                fontWeight: '700',
                lineHeight: '16px',
                wordWrap: 'break-word'
            }}>
                고민 의뢰서
            </div>

            {/* --- 섹션 1: 닉네임 입력 --- */}
            <div style={{
                width: 281,
                left: 37,
                top: 180,
                position: 'absolute',
                textAlign: 'center',
                color: '#1F2329',
                fontSize: 14,
                fontFamily: 'Noto Sans KR',
                fontWeight: '500',
                lineHeight: '16px'
            }}>
                당신의 닉네임을 입력해주세요.
            </div>

            {/* 닉네임 입력 박스 */}
            <div style={{
                width: 249,
                height: 49,
                left: 55,
                top: 210,
                position: 'absolute',
                background: '#DEC9AE',
                borderRadius: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px'
            }}>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임 입력"
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        color: '#1F2329',
                        fontSize: 14,
                        fontFamily: 'Noto Sans KR',
                        fontWeight: '700'
                    }}
                />
            </div>

            {/* --- 섹션 2: 고민 무게 선택 (가벼운 고민 VS 무거운 고민) --- */}
            <div style={{
                width: 281,
                left: 37,
                top: 280,
                position: 'absolute',
                textAlign: 'center',
                color: '#1F2329',
                fontSize: 14,
                fontFamily: 'Noto Sans KR',
                fontWeight: '500',
                lineHeight: '16px'
            }}>
                당신의 고민, 그 무게는 어느 정도 입니까?
            </div>

            {/* 가벼운 고민 버튼 */}
            <button
                type="button"
                onClick={() => setWorryType('light')}
                style={{
                    width: 249,
                    height: 50,
                    left: 55,
                    top: 310,
                    position: 'absolute',
                    background: worryType === 'light' ? '#C9A982' : '#DEC9AE',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    color: '#1F2329',
                    fontSize: 14,
                    fontFamily: 'Noto Sans KR',
                    fontWeight: '700'
                }}
            >
                가벼운 고민 (포차)
            </button>

            {/* 무거운 고민 버튼 */}
            <button
                type="button"
                onClick={() => setWorryType('heavy')}
                style={{
                    width: 249,
                    height: 50,
                    left: 55,
                    top: 370,
                    position: 'absolute',
                    background: worryType === 'heavy' ? '#C9A982' : '#DEC9AE',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    color: '#1F2329',
                    fontSize: 14,
                    fontFamily: 'Noto Sans KR',
                    fontWeight: '700'
                }}
            >
                무거운 고민 (레스토랑)
            </button>

            {/* --- 섹션 3: 고민 옵션 작성 (VS) --- */}
            <div style={{
                width: 281,
                left: 37,
                top: 450,
                position: 'absolute',
                textAlign: 'center',
                color: '#1F2329',
                fontSize: 14,
                fontFamily: 'Noto Sans KR',
                fontWeight: '500',
                lineHeight: '16px'
            }}>
                당신의 고민을 작성해주세요.
            </div>

            {/* Option A 입력 박스 */}
            <div style={{
                width: 132,
                height: 56,
                left: 25,
                top: 480,
                position: 'absolute',
                background: '#DEC9AE',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px'
            }}>
                <input
                    type="text"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="ex. 마라탕 먹기"
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        color: '#1F2329',
                        fontSize: 13,
                        fontFamily: 'Noto Sans KR',
                        fontWeight: '500'
                    }}
                />
                <div style={{ width: '80%', height: '1px', background: 'black', marginTop: '4px' }} />
            </div>

            {/* VS 텍스트 */}
            <div style={{
                width: 49,
                left: 155,
                top: 500,
                position: 'absolute',
                textAlign: 'center',
                color: '#1F2329',
                fontSize: 16,
                fontFamily: 'Noto Sans KR',
                fontWeight: '700'
            }}>
                VS
            </div>

            {/* Option B 입력 박스 */}
            <div style={{
                width: 132,
                height: 56,
                left: 203,
                top: 480,
                position: 'absolute',
                background: '#DEC9AE',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px'
            }}>
                <input
                    type="text"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="ex. 샐러드 먹기"
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        color: '#1F2329',
                        fontSize: 13,
                        fontFamily: 'Noto Sans KR',
                        fontWeight: '500'
                    }}
                />
                <div style={{ width: '80%', height: '1px', background: 'black', marginTop: '4px' }} />
            </div>

            {/* --- 섹션 4: 제출하기 버튼 --- */}
            <button
                type="button"
                onClick={handleSubmit}
                style={{
                    width: 249,
                    height: 65,
                    left: 55,
                    top: 580,
                    position: 'absolute',
                    background: 'rgba(255, 255, 255, 0.90)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1F2329',
                    fontSize: 20,
                    fontFamily: 'Noto Sans KR',
                    fontWeight: '700'
                }}
            >
                제출하기
            </button>

        </div>
    );
}