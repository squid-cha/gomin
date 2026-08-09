import React from 'react';

export default function Page2_Input({ onNext }) {
    return (
        <div className="flex flex-col items-center justify-between h-full py-4">
            <h2 className="text-xl font-bold">메뉴판 고민 작성 📝</h2>
            <div className="w-full space-y-3">
                <input type="text" placeholder="옵션 A (예: 마라탕)" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-sm" />
                <input type="text" placeholder="옵션 B (예: 샐러드)" className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-sm" />
            </div>
            <button
                onClick={onNext}
                className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl"
            >
                주문하기 (분석 요청)
            </button>
        </div>
    );
}