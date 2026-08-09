// LocalStorage 키 이름
const STORAGE_KEY = 'gomin_choices_history';

// 1. 새로운 고민 선택 기록 저장
export const saveChoice = (choiceData) => {
    try {
        const existingData = getTodayChoices();
        const newChoice = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...choiceData
        };

        const updatedData = [...existingData, newChoice];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        return newChoice;
    } catch (error) {
        console.error('LocalStorage 저장 실패:', error);
    }
};

// 2. 오늘 저장된 전체 선택 기록 읽기
export const getTodayChoices = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('LocalStorage 읽기 실패:', error);
        return [];
    }
};

// 3. 선택 데이터 초기화
export const clearChoices = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('LocalStorage 삭제 실패:', error);
    }
};