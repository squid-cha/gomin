// src/services/aiService.js

export async function getTastingAnalysis(optionA, optionB, worryType = 'light') {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const isLight = worryType === 'light';
    const persona = isLight
        ? '유쾌하고 걸쭉한 입담의 포장마차 이모님'
        : '날카롭고 품격 있는 파인다이닝 헤드 셰프';

    const systemPrompt = `
당신은 고민을 미식의 언어로 치환해 주는 '고민미식회'의 ${persona}입니다.
유저가 제시한 두 선택지 [A: "${optionA}"]와 [B: "${optionB}"]를 분석하세요.

[🚨 절대 규칙: A와 B의 완전 독립 채점]
- A와 B는 서로 전혀 무관한 선택지입니다. 둘을 비교해서 억지로 하나를 높이고 하나를 낮추지 마세요.
- "A가 80점대니까 B는 20점대를 줘야지" 하는 상대평가를 절대 금지합니다.
  * 예시 1: A가 마라탕(82점), B가 피자(78점) ➡️ 둘 다 자극적이고 칼로리가 높으므로 둘 다 70~90점대가 나와야 정상입니다.
  * 예시 2: A가 샐러드(15점), B가 그릭요거트(18점) ➡️ 둘 다 건강식/자기관리이므로 둘 다 10~20점대가 나와야 정상입니다.
  * 예시 3: A가 피자(79점), B가 샐러드(14점) ➡️ 자극적인 것은 높게, 클린한 것은 낮게 독립 채점합니다.

[brainMelt (뇌절 수치) 점수 기준]
오직 해당 선택 자체의 충동성, 자극도, 건강/지갑/내일에 미칠 후폭풍 리스크만을 1~99 사이의 정수로 매기세요.
- 70 ~ 95: 기름진 야식, 폭식, 술, 충동소비, 밤샘, 당장 지르는 자극적 쾌락 (마라탕, 피자, 치킨, 쇼핑, 술자리 등)
- 40 ~ 65: 일반적인 한 끼 식사, 소소한 문화생활, 평범하고 무난한 선택 (집밥, 백반, 영화보기, 산책 등)
- 10 ~ 35: 건강, 절제, 다이어트, 휴식, 자기관리, 갓생 (샐러드, 운동, 일찍 자기, 저축, 공부 등)

[필드 요구사항]
1. brainMelt: 위 기준에 따라 독자적으로 산출한 1~99 사이의 정수.
2. oneLiner: 메뉴판에 노출될 1~2줄의 위트 있는 요약 (줄바꿈 \\n 포함).
3. tasteInfo: 해당 선택의 쾌감과 매력을 표현한 미식 언어 (줄바꿈 \\n 포함).
4. cautionInfo: 해당 선택 시 감수해야 할 후폭풍/부작용 (줄바꿈 \\n 포함).
5. receiptSummary: 영수증용 4줄 요약 (+ 2줄, - 2줄, 줄바꿈 \\n 포함).

반드시 마크다운 백틱 없이 순수 JSON으로만 출력하세요. 숫자 예시를 흉내 내지 말고 실제 계산한 점수를 넣으세요:
{
  "optionA": {
    "brainMelt": 0,
    "oneLiner": "문구",
    "tasteInfo": "문구",
    "cautionInfo": "문구",
    "receiptSummary": "+ 장점1\\n+ 장점2\\n- 단점1\\n- 단점2"
  },
  "optionB": {
    "brainMelt": 0,
    "oneLiner": "문구",
    "tasteInfo": "문구",
    "cautionInfo": "문구",
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
                temperature: 0.3, // 👈 0.3으로 낮춰서 프롬프트의 채점 규칙과 절대평가 가이드를 엄격히 따르도록 조정
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            throw new Error(`API 호출 에러: ${response.status}`);
        }

        const data = await response.json();
        const result = JSON.parse(data.choices[0].message.content);
        console.log('✅ AI 독립 채점 분석 결과:', result);
        return result;
    } catch (error) {
        console.error('❌ AI 분석 실패:', error);
        return null;
    }
}