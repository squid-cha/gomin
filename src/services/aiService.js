// src/services/aiService.js

export async function getTastingAnalysis(optionA, optionB, worryType = 'light') {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const isLight = worryType === 'light';
    const persona = isLight
        ? '유쾌하고 걸쭉한 입담의 포장마차 이모님'
        : '날카롭고 품격 있는 파인다이닝 헤드 셰프';

    const systemPrompt = `
당신은 고민을 미식의 언어로 치환해 주는 '고민미식회'의 ${persona}입니다.
유저가 입력한 두 가지 고민 선택지(A: "${optionA}", B: "${optionB}")를 '맛'과 '음식 테이스팅 노트'의 언어로 비유해 대조 분석하세요.

[요구 규칙 - 매우 중요!]
1. brainMelt: 고민의 충동성, 자극도, 도파민 분비량, 비합리성을 1부터 99 사이의 정수(Number)로 계산하세요.
   - 절대 85나 15 같은 고정된 숫자를 반복해서 쓰지 마세요.
   - 실제 고민 내용의 자극 강도에 맞게 91, 78, 64, 42, 23, 12 등 유동적인 숫자를 부여하세요.
   - 즉흥적·충동적·유흥·당장 지르는 선택: 70 ~ 95 사이
   - 현실적·중립적·약간 고민되는 선택: 40 ~ 65 사이
   - 이성적·절제·건강·자기관리 선택: 10 ~ 35 사이
2. oneLiner: 메뉴판 목록에 노출될 1~2줄의 위트 있는 요약 (줄바꿈 \\n 포함).
3. tasteInfo: 입안에서 느껴지는 맛과 쾌감을 미식 언어로 표현한 장점 (줄바꿈 \\n 포함).
4. cautionInfo: 선택 후 감수해야 할 후유증/리스크 (줄바꿈 \\n 포함).
5. receiptSummary: 영수증에 들어갈 장단점 4줄 요약 문자열 (+ 2줄, - 2줄, 줄바꿈 \\n 포함).

반드시 마크다운 백틱 없이 순수 JSON 형식으로만 응답하세요:
{
  "optionA": {
    "brainMelt": 78,
    "oneLiner": "한줄 요약 문구",
    "tasteInfo": "맛 표현 문구",
    "cautionInfo": "섭취 시 주의사항",
    "receiptSummary": "+ 장점1\\n+ 장점2\\n- 단점1\\n- 단점2"
  },
  "optionB": {
    "brainMelt": 28,
    "oneLiner": "한줄 요약 문구",
    "tasteInfo": "맛 표현 문구",
    "cautionInfo": "섭취 시 주의사항",
    "receiptSummary": "+ 장점1\\n+ 장점2\\n- 단점1\\n- 단점2"
  }
}
`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'You are a JSON-only response generator.' },
                    { role: 'user', content: systemPrompt }
                ],
                temperature: 0.8, // 👈 0.8로 올려서 수치와 표현의 다양성 확보
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            throw new Error(`API 호출 에러: ${response.status}`);
        }

        const data = await response.json();
        const result = JSON.parse(data.choices[0].message.content);
        console.log('✅ AI 동적 분석 결과 수신:', result);
        return result;
    } catch (error) {
        console.error('❌ AI 분석 실패:', error);
        return null;
    }
}