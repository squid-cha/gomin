import React, { useState } from 'react';

// 1. 가벼운 고민(포차) / 무거운 고민(레스토랑) 배경 및 카드 이미지 불러오기
import bgLight from '../assets/배경ExtraPage2_2.png';
import bgHeavy from '../assets/배경ExtraPage3_2.png';
import cardBgImage from '../assets/menu.png';

export default function Page3_Menu({ userData = {}, onNext }) {
    // worryType이 'light'(가벼운 고민)인지 판단
    const isLight = userData?.worryType === 'light';
    const bgImage = isLight ? bgLight : bgHeavy;

    // 유저가 입력한 고민 옵션 A, B (기본값 설정)
    const optionA = userData?.optionA || '마라탕 먹기';
    const optionB = userData?.optionB || '샐러드 먹기';

    // 🎯 카드 내부 화면 상태: null (목록 화면) | 'A' (A 상세) | 'B' (B 상세)
    const [selectedDetail, setSelectedDetail] = useState(null);

    // 상세보기 모드일 때 보여줄 테이스팅 노트 데이터 (AI 연동용)
    const detailData = selectedDetail === 'A' ? {
        title: optionA,
        doPamineRate: '85%', // 70% 이상 -> 빨간색 게이지
        oneLiner: '스트레스 핑계 대고 \n내장 파괴하는 전형적인 코스! \n아주 혈관이 비명을 지르겠네!',
        tasteInfo: '혀끝부터 정수리까지 \n찌릿하게 터지는 도파민 폭발! \n오늘 하루 쌓인 짜증이 \n빨간 국물에 싹 씻겨 내려가는 극락의 맛',
        cautionInfo: '내일 아침 화장실 직행열차 예약\n퉁퉁 부은 얼굴과 박살 난 위장 건강',
        buttonText: `${optionA} 주문하기`
    } : {
        title: optionB,
        doPamineRate: '15%', // 35% 미만 -> 초록색 게이지 (중간 수치일 경우 주황색으로 자동 변경됨)
        oneLiner: '풀떼기만 먹고 배 차?\n갓생 살려다가 신경 날카워질라!',
        tasteInfo: '클린하고 슴슴하지만\n몸이 가벼워지고 갓생 사는 느낌!\n마음 속 죄책감을 싹 씻어주는 클린한 맛',
        cautionInfo: '30분 뒤 밀려오는 극심한 허기짐\n소처럼 풀 씹다가 분노 폭발 주의',
        buttonText: `${optionB} 주문하기`
    };

    // 최종 메뉴 주문 후 다음 영수증 단계로 이동
    const handleSelectOrder = () => {
        if (onNext) {
            // detailData.doPamineRate ('85%' -> 85) 문자열을 숫자로 파싱
            const brainMeltNum = parseInt(detailData.doPamineRate, 10) || 85;

            onNext({
                selectedOption: detailData.title,
                brainMelt: brainMeltNum
            });
        }
    };

    // 26개 뇌절 수치 도트 게이지 렌더링 헬퍼 (수치 조건별 색상 분기)
    const renderGaugeDots = () => {
        const totalDots = 26;

        // 문자열 수치('85%')를 숫자로 추출
        const currentRateNum = parseInt(detailData.doPamineRate, 10) || 0;

        // 26개 중 활성화될 도트 개수 산출
        const filledCount = Math.round((currentRateNum / 100) * totalDots);

        // 🎨 수치별 게이지 색상 분기 처리
        let gaugeColor = '#CA0000'; // 70 이상: 빨간색
        if (currentRateNum < 35) {
            gaugeColor = '#22C55E'; // 0 이상 35 미만: 초록색
        } else if (currentRateNum < 70) {
            gaugeColor = '#F97316'; // 35 이상 70 미만: 주황색
        }

        return Array.from({ length: totalDots }).map((_, index) => {
            const leftPos = 4 + index * 11;
            const isFilled = index < filledCount;

            return (
                <div
                    key={index}
                    style={{
                        width: 9,
                        height: 16,
                        left: leftPos,
                        top: 2,
                        position: 'absolute',
                        background: isFilled ? gaugeColor : 'black',
                        borderRadius: 5
                    }}
                />
            );
        });
    };

    return (
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

            {/* 1. 고민 종류(light/heavy) 배경 이미지 */}
            <img
                style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', objectFit: 'cover' }}
                src={bgImage}
                alt="메뉴판 배경"
            />

            {/* 2. 메인 메뉴판 오버레이 카드 */}
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
                    boxShadow: '10px 4px 10px 10px rgba(0, 0, 0, 0.25)',
                }}>
                    <img
                        src={cardBgImage}
                        alt="메뉴판 카드 배경"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.95,
                        }}
                    />
                </div>
            ) : (
                /* 🍷 무거운 고민 (레스토랑): 흰색 반투명 오버레이 카드 */
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
                        backdropFilter: 'blur(5px)'
                    }}
                />
            )}

            {/* ========================================================= */}
            {/* 📋 VIEW 1: 기본 메뉴판 목록 (selectedDetail === null) */}
            {/* ========================================================= */}
            {selectedDetail === null && (
                <>
                    {/* [고정] 상단 타이틀 */}
                    <div style={{ width: 171, left: 94, top: 205, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 26, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '16px', zIndex: 10 }}>
                        {isLight ? "메뉴판" : "메뉴판"}
                    </div>

                    {/* 📜 메뉴 목록 전체 스크롤 영역 (top: 245 ~ top: 780) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 245,
                            left: 15,
                            width: 330,
                            height: 540,
                            overflowY: 'auto',
                            paddingRight: 5,
                            zIndex: 5
                        }}
                    >
                        {/* --- [섹션 A: 메뉴 A] --- */}
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginTop: 10, marginBottom: 12 }}>
                            {optionA}
                        </div>

                        {/* 구분선 A */}
                        <div style={{ width: 297, height: 0, margin: '0 auto 15px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />

                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', marginBottom: 20, marginTop: 30 }}>
                            스트레스 핑계 대고 내장 파괴!<br />혈관 비명 지른다
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: 25 }}>
                            <button
                                onClick={() => setSelectedDetail('A')}
                                style={{
                                    width: 290,
                                    height: 55,
                                    background: '#FFF8EB',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    borderRadius: 5,
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#1F2329',
                                    fontSize: 18,
                                    fontFamily: 'Noto Sans KR',
                                    fontWeight: '500'
                                }}
                            >
                                상세 보기 및 주문
                            </button>
                        </div>

                        {/* --- [VS 구분자] --- */}
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', marginBottom: 20, marginTop: 30 }}>
                            VS
                        </div>

                        {/* --- [섹션 B: 메뉴 B] --- */}
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 12 }}>
                            {optionB}
                        </div>

                        {/* 구분선 B */}
                        <div style={{ width: 297, height: 0, margin: '0 auto 15px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />

                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', marginBottom: 20, marginTop: 30 }}>
                            풀떼기만 먹고 배 차?<br />갓생 살려다가 신경 날카워질라!
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <button
                                onClick={() => setSelectedDetail('B')}
                                style={{
                                    width: 290,
                                    height: 55,
                                    background: '#FFF8EB',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    borderRadius: 5,
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#1F2329',
                                    fontSize: 18,
                                    fontFamily: 'Noto Sans KR',
                                    fontWeight: '500'
                                }}
                            >
                                상세 보기 및 주문
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ========================================================= */}
            {/* 🔍 VIEW 2: 피그마 시안 100% 레이아웃 상세 화면 */}
            {/* ========================================================= */}
            {selectedDetail !== null && (
                <>
                    {/* [고정 상단 1] 화살표 아이콘 */}
                    <svg
                        onClick={() => setSelectedDetail(null)}
                        style={{
                            position: 'absolute',
                            left: 15,
                            top: 191,
                            width: 12,
                            height: 18,
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                        viewBox="0 0 12 20"
                        fill="none"
                    >
                        <path
                            d="M10 2L2 10L10 18"
                            stroke="#1F2329"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* [고정 상단 2] 메뉴판으로 돌아가기 버튼 */}
                    <div
                        onClick={() => setSelectedDetail(null)}
                        style={{
                            width: 281,
                            left: -42,
                            top: 191,
                            position: 'absolute',
                            textAlign: 'center',
                            color: '#1F2329',
                            fontSize: 16,
                            fontFamily: 'Noto Sans KR',
                            fontWeight: '400',
                            lineHeight: '16px',
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    >
                        메뉴판으로 돌아가기
                    </div>

                    {/* 📜 내용 전체 스크롤 영역 (top: 240 ~ top: 675) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 240,
                            left: 20,
                            width: 320,
                            height: 435,
                            overflowY: 'auto',
                            paddingRight: 5,
                            zIndex: 5
                        }}
                    >
                        {/* 1. 메뉴 제목 */}
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            color: '#1F2329',
                            fontSize: 30,
                            fontFamily: 'Noto Sans KR',
                            fontWeight: '500',
                            marginBottom: 15
                        }}>
                            {detailData.title}
                        </div>

                        {/* 2. 구분선 A */}
                        <div style={{ width: '100%', height: 0, outline: '1px black solid', outlineOffset: '-0.50px', marginBottom: 15 }} />

                        {/* 3. 뇌절 수치 텍스트 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0 10px',
                            color: '#1F2329',
                            fontSize: 16,
                            fontFamily: 'Noto Sans KR',
                            fontWeight: '400',
                            marginTop: '30px',
                            marginBottom: '10px'
                        }}>
                            <span>뇌절 수치</span>
                            <span>{detailData.doPamineRate}</span>
                        </div>

                        {/* 4. 뇌절 수치 게이지 바 (도트 26개 및 조건별 색상) */}
                        <div style={{ position: 'relative', width: 292, height: 23, border: '1px black solid', borderRadius: 5, margin: '0 auto 20px auto' }}>
                            {renderGaugeDots()}
                        </div>

                        {/* 5. 한 줄 평가 문구 */}
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            color: '#1F2329',
                            fontSize: 15,
                            fontFamily: 'Noto Sans KR',
                            fontWeight: '400',
                            lineHeight: '20px',
                            whiteSpace: 'pre-line',
                            marginBottom: 25
                        }}>
                            {detailData.oneLiner}
                        </div>

                        {/* 6. [맛] 섹션 */}
                        <div style={{ paddingLeft: 10, marginBottom: 25 }}>
                            <div style={{ color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 8 }}>
                                맛
                            </div>
                            <div style={{ color: '#1F2329', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '22px', whiteSpace: 'pre-line' }}>
                                {detailData.tasteInfo}
                            </div>
                        </div>

                        {/* 7. [섭취 시 주의사항] 섹션 */}
                        <div style={{ paddingLeft: 10, marginBottom: 15 }}>
                            <div style={{ color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 8 }}>
                                섭취 시 주의사항
                            </div>
                            <div style={{ color: '#1F2329', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '22px', whiteSpace: 'pre-line' }}>
                                {detailData.cautionInfo}
                            </div>
                        </div>
                    </div>

                    {/* [고정 하단 1] 구분선 B (top: 684) */}
                    <div style={{ width: 297, height: 0, left: 35, top: 684, position: 'absolute', outline: '1px black solid', outlineOffset: '-0.50px', zIndex: 10 }} />

                    {/* [고정 하단 2] 주문하기 버튼 배경 (top: 698) */}
                    <button
                        onClick={() => handleSelectOrder(detailData.title)}
                        style={{
                            width: 310,
                            height: 55,
                            left: 26,
                            top: 698,
                            position: 'absolute',
                            background: '#FFF8EB',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 5,
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    />

                    {/* [고정 하단 3] 주문하기 버튼 텍스트 (top: 714) */}
                    <div
                        onClick={() => handleSelectOrder(detailData.title)}
                        style={{
                            width: 281,
                            height: 56,
                            left: 35,
                            top: 714,
                            position: 'absolute',
                            textAlign: 'center',
                            color: '#1F2329',
                            fontSize: 20,
                            fontFamily: 'Noto Sans KR',
                            fontWeight: '400',
                            lineHeight: '20px',
                            cursor: 'pointer',
                            zIndex: 11
                        }}
                    >
                        {detailData.buttonText}
                    </div>
                </>
            )}

        </div>
    );
}