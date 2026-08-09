import React from 'react';

function Page1_Splash({ onNext }) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {/* 360x800 피그마 모바일 프레임 컨테이너 */}
            <div
                className="relative overflow-hidden bg-[#FFDC42] shadow-2xl rounded-3xl"
                style={{ width: 360, height: 800 }}
            >
                {/* 상단 상태바 (Status Bar) 영역 */}
                <div className="absolute top-0 left-0 w-[360px] h-[44px]">
                    <div className="absolute left-[21px] top-[14px] w-[54px] text-center text-black text-[15px] font-semibold tracking-tight">
                        9:41
                    </div>
                    {/* 배터리 아이콘 외형 */}
                    <div className="absolute left-[321.33px] top-[17.33px] w-[22px] h-[11.33px] opacity-35 rounded-[2.67px] border border-black" />
                    <div className="absolute left-[344.33px] top-[21px] w-[1.33px] h-[4px] opacity-40 bg-black" />
                    <div className="absolute left-[323.33px] top-[19.33px] w-[18px] h-[7.33px] bg-black rounded-[1.33px]" />
                </div>

                {/* 배경에 들어가는 노란색 데코 도형들 */}
                <div className="absolute left-[-21px] top-[41px] w-[78px] h-[68px] bg-[#FFD51A] rounded-[20px]" />
                <div className="absolute left-[167px] top-[66px] w-[61px] h-[53px] bg-[#FFD20B] rounded-[20px]" />
                <div className="absolute left-[319px] top-[143px] w-[81px] h-[71px] bg-[#FFD20B] rounded-[10px]" />
                <div className="absolute left-[218px] top-[214px] w-[40px] h-[35px] bg-[#F6C900] rounded-[10px]" />
                <div className="absolute left-[122px] top-[232px] w-[26px] h-[25px] bg-[#F6C900] rounded-[10px]" />
                <div className="absolute left-[223px] top-[306px] w-[65px] h-[57px] bg-[#F6C900] rounded-[20px]" />
                <div className="absolute left-[-15px] top-[371px] w-[118px] h-[100px] bg-[#FFD51A] rounded-[20px]" />
                <div className="absolute left-[271.22px] top-[415.51px] w-[118px] h-[100px] bg-[#FFD51A] rounded-[20px]" />

                {/* 중앙 로고 아이콘 박스 */}
                <div className="absolute left-[125px] top-[232px] w-[110px] h-[110px] bg-white rounded-[30px] shadow-sm flex items-center justify-center">
                    <span className="text-[#AE8E00] font-bold text-[26px] leading-[30px] text-center font-['Noto_Sans_KR']">
                        고민<br />미식회
                    </span>
                </div>

                {/* 메인 문구 영역 */}
                <div className="absolute left-[-46px] top-[385px] w-[452px] text-center text-black text-[16px] font-normal leading-[30px] font-['Noto_Sans_KR']">
                    오늘, 당신의 고민은 어떤 맛인가요?<br />
                    갈팡질팡하는 당신을 위해<br />
                    준비한 오늘의 만찬!
                </div>

                {/* 하단 시작하기 (Get Started) 버튼 */}
                <button
                    onClick={onNext}
                    className="absolute left-[34px] top-[552px] w-[292px] h-[49px] bg-white rounded-[15px] shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <span className="text-[#AE8E00] font-bold text-[20px] leading-[30px] font-['Noto_Sans_KR']">
                        Get Started
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Page1_Splash;