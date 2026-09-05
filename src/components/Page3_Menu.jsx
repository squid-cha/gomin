import React, { useState } from 'react';

import bgLight from '../assets/배경ExtraPage2_2.png';
import bgHeavy from '../assets/배경ExtraPage3_2.png';
import cardBgImage from '../assets/menu.png';

export default function Page3_Menu({ userData = {}, onNext }) {
    const isLight = userData?.worryType === 'light';
    const bgImage = isLight ? bgLight : bgHeavy;

    const optionA = userData?.optionA || '메뉴 A';
    const optionB = userData?.optionB || '메뉴 B';

    // 🎯 카드 내부 화면 상태
    const [selectedDetail, setSelectedDetail] = useState(null);

    // 🤖 AI 데이터 가져오기
    const aiA = userData?.aiResult?.optionA;
    const aiB = userData?.aiResult?.optionB;

    // ⏳ AI 결과가 아직 도착하지 않은 경우 로딩 화면
    if (!userData?.aiResult) {
        return (
            <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>
                <img style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', objectFit: 'cover' }} src={bgImage} alt="배경" />
                <div style={{
                    width: 300,
                    height: 200,
                    position: 'absolute',
                    left: 30,
                    top: 300,
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20
                }}>
                    <div style={{ fontSize: 24, marginBottom: 12 }}>🍽️</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#1F2329', marginBottom: 6 }}>
                        {isLight ? '이모님이 메뉴를 볶는 중...' : '셰프가 테이스팅 노트를 작성 중...'}
                    </div>
                    <div style={{ fontSize: 13, color: '#666' }}>잠시만 기다려주세요!</div>
                </div>
            </div>
        );
    }

    // 🧠 AI 수치 파싱 (문자열이나 빈값이어도 안전하게 정수 추출)
    const brainMeltA = parseInt(aiA?.brainMelt, 10) || 75;
    const brainMeltB = parseInt(aiB?.brainMelt, 10) || 25;

    const detailData = selectedDetail === 'A' ? {
        title: optionA,
        brainMeltNum: brainMeltA,
        doPamineRate: `${brainMeltA}%`,
        oneLiner: aiA?.oneLiner || '',
        tasteInfo: aiA?.tasteInfo || '',
        cautionInfo: aiA?.cautionInfo || '',
        receiptSummary: aiA?.receiptSummary || '',
        buttonText: `${optionA} 주문하기`
    } : {
        title: optionB,
        brainMeltNum: brainMeltB,
        doPamineRate: `${brainMeltB}%`,
        oneLiner: aiB?.oneLiner || '',
        tasteInfo: aiB?.tasteInfo || '',
        cautionInfo: aiB?.cautionInfo || '',
        receiptSummary: aiB?.receiptSummary || '',
        buttonText: `${optionB} 주문하기`
    };

    const handleSelectOrder = () => {
        if (onNext) {
            onNext({
                selectedOption: detailData.title,
                brainMelt: detailData.brainMeltNum,
                tasteSummary: detailData.receiptSummary
            });
        }
    };

    const renderGaugeDots = () => {
        const totalDots = 26;
        const currentRateNum = detailData.brainMeltNum;
        const filledCount = Math.min(totalDots, Math.max(0, Math.round((currentRateNum / 100) * totalDots)));

        let gaugeColor = '#CA0000'; // 70 이상 빨강
        if (currentRateNum < 35) {
            gaugeColor = '#22C55E'; // 35 미만 초록
        } else if (currentRateNum < 70) {
            gaugeColor = '#F97316'; // 35 이상 70 미만 주황
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
            <img style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', objectFit: 'cover' }} src={bgImage} alt="메뉴판 배경" />

            {isLight ? (
                <div style={{ width: 362, height: 643, left: 0, top: 175, position: 'absolute', borderRadius: 10, overflow: 'hidden', boxShadow: '10px 4px 10px 10px rgba(0, 0, 0, 0.25)' }}>
                    <img src={cardBgImage} alt="메뉴판 카드 배경" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }} />
                </div>
            ) : (
                <div style={{ width: 362, height: 643, left: 0, top: 175, position: 'absolute', background: 'rgba(255, 255, 255, 0.85)', boxShadow: '10px 4px 10px 10px rgba(0, 0, 0, 0.25)', borderRadius: 10, backdropFilter: 'blur(5px)' }} />
            )}

            {/* VIEW 1: 메뉴판 목록 */}
            {selectedDetail === null && (
                <>
                    <div style={{ width: 171, left: 94, top: 205, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 26, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: '16px', zIndex: 10 }}>
                        메뉴판
                    </div>

                    <div style={{ position: 'absolute', top: 245, left: 15, width: 330, height: 540, overflowY: 'auto', paddingRight: 5, zIndex: 5 }}>
                        {/* 메뉴 A */}
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginTop: 10, marginBottom: 12 }}>
                            {optionA}
                        </div>
                        <div style={{ width: 297, height: 0, margin: '0 auto 15px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', marginBottom: 20, marginTop: 30, whiteSpace: 'pre-line' }}>
                            {aiA?.oneLiner}
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: 25 }}>
                            <button onClick={() => setSelectedDetail('A')} style={{ width: 290, height: 55, background: '#FFF8EB', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, border: 'none', cursor: 'pointer', color: '#1F2329', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500' }}>
                                상세 보기 및 주문
                            </button>
                        </div>

                        {/* VS */}
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', marginBottom: 20, marginTop: 30 }}>
                            VS
                        </div>

                        {/* 메뉴 B */}
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 12 }}>
                            {optionB}
                        </div>
                        <div style={{ width: 297, height: 0, margin: '0 auto 15px auto', outline: '1px black solid', outlineOffset: '-0.50px' }} />
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', marginBottom: 20, marginTop: 30, whiteSpace: 'pre-line' }}>
                            {aiB?.oneLiner}
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <button onClick={() => setSelectedDetail('B')} style={{ width: 290, height: 55, background: '#FFF8EB', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, border: 'none', cursor: 'pointer', color: '#1F2329', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500' }}>
                                상세 보기 및 주문
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* VIEW 2: 상세 화면 */}
            {selectedDetail !== null && (
                <>
                    <svg onClick={() => setSelectedDetail(null)} style={{ position: 'absolute', left: 15, top: 191, width: 12, height: 18, cursor: 'pointer', zIndex: 10 }} viewBox="0 0 12 20" fill="none">
                        <path d="M10 2L2 10L10 18" stroke="#1F2329" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <div onClick={() => setSelectedDetail(null)} style={{ width: 281, left: -42, top: 191, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '16px', cursor: 'pointer', zIndex: 10 }}>
                        메뉴판으로 돌아가기
                    </div>

                    <div style={{ position: 'absolute', top: 240, left: 20, width: 320, height: 435, overflowY: 'auto', paddingRight: 5, zIndex: 5 }}>
                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 26, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 15, wordBreak: 'break-word' }}>
                            {detailData.title}
                        </div>

                        <div style={{ width: '100%', height: 0, outline: '1px black solid', outlineOffset: '-0.50px', marginBottom: 15 }} />

                        {/* 뇌절 수치 텍스트 */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', color: '#1F2329', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', marginTop: '30px', marginBottom: '10px' }}>
                            <span>뇌절 수치</span>
                            <span>{detailData.doPamineRate}</span>
                        </div>

                        {/* 뇌절 수치 게이지 바 */}
                        <div style={{ position: 'relative', width: 292, height: 23, border: '1px black solid', borderRadius: 5, margin: '0 auto 20px auto' }}>
                            {renderGaugeDots()}
                        </div>

                        <div style={{ width: '100%', textAlign: 'center', color: '#1F2329', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', whiteSpace: 'pre-line', marginBottom: 25 }}>
                            {detailData.oneLiner}
                        </div>

                        <div style={{ paddingLeft: 10, marginBottom: 25 }}>
                            <div style={{ color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 8 }}>맛</div>
                            <div style={{ color: '#1F2329', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '22px', whiteSpace: 'pre-line' }}>
                                {detailData.tasteInfo}
                            </div>
                        </div>

                        <div style={{ paddingLeft: 10, marginBottom: 15 }}>
                            <div style={{ color: '#1F2329', fontSize: 22, fontFamily: 'Noto Sans KR', fontWeight: '500', marginBottom: 8 }}>섭취 시 주의사항</div>
                            <div style={{ color: '#1F2329', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '22px', whiteSpace: 'pre-line' }}>
                                {detailData.cautionInfo}
                            </div>
                        </div>
                    </div>

                    <div style={{ width: 297, height: 0, left: 35, top: 684, position: 'absolute', outline: '1px black solid', outlineOffset: '-0.50px', zIndex: 10 }} />

                    <button onClick={handleSelectOrder} style={{ width: 310, height: 55, left: 26, top: 698, position: 'absolute', background: '#FFF8EB', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, border: 'none', cursor: 'pointer', zIndex: 10 }} />

                    <div onClick={handleSelectOrder} style={{ width: 281, height: 56, left: 35, top: 714, position: 'absolute', textAlign: 'center', color: '#1F2329', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '20px', cursor: 'pointer', zIndex: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {detailData.buttonText}
                    </div>
                </>
            )}
        </div>
    );
}