import React from 'react';

function Page1_Splash({ onNext }) {
    return (
        <div style={{ width: 360, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>
            {/* 노란색 메인 배경 및 서브 도형들 */}
            <div style={{ width: 360, height: 800, left: 0, top: 0, position: 'absolute', background: '#FFDC42' }} />
            <div style={{ width: 65, height: 57, left: 223, top: 306, position: 'absolute', background: '#F6C900', borderRadius: 20 }} />
            <div style={{ width: 65, height: 57, left: 223, top: 306, position: 'absolute', background: '#F6C900', borderRadius: 20 }} />
            <div style={{ width: 78, height: 68, left: -21, top: 41, position: 'absolute', background: '#FFD51A', borderRadius: 20 }} />
            <div style={{ width: 118, height: 100, left: -15, top: 371, position: 'absolute', background: '#FFD51A', borderRadius: 20 }} />
            <div style={{ width: 118, height: 100, left: 271.22, top: 415.51, position: 'absolute', background: '#FFD51A', borderRadius: 20 }} />
            <div style={{ width: 61, height: 53, left: 167, top: 66, position: 'absolute', background: '#FFD20B', borderRadius: 20 }} />
            <div style={{ width: 31, height: 27, left: 66, top: 165, position: 'absolute', background: '#FFD20B', borderRadius: 10 }} />
            <div style={{ width: 72, height: 63, left: -21, top: 245, position: 'absolute', background: '#FFD20B', borderRadius: 10 }} />
            <div style={{ width: 40, height: 35, left: 218, top: 214, position: 'absolute', background: '#F6C900', borderRadius: 10 }} />
            <div style={{ width: 26, height: 25, left: 122, top: 232, position: 'absolute', background: '#F6C900', borderRadius: 10 }} />
            <div style={{ width: 19, height: 18, left: 129, top: 183, position: 'absolute', background: '#F8CC05', borderRadius: 10 }} />
            <div style={{ width: 19, height: 18, left: 53, top: 326, position: 'absolute', background: '#F8CC05', borderRadius: 10 }} />
            <div style={{ width: 19, height: 18, left: 319, top: 294, position: 'absolute', background: '#F8CC05', borderRadius: 10 }} />
            <div style={{ width: 39, height: 36, left: 128, top: 327, position: 'absolute', background: '#F6C900', borderRadius: 10 }} />
            <div style={{ width: 81, height: 71, left: 319, top: 143, position: 'absolute', background: '#FFD20B', borderRadius: 10 }} />

            {/* 중앙 로고 아이콘 상자 */}
            <div style={{ width: 110, height: 110, left: 135, top: 232, position: 'absolute', background: 'white', borderRadius: 30 }} />
            <div style={{ width: 136, left: 122, top: 257, position: 'absolute', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#AE8E00', fontSize: 26, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '30px', wordWrap: 'break-word' }}>
                고민<br />미식회
            </div>

            {/* 메인 문구 영역 */}
            <div style={{ width: 452, left: -36, top: 385, position: 'absolute', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: '30px', wordWrap: 'break-word' }}>
                오늘, 당신의 고민은 어떤 맛인가요?<br /> 갈팡질팡하는 당신을 위해<br />준비한 오늘의 만찬!
            </div>

            {/* 하단 시작하기 버튼 (클릭 시 onNext 실행) */}
            <div
                onClick={onNext}
                style={{ width: 292, height: 49, left: 44, top: 552, position: 'absolute', background: 'white', borderRadius: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div style={{ textAlign: 'center', color: '#AE8E00', fontSize: 26, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '30px', wordWrap: 'break-word' }}>
                    Get Started
                </div>
            </div>
        </div>
    );
}

export default Page1_Splash;