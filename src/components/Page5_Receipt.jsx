import React from 'react';

export default function Page5_Receipt({ onReset }) {
    return (
        <div className="flex flex-col items-center justify-between h-full py-4 text-center">
            <h2 className="text-xl font-bold text-amber-400">고민 정산서 (영수증) 🧾</h2>
            <div className="w-full bg-white text-black p-4 rounded-lg font-mono text-xs shadow-lg my-auto">
                <p className="font-bold text-base border-b pb-2">고민 정육점 / 미식회</p>
                <p className="mt-2">선택 메뉴: 마라탕</p>
                <p>지불 비용: 속쓰림 (-15,000원)</p>
                <p>적립 포인트: 스트레스 해소 (+100p)</p>
                <p className="mt-4 text-gray-500">당신의 선택을 응원합니다. 환불 불가!</p>
            </div>
            <button
                onClick={onReset}
                className="w-full py-3 bg-gray-700 text-white font-bold rounded-xl"
            >
                다시 하기 🔄
            </button>
        </div>
    );
}