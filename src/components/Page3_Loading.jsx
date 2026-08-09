import React from 'react';

export default function Page3_Loading({ onNext }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="animate-spin text-4xl">🍳</div>
            <p className="text-lg font-medium text-amber-300">이모가 맛깔나게 섞는 중...</p>
            <button
                onClick={onNext}
                className="text-xs text-gray-500 underline mt-8"
            >
                (테스트용: 조리 완료 후 다음 버튼)
            </button>
        </div>
    );
}