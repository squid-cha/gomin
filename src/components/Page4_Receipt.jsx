import React from 'react';

// 고민 테마에 따른 배경 이미지 (가벼운 고민: 포차 / 무거운 고민: 레스토랑)
import bgLight from '../assets/배경ExtraPage2_2.png';
import bgHeavy from '../assets/배경ExtraPage3_2.png';

export default function Page4_Receipt({ userData = {}, onReset }) {
    // worryType에 따라 가변 적용되는 배경
    const isLight = userData?.worryType === 'light';
    const bgImage = isLight ? bgLight : bgHeavy;

    // 유저 데이터 fallback
    const optionA = userData?.optionA || '마라탕';
    const optionB = userData?.optionB || '샐러드';

    // 🎯 Page3에서 A, B 중 무엇을 선택했는지 판별
    let selectedMenu = optionA;
    let isOptionBSelected = false;

    if (userData?.selectedOption) {
        if (userData.selectedOption === 'B' || userData.selectedOption === optionB) {
            selectedMenu = optionB;
            isOptionBSelected = true;
        } else {
            selectedMenu = userData.selectedOption; // A 또는 직접 입력된 메뉴명
        }
    }

    // 🧠 Page3에서 넘어온 뇌절 수치 연동 (A: 기본 85%, B: 기본 15%)
    const brainMeltValue = userData?.brainMelt !== undefined
        ? Number(userData.brainMelt)
        : (isOptionBSelected ? 15 : 85);

    // 선택한 메뉴에 따른 테이스팅 내역 동적 변경
    const tasteSummary = isOptionBSelected
        ? `+ 클린하고 가벼운 속\n+ 마음 속 죄책감 완전 소멸\n- 30분 뒤 밀려오는 극심한 허기\n- 소처럼 풀 씹다가 분노 폭발`
        : `+ 혀끝 도파민 대폭발\n+ 즉각적인 스트레스 해소\n- 내일 아침 퉁퉁 부은 얼굴\n- 속 쓰림과 부기 획득`;

    // 전체 도트 26개 중 뇌절 수치 비율에 따라 색상 도트 개수 계산
    const totalDots = 26;
    const filledDotCount = Math.min(totalDots, Math.max(0, Math.round((brainMeltValue / 100) * totalDots)));
    const emptyDotCount = totalDots - filledDotCount;

    // 🎨 수치별 게이지 색상 분기
    let gaugeColor = '#CA0000'; // 70 이상: 빨간색
    if (brainMeltValue < 35) {
        gaugeColor = '#22C55E'; // 초록색
    } else if (brainMeltValue < 70) {
        gaugeColor = '#F97316'; // 주황색
    }

    // 저장/공유 핸들러
    const handleSaveImage = () => {
        alert('영수증 저장 기능은 나중에 구현될 예정입니다!');
    };

    const handleShare = () => {
        alert('영수증 공유 기능은 나중에 구현될 예정입니다!');
    };

    return (
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

            {/* 1. 고민 테마 배경 이미지 */}
            <img
                style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', objectFit: 'cover' }}
                src={bgImage}
                alt="고민 정산서 배경"
            />

            {/* 2. 스크롤 컨테이너 */}
            <div
                style={{
                    position: 'absolute',
                    top: 44,
                    left: 0,
                    width: 360,
                    height: 756,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {/* 영수증 도화지 */}
                <div
                    style={{
                        width: 290,
                        minHeight: 716,
                        margin: '72px auto 30px auto',
                        position: 'relative',
                        background: 'white',
                        boxShadow: '0px 10px 25px rgba(0,0,0,0.2)',
                        padding: '25px 22px 30px 22px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* [결제 완료] 스탬프 도장 */}
                    <div style={{ width: 86.43, height: 17.50, right: 25, top: 80, position: 'absolute', transform: 'rotate(-14deg)', transformOrigin: 'top left', textAlign: 'center', color: '#CA0000', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '16px', zIndex: 2 }}>결제 완료</div>
                    <div style={{ width: 156.44, height: 17.50, right: -10, top: 104, position: 'absolute', transform: 'rotate(-14deg)', transformOrigin: 'top left', textAlign: 'center', color: '#CA0000', fontSize: 9, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '16px', zIndex: 2 }}>PAYMENT COMPLETE</div>
                    <div style={{ width: 120.59, height: 38.29, right: 12, top: 80, position: 'absolute', transform: 'rotate(-14deg)', transformOrigin: 'top left', borderRadius: 5, border: '1px #CA0000 solid', zIndex: 2 }} />

                    {/* 타이틀 */}
                    <div style={{ textAlign: 'center', color: 'black', fontSize: 38, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.2', marginTop: 10 }}>
                        고민 정산서
                    </div>

                    <div style={{ width: 247, height: 0, margin: '15px auto 8px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />

                    <div style={{ color: 'black', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.2' }}>
                        RECEIPT
                    </div>

                    <div style={{ width: 247, height: 0, margin: '8px auto 5px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />
                    <div style={{ width: 247, height: 0, margin: '1px auto 12px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />

                    <div style={{ textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.4' }}>
                        당신의 고민이 정산되었습니다
                    </div>

                    <div style={{ width: 247, height: 0, margin: '12px auto 12px auto', outline: '1px black dashed', outlineOffset: '-0.50px' }} />

                    {/* [A 메뉴] & [B 메뉴] */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.4', wordBreak: 'break-word' }}>
                            [A 메뉴 : {optionA}]
                        </div>
                        <div style={{ textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.4', wordBreak: 'break-word' }}>
                            [B 메뉴 : {optionB}]
                        </div>
                    </div>

                    <div style={{ width: 247, height: 0, margin: '12px auto 15px auto', outline: '1px black dashed', outlineOffset: '-0.50px' }} />

                    {/* 최종 선택된 고민 메뉴 & [선택됨] 스탬프 */}
                    <div style={{ position: 'relative', textAlign: 'center', minHeight: '35px' }}>
                        <div style={{ color: 'black', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.4', wordBreak: 'break-word', paddingRight: '10px' }}>
                            {selectedMenu}
                        </div>
                        <div style={{ position: 'absolute', right: 10, top: -2, pointerEvents: 'none' }}>
                            <div style={{ width: 53.42, height: 10.05, position: 'absolute', left: -40, top: 6, transform: 'rotate(-10deg)', transformOrigin: 'top left', textAlign: 'center', color: '#CA0000', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '14px', zIndex: 3 }}>선택됨</div>
                            <div style={{ width: 62.97, height: 19.99, position: 'absolute', left: -45, top: 5, transform: 'rotate(-10deg)', transformOrigin: 'top left', borderRadius: 4, border: '1px #CA0000 solid', zIndex: 2 }} />
                        </div>
                    </div>

                    {/* 선택 메뉴에 맞춘 테이스팅 내역 */}
                    <div style={{ textAlign: 'center', color: 'black', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', marginTop: '15px', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                        {tasteSummary}
                    </div>

                    <div style={{ width: 247, height: 0, margin: '15px auto 15px auto', outline: '1px black dashed', outlineOffset: '-0.50px' }} />

                    {/* 현재 도파민 게이지 */}
                    <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.2' }}>
                        현재 도파민 게이지
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2329', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', marginTop: '12px' }}>
                        <span>뇌절 수치</span>
                        <span style={{ color: '#000000', fontWeight: '500' }}>{brainMeltValue}%</span>
                    </div>

                    {/* 뇌절 수치 동적 게이지 박스 */}
                    <div style={{ width: 228, height: 21, border: '1px black solid', borderRadius: 5, display: 'flex', alignItems: 'center', padding: '0 3px', margin: '8px auto 0 auto', boxSizing: 'border-box' }}>
                        {Array.from({ length: filledDotCount }).map((_, i) => (
                            <div key={`filled-${i}`} style={{ width: 7, height: 14, background: gaugeColor, borderRadius: 5, marginRight: 2 }} />
                        ))}
                        {Array.from({ length: emptyDotCount }).map((_, i) => (
                            <div key={`empty-${i}`} style={{ width: 7, height: 14, background: 'black', borderRadius: 5, marginRight: 2 }} />
                        ))}
                    </div>

                    <div style={{ width: 247, height: 0, margin: '15px auto 15px auto', outline: '1px black dashed', outlineOffset: '-0.50px' }} />

                    {/* 주문 완료 안내 */}
                    <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.3' }}>
                        주문 완료 및 영수증
                    </div>

                    {/* 🎯 변경된 부분: 주문 완료 및 결제 완료 박스 */}
                    <div
                        style={{
                            width: 230,
                            minHeight: 31,
                            background: '#F4F3F3',
                            borderRadius: 5,
                            border: '1px rgba(0, 0, 0, 0.45) solid',
                            margin: '10px auto 0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '4px 8px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div style={{ textAlign: 'center', color: '#999999', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordBreak: 'break-word' }}>
                            [{selectedMenu} 주문 완료 및 결제 완료]
                        </div>
                    </div>

                    <div style={{ width: 247, height: 0, margin: '15px auto 15px auto', outline: '1px black dashed', outlineOffset: '-0.50px' }} />

                    <div style={{ textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '1.3' }}>
                        당신의 선택을 응원합니다. 환불 불가!
                    </div>

                    <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '1.4', marginTop: '8px', wordBreak: 'break-word' }}>
                        “자, {selectedMenu} 맛있게 먹고 오늘도 화이팅!”
                    </div>

                    {/* 스탬프 & 바코드 */}
                    <div style={{ position: 'relative', marginTop: '20px', minHeight: '50px' }}>
                        <div style={{ position: 'absolute', right: 0, top: -10, transform: 'rotate(-8deg)', transformOrigin: 'top left', borderRadius: 5, border: '1px #CA0000 solid', padding: '2px 8px', color: '#CA0000', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '500', zIndex: 2 }}>
                            환불불가
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3px', height: '35px', marginTop: '15px' }}>
                            {[3, 1, 1, 2, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 1, 2, 3, 1, 1, 2, 3].map((w, i) => (
                                <div key={i} style={{ width: `${w * 1.5}px`, height: '100%', background: 'black' }} />
                            ))}
                        </div>
                    </div>

                    <div style={{ width: 247, height: 0, margin: '20px auto 20px auto', outline: '1px black dashed', outlineOffset: '-0.50px' }} />

                    {/* 하단 버튼 영역 */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <button
                            onClick={handleSaveImage}
                            style={{
                                width: '100%',
                                height: 40,
                                background: '#F4F3F3',
                                borderRadius: 5,
                                border: '1px rgba(0, 0, 0, 0.45) solid',
                                cursor: 'pointer',
                                color: '#1F2329',
                                fontSize: 16,
                                fontFamily: 'Noto Sans KR',
                                fontWeight: '500'
                            }}
                        >
                            영수증 저장하기
                        </button>

                        <button
                            onClick={handleShare}
                            style={{
                                width: '100%',
                                height: 40,
                                background: '#FFBABA',
                                borderRadius: 5,
                                border: '1px rgba(0, 0, 0, 0.45) solid',
                                cursor: 'pointer',
                                color: '#CA0000',
                                fontSize: 16,
                                fontFamily: 'Noto Sans KR',
                                fontWeight: '500'
                            }}
                        >
                            영수증 공유하기
                        </button>

                        <button
                            onClick={onReset}
                            style={{
                                width: '100%',
                                height: 40,
                                background: '#1F2329',
                                borderRadius: 5,
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white',
                                fontSize: 14,
                                fontFamily: 'Noto Sans KR',
                                fontWeight: '500'
                            }}
                        >
                            새로운 고민 정산하기
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}