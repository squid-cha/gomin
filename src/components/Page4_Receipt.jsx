import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

// 고민 테마에 따른 배경 이미지
import bgLight from '../assets/배경ExtraPage2_2.png';
import bgHeavy from '../assets/배경ExtraPage3_2.png';

function ReceiptDashedLine({ margin = '16px 0' }) {
    return (
        <div style={{ width: '100%', height: 2, margin, display: 'block', flexShrink: 0 }}>
            <svg width="100%" height="2" viewBox="0 0 248 2" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 2 }}>
                <line x1="0" y1="1" x2="248" y2="1" stroke="#000000" strokeWidth="1.2" strokeDasharray="4 3" />
            </svg>
        </div>
    );
}

export default function Page4_Receipt({ userData = {}, isSharedView = false, onReset }) {
    const receiptRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const isLight = userData?.worryType === 'light';
    const bgImage = isLight ? bgLight : bgHeavy;

    const userDisplayName = userData?.nickname?.trim()
        ? `${userData.nickname}님`
        : '당신';

    const optionA = userData?.optionA || '메뉴 A';
    const optionB = userData?.optionB || '메뉴 B';

    // 1. 최종 선택 메뉴 판별
    let selectedMenu = optionA;
    let isOptionBSelected = false;

    if (userData?.selectedOption) {
        if (userData.selectedOption === 'B' || userData.selectedOption === optionB || (optionB && userData.selectedOption.includes(optionB))) {
            selectedMenu = optionB;
            isOptionBSelected = true;
        } else {
            selectedMenu = userData.selectedOption;
        }
    }

    // 2. 🤖 AI 뇌절 수치 파싱 (Page3에서 넘겨받은 값 -> AI 결과 객체 -> Fallback 순)
    let rawMelt = userData?.brainMelt;
    if (rawMelt === undefined && userData?.aiResult) {
        rawMelt = isOptionBSelected
            ? userData.aiResult.optionB?.brainMelt
            : userData.aiResult.optionA?.brainMelt;
    }
    const brainMeltValue = rawMelt !== undefined && !isNaN(Number(rawMelt))
        ? Number(rawMelt)
        : (isOptionBSelected ? 25 : 75);

    // 3. 🤖 AI 테이스팅 장단점 요약문 반영 (배열 형태든 문자열 형태든 모두 안전 처리)
    let aiSummary = userData?.tasteSummary;
    if (!aiSummary && userData?.aiResult) {
        aiSummary = isOptionBSelected
            ? userData.aiResult.optionB?.receiptSummary
            : userData.aiResult.optionA?.receiptSummary;
    }

    let tasteSummary = '';
    if (Array.isArray(aiSummary)) {
        tasteSummary = aiSummary.join('\n');
    } else if (typeof aiSummary === 'string' && aiSummary.trim() !== '') {
        tasteSummary = aiSummary;
    } else {
        tasteSummary = isOptionBSelected
            ? `+ 클린하고 가벼운 속\n+ 마음 속 죄책감 완전 소멸\n- 30분 뒤 밀려오는 극심한 허기\n- 소처럼 풀 씹다가 분노 폭발`
            : `+ 혀끝 도파민 대폭발\n+ 즉각적인 스트레스 해소\n- 내일 아침 퉁퉁 부은 얼굴\n- 속 쓰림과 부기 획득`;
    }

    // 4. 게이지 도트 계산 및 색상 분기
    const totalDots = 26;
    const filledDotCount = Math.min(totalDots, Math.max(0, Math.round((brainMeltValue / 100) * totalDots)));
    const emptyDotCount = totalDots - filledDotCount;

    let gaugeColor = '#CA0000';
    if (brainMeltValue < 35) {
        gaugeColor = '#22C55E';
    } else if (brainMeltValue < 70) {
        gaugeColor = '#F97316';
    }

    const cheerFirstLine = `${selectedMenu} 완벽 정산 완료!`;
    const cheerFontSize = cheerFirstLine.length <= 13 ? 15 : cheerFirstLine.length <= 16 ? 13.5 : 12;

    // 💾 영수증 이미지 저장 기능 (독립 DOM 클론으로 스크롤/좌표 밀림 차단)
    const handleSaveImage = async () => {
        if (isProcessing || !receiptRef.current) return;
        setIsProcessing(true);
        try {
            if (document.fonts && document.fonts.ready) {
                await document.fonts.ready;
            }

            const originalNode = receiptRef.current;
            const clone = originalNode.cloneNode(true);
            const buttons = clone.querySelector('[data-html2canvas-ignore="true"]');
            if (buttons) buttons.remove();

            const wrapper = document.createElement('div');
            wrapper.style.position = 'fixed';
            wrapper.style.left = '-9999px';
            wrapper.style.top = '0px';
            wrapper.style.width = '290px';
            wrapper.style.background = '#ffffff';
            wrapper.style.zIndex = '-9999';

            clone.style.margin = '0px';
            clone.style.boxShadow = 'none';
            clone.style.transform = 'none';

            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);

            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: 290,
                height: clone.scrollHeight + 10,
                scrollX: 0,
                scrollY: 0
            });

            document.body.removeChild(wrapper);

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `${userDisplayName}_고민정산서.png`;
            link.click();
        } catch (error) {
            console.error('영수증 저장 실패:', error);
            alert('영수증 저장 중 오류가 발생했습니다.');
        } finally {
            setIsProcessing(false);
        }
    };

    // 🔗 🎯 A의 AI 결과까지 URL 파라미터에 실어서 B에게 완벽 전달
    const handleShare = async () => {
        const queryParams = new URLSearchParams({
            shared: 'true',
            name: userData?.nickname || '친구',
            optA: optionA,
            optB: optionB,
            selected: selectedMenu,
            melt: brainMeltValue.toString(),
            type: userData?.worryType || 'light',
            summary: encodeURIComponent(tasteSummary)
        }).toString();

        const shareUrl = `${window.location.origin}${window.location.pathname}?${queryParams}`;
        const shareTitle = '🍽️ 고민미식회 영수증 도착!';
        const shareText = `[고민미식회] ${userDisplayName}의 고민 정산서가 도착했습니다!\n👉 최종 결정: ${selectedMenu}\n👉 뇌절 수치: ${brainMeltValue}%`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('공유 실패:', error);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                alert('영수증 링크가 복사되었습니다!\n친구에게 공유해 결과를 보여주세요.');
            } catch (err) {
                prompt('아래 링크를 복사해서 친구에게 전달하세요:', shareUrl);
            }
        }
    };

    return (
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

            {/* 배경 이미지 */}
            <img
                style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', objectFit: 'cover' }}
                src={bgImage}
                alt="고민 정산서 배경"
            />

            {/* 스크롤 컨테이너 */}
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
                    ref={receiptRef}
                    style={{
                        width: 290,
                        margin: '72px auto 30px auto',
                        position: 'relative',
                        background: '#ffffff',
                        boxShadow: '0px 10px 25px rgba(0,0,0,0.2)',
                        padding: '24px 21px 36px 21px',
                        boxSizing: 'border-box'
                    }}
                >
                    {/* [결제 완료] 스탬프 */}
                    <div style={{ position: 'absolute', right: 14, top: 72, zIndex: 3, pointerEvents: 'none' }}>
                        <svg width="128" height="46" viewBox="0 0 128 46" style={{ transform: 'rotate(-14deg)', display: 'block' }}>
                            <rect x="1" y="1" width="124" height="42" rx="5" fill="none" stroke="#CA0000" strokeWidth="1.5" />
                            <text x="63" y="20" fill="#CA0000" fontSize="17" fontWeight="700" fontFamily="Noto Sans KR, sans-serif" textAnchor="middle" dominantBaseline="middle">
                                결제 완료
                            </text>
                            <text x="63" y="33" fill="#CA0000" fontSize="8" fontWeight="600" fontFamily="Noto Sans KR, sans-serif" textAnchor="middle" dominantBaseline="middle" letterSpacing="0.5">
                                PAYMENT COMPLETE
                            </text>
                        </svg>
                    </div>

                    {/* 타이틀 헤더 */}
                    <div style={{ width: '100%', display: 'block' }}>
                        <svg width="248" height="98" viewBox="0 0 248 98" style={{ display: 'block', margin: '0 auto' }}>
                            <text x="124" y="34" fill="#000000" fontSize="36" fontWeight="700" fontFamily="Noto Sans KR, sans-serif" textAnchor="middle">
                                고민 정산서
                            </text>
                            <rect x="0" y="52" width="248" height="2" fill="#000000" />
                            <text x="0" y="77" fill="#000000" fontSize="20" fontWeight="550" fontFamily="Noto Sans KR, sans-serif" textAnchor="start">
                                RECEIPT
                            </text>
                            <rect x="0" y="89" width="248" height="2" fill="#000000" />
                            <rect x="0" y="94" width="248" height="2" fill="#000000" />
                        </svg>
                    </div>

                    {/* 닉네임 안내 문구 */}
                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 17, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '26px', marginTop: 12 }}>
                        <div style={{ wordBreak: 'break-word' }}>
                            {userDisplayName}의
                        </div>
                        <div style={{ marginTop: 2 }}>
                            고민이 정산되었습니다
                        </div>
                    </div>

                    <ReceiptDashedLine margin="14px 0" />

                    {/* [A 메뉴] & [B 메뉴] */}
                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 17, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '26px', wordBreak: 'break-word' }}>
                        [A 메뉴 : {optionA}]
                    </div>
                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 17, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '26px', marginTop: 4, wordBreak: 'break-word' }}>
                        [B 메뉴 : {optionB}]
                    </div>

                    <ReceiptDashedLine margin="14px 0" />

                    {/* 최종 선택 메뉴 & [선택됨] 스탬프 */}
                    <div style={{ position: 'relative', textAlign: 'center', minHeight: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ color: '#000000', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '28px', wordBreak: 'break-word', paddingRight: '25px', paddingLeft: '10px' }}>
                            {selectedMenu}
                        </div>
                        <div style={{ position: 'absolute', right: 0, top: 4, pointerEvents: 'none' }}>
                            <svg width="60" height="24" viewBox="0 0 60 24" style={{ transform: 'rotate(-10deg)', display: 'block' }}>
                                <rect x="1" y="1" width="56" height="20" rx="4" fill="none" stroke="#CA0000" strokeWidth="1.2" />
                                <text x="29" y="12" fill="#CA0000" fontSize="12" fontWeight="700" fontFamily="Noto Sans KR, sans-serif" textAnchor="middle" dominantBaseline="middle">
                                    선택됨
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* 🤖 테이스팅 내역 (AI 생성 장단점 요약) */}
                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '22px', marginTop: 14, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                        {tasteSummary}
                    </div>

                    <ReceiptDashedLine margin="16px 0 14px 0" />

                    {/* 도파민 게이지 */}
                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '26px' }}>
                        현재 도파민 게이지
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1F2329', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '300', lineHeight: '22px', marginTop: 12 }}>
                        <span>뇌절 수치</span>
                        <span style={{ color: '#000000', fontWeight: '300' }}>{brainMeltValue}%</span>
                    </div>

                    <div style={{ width: 228, height: 21, border: '1px solid #000000', borderRadius: 5, display: 'flex', alignItems: 'center', padding: '0 3px', margin: '8px auto 0 auto', boxSizing: 'border-box' }}>
                        {Array.from({ length: filledDotCount }).map((_, i) => (
                            <div key={`filled-${i}`} style={{ width: 7, height: 14, background: gaugeColor, borderRadius: 5, marginRight: 2 }} />
                        ))}
                        {Array.from({ length: emptyDotCount }).map((_, i) => (
                            <div key={`empty-${i}`} style={{ width: 7, height: 14, background: '#000000', borderRadius: 5, marginRight: 2 }} />
                        ))}
                    </div>

                    <ReceiptDashedLine margin="16px 0 14px 0" />

                    {/* 주문 완료 안내 */}
                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 20, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '26px' }}>
                        주문 완료 및 영수증
                    </div>

                    <div style={{ width: '100%', margin: '12px 0 0 0', display: 'flex', justifyContent: 'center' }}>
                        <svg width="236" height="34" viewBox="0 0 236 34" style={{ display: 'block' }}>
                            <rect x="0.5" y="0.5" width="235" height="33" rx="5" fill="#F4F3F3" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="1" />
                            <text x="118" y="18" fill="#888888" fontSize="13.5" fontWeight="500" fontFamily="Noto Sans KR, sans-serif" textAnchor="middle" dominantBaseline="middle">
                                [{selectedMenu.length > 12 ? selectedMenu.slice(0, 11) + '...' : selectedMenu} 주문 완료 및 결제 완료]
                            </text>
                        </svg>
                    </div>

                    <ReceiptDashedLine margin="16px 0 14px 0" />

                    <div style={{ textAlign: 'center', color: '#000000', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '24px' }}>
                        당신의 선택을 응원합니다. 환불 불가!
                    </div>

                    <div style={{ textAlign: 'center', color: '#000000', fontFamily: 'Noto Sans KR', marginTop: 10, paddingBottom: 6 }}>
                        <div style={{ fontSize: cheerFontSize, fontWeight: '500', lineHeight: '28px', minHeight: '28px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {cheerFirstLine}
                        </div>
                        <div style={{ fontSize: 14, color: '#333333', lineHeight: '22px', minHeight: '22px', marginTop: 4 }}>
                            마음 편히 즐기세요.
                        </div>
                    </div>

                    {/* [환불불가] 스탬프 & 바코드 */}
                    <div style={{ position: 'relative', marginTop: 14, minHeight: '52px' }}>
                        <div style={{ position: 'absolute', right: -4, top: 26, pointerEvents: 'none' }}>
                            <svg width="74" height="28" viewBox="0 0 74 28" style={{ transform: 'rotate(-8deg)', display: 'block' }}>
                                <rect x="1" y="1" width="70" height="24" rx="4" fill="none" stroke="#CA0000" strokeWidth="1.2" />
                                <text x="36" y="14" fill="#CA0000" fontSize="14" fontWeight="600" fontFamily="Noto Sans KR, sans-serif" textAnchor="middle" dominantBaseline="middle">
                                    환불불가
                                </text>
                            </svg>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3px', height: '35px', marginTop: '15px' }}>
                            {[3, 1, 1, 2, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 2, 1, 1, 2, 3, 1, 1, 2, 3].map((w, i) => (
                                <div key={i} style={{ width: `${w * 1.5}px`, height: '100%', background: '#000000' }} />
                            ))}
                        </div>
                    </div>

                    {/* 🎯 하단 버튼 영역 분기 */}
                    <div data-html2canvas-ignore="true" style={{ width: '100%', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <ReceiptDashedLine margin="0 0 10px 0" />

                        {isSharedView ? (
                            <button
                                onClick={onReset}
                                style={{
                                    width: '100%',
                                    height: 44,
                                    background: '#CA0000',
                                    borderRadius: 5,
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'white',
                                    fontSize: 16,
                                    fontFamily: 'Noto Sans KR',
                                    fontWeight: '700'
                                }}
                            >
                                🍽️ 나도 고민 정산하러 가기
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSaveImage}
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        background: '#F4F3F3',
                                        borderRadius: 5,
                                        border: '1px solid rgba(0, 0, 0, 0.45)',
                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                        color: '#1F2329',
                                        fontSize: 16,
                                        fontFamily: 'Noto Sans KR',
                                        fontWeight: '500',
                                        opacity: isProcessing ? 0.7 : 1
                                    }}
                                >
                                    {isProcessing ? '처리 중...' : '영수증 저장하기'}
                                </button>

                                <button
                                    onClick={handleShare}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        background: '#FFBABA',
                                        borderRadius: 5,
                                        border: '1px solid rgba(0, 0, 0, 0.45)',
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
                                    disabled={isProcessing}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        background: '#1F2329',
                                        borderRadius: 5,
                                        border: 'none',
                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                        color: 'white',
                                        fontSize: 14,
                                        fontFamily: 'Noto Sans KR',
                                        fontWeight: '500'
                                    }}
                                >
                                    새로운 고민 정산하기
                                </button>
                            </>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}