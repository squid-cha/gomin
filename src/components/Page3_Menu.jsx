import React, { useState } from 'react';

// 1. 가벼운 고민(포차) / 무거운 고민(레스토랑) 배경 이미지
import bgLight from '../assets/배경ExtraPage2_2.png';
import bgHeavy from '../assets/배경ExtraPage3_2.png';
import cardBgImage from '../assets/menu.png';

export default function Page3_Menu({ userData = {}, onNext }) {
    // worryType이 'light'(가벼운 고민)인지 'heavy'(무거운 고민)인지 판단
    const isLight = userData?.worryType === 'light';
    const bgImage = isLight ? bgLight : bgHeavy;

    // 유저가 입력한 고민 옵션 A, B (기본값 설정)
    const optionA = userData?.optionA || '메뉴A: 마라탕 먹기';
    const optionB = userData?.optionB || '메뉴B: 샐러드 먹기';

    // 상세보기 클릭 시 AI 맛/주의사항 가짜 테이스팅 노트를 보여주는 모달 상태
    const [selectedDetail, setSelectedDetail] = useState(null); // 'A' | 'B' | null

    // 최종 메뉴 주문(선택) 후 다음 영수증 단계로 이동
    const handleSelectOrder = (selectedOptionTitle) => {
        if (onNext) {
            onNext(selectedOptionTitle);
        }
    };

    return (
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

            {/* 1. 고민 종류(light/heavy)에 따라 바뀌는 배경 이미지 */}
            <img
                style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', objectFit: 'cover' }}
                src={bgImage}
                alt="메뉴판 배경"
            />

            {/* 2. 메인 메뉴판 오버레이 카드 (가벼운 고민 vs 무거운 고민 디자인 분기) */}
            {isLight ? (
                /* 🍺 가벼운 고민 (포차): menu.png 카드 사용 */
                <div style={{
                    width: 362,
                    height: 643,
                    left: 0,
                    top: 175,
                    position: 'absolute',
                    borderRadius: 10,
                    overflow: 'hidden',
                    boxShadow: '10px 4px 10px 10px rgba(0, 0, 0, 0.15)',
                }}>
                    <img
                        src={cardBgImage}
                        alt="메뉴판 카드 배경"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.9, // 필요시 뒤 배경이 비치는 투명도 조절
                        }}
                    />
                </div>
            ) : (
                /* 🍷 무거운 고민 (레스토랑): 흰색/어두운 반투명 메뉴판 오버레이 카드 */
                <div
                    style={{
                        width: 362,
                        height: 643,
                        left: 0,
                        top: 175,
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.85)',
                        boxShadow: '10px 4px 10px 10px rgba(0, 0, 0, 0.25)',
                        borderRadius: 10,
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                />
            )}

            {/* 3. 구분선 라인 A & B */}
            <div style={{ width: 297, height: 0, left: 35, top: 314, position: 'absolute', borderTop: '1px solid black' }} />
            <div style={{ width: 297, height: 0, left: 35, top: 546, position: 'absolute', borderTop: '1px solid black' }} />

            {/* 4. 상단 타이틀: 메뉴판 */}
            <div style={{ width: 171, left: 94, top: 219, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 26, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '16px' }}>
                {isLight ? "메뉴판" : "셰프의 메뉴판"}
            </div>

            {/* --- [섹션 A: 메뉴 A] --- */}
            {/* 메뉴 A 제목 */}
            <div style={{ width: 281, left: 35, top: 275, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500' }}>
                {optionA}
            </div>

            {/* 메뉴 A 한줄 미식평/재치문구 */}
            <div style={{ width: 281, height: 56, left: 40, top: 320, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '18px' }}>
                스트레스 핑계 대고 내장 파괴!<br />혈관 비명 지른다
            </div>

            {/* 메뉴 A 상세보기 및 주문 버튼 */}
            <button
                onClick={() => setSelectedDetail('A')}
                style={{
                    width: 310,
                    height: 55,
                    left: 26,
                    top: 382,
                    position: 'absolute',
                    background: '#FFF8EB',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    color: '#1F2329',
                    fontSize: 18,
                    fontFamily: 'Noto Sans KR',
                    fontWeight: '500'
                }}
            >
                상세 보기 및 주문
            </button>

            {/* --- [VS 구분자] --- */}
            <div style={{ width: 281, left: 35, top: 470, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700' }}>
                VS
            </div>

            {/* --- [섹션 B: 메뉴 B] --- */}
            {/* 메뉴 B 제목 */}
            <div style={{ width: 281, left: 35, top: 505, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500' }}>
                {optionB}
            </div>

            {/* 메뉴 B 한줄 미식평/재치문구 */}
            <div style={{ width: 281, height: 56, left: 40, top: 550, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '18px' }}>
                풀떼기만 먹고 배 차?<br />갓생 살려다가 신경 날카워질라!
            </div>

            {/* 메뉴 B 상세보기 및 주문 버튼 */}
            <button
                onClick={() => setSelectedDetail('B')}
                style={{
                    width: 310,
                    height: 55,
                    left: 26,
                    top: 614,
                    position: 'absolute',
                    background: '#FFF8EB',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    color: '#1F2329',
                    fontSize: 18,
                    fontFamily: 'Noto Sans KR',
                    fontWeight: '500'
                }}
            >
                상세 보기 및 주문
            </button>

            {/* ========================================================= */}
            {/* 5. [상세 보기 및 테이스팅 노트 오버레이 모달] */}
            {/* ========================================================= */}
            {selectedDetail && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 360,
                        height: 800,
                        background: 'rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}
                >
                    <div
                        style={{
                            width: 300,
                            background: '#FFF8EB',
                            borderRadius: 12,
                            padding: 20,
                            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                            textAlign: 'center'
                        }}
                    >
                        <h3 style={{ fontSize: 20, fontWeight: '700', color: '#1F2329', marginBottom: 10 }}>
                            🍷 테이스팅 노트 ({selectedDetail === 'A' ? optionA : optionB})
                        </h3>

                        <div style={{ fontSize: 13, color: '#4A5568', textAlign: 'left', lineHeight: '20px', marginBottom: 15 }}>
                            <p style={{ marginBottom: 6 }}>
                                <strong>• 풍미(장점):</strong> {selectedDetail === 'A' ? '자극적인 매운맛이 오늘 하루 찌들었던 스트레스를 즉시 날려버립니다 (+쾌감 100).' : '클린하고 슴슴한 맛. 칼로리 걱정 없이 몸이 가벼워지고 갓생 사는 느낌!'}
                            </p>
                            <p>
                                <strong>• 섭취 시 주의사항(단점):</strong> {selectedDetail === 'A' ? '다음 날 아침 극심한 속쓰림과 붓기를 감수해야 합니다 (-15,000원 지출).' : '30분 뒤 밀려오는 극심한 허기짐과 분노를 자제해야 합니다.'}
                            </p>
                        </div>

                        {/* 최종 선택(주문) 버튼 */}
                        <button
                            onClick={() => handleSelectOrder(selectedDetail === 'A' ? optionA : optionB)}
                            style={{
                                width: '100%',
                                height: 44,
                                background: '#1F2329',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontSize: 15,
                                fontWeight: '700',
                                cursor: 'pointer',
                                marginBottom: 8
                            }}
                        >
                            이 메뉴로 주문하기 (결제)
                        </button>

                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => setSelectedDetail(null)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#718096',
                                fontSize: 13,
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            다른 메뉴 둘러보기
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}