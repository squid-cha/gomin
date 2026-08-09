import React from 'react';

export default function Page4_TastingNote({ onNext, data }) {
    return (
        <div className="flex flex-col justify-between h-full py-2">
            <h2 className="text-lg font-bold text-amber-400 text-center">오늘의 테이스팅 노트 🍷</h2>

            {/* 가짜 데이터(Mock Data) 카드 UI 렌더링 확인 */}
            <div className="bg-gray-800 p-4 rounded-xl space-y-3 text-left text-xs">
                <div className="border-b border-gray-700 pb-2">
                    <span className="font-bold text-red-400">[Option A] {data.optionA.title}</span>
                    <p className="text-gray-300 mt-1">맛: {data.optionA.taste}</p>
                    <p className="text-gray-400">장점: {data.optionA.pros}</p>
                    <p className="text-gray-400">단점: {data.optionA.cons}</p>
                </div>
                <div>
                    <span className="font-bold text-green-400">[Option B] {data.optionB.title}</span>
                    <p className="text-gray-300 mt-1">맛: {data.optionB.taste}</p>
                    <p className="text-gray-400">장점: {data.optionB.pros}</p>
                    <p className="text-gray-400">단점: {data.optionB.cons}</p>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl"
            >
                최종 선택하고 영수증 받기
            </button>
        </div>
    );
}