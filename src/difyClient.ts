import axios from 'axios';

const BASE_DIFY_API_KEY = process.env.BASE_DIFY_API_KEY;
const GENERATE_OUTLINE_DIFY_API_KEY = process.env.GENERATE_OUTLINE_DIFY_API_KEY;
const GENERATE_ARTICLE_DIFY_API_KEY = process.env.GENERATE_ARTICLE_DIFY_API_KEY
const DIFY_API_URL = process.env.DIFY_API_URL;

export async function sendToDify(userInput: string, user: string) {


    if (!BASE_DIFY_API_KEY || !GENERATE_OUTLINE_DIFY_API_KEY || !GENERATE_ARTICLE_DIFY_API_KEY || !DIFY_API_URL) {
        console.error('Dify送信エラー: トークンまたはURLが未設定です。');
        return;
    } 

    const payload = {
        inputs: {
            user_input: userInput
        },
        response_mode: "blocking",
        user: user,
    }

    const headers = {
        'Authorization': `Bearer ${BASE_DIFY_API_KEY}`,
        'Content-Type': 'application/json',
    }

    const res = await axios.post(DIFY_API_URL, payload, { headers });
    return res.data;
}

export async function generateOutline(articleTitle: string, userPrompts: string[], user: string, baseOutline: string) {

    if (!GENERATE_OUTLINE_DIFY_API_KEY || !DIFY_API_URL) {
        console.error('Dify送信エラー: トークンまたはURLが未設定です。');
        return;
    }

    const payload:  {
        inputs: Record<string, string>
        response_mode: string,
        user: string,
    } = {
        inputs: {
            articleTitle: articleTitle,
        },
        response_mode: "blocking",
        user: user,
    }

    for (let i = 1; i <= userPrompts.length; i++) {
        if (userPrompts[i - 1] !== null) {
            payload.inputs[`userPrompt${i}`] = userPrompts[i - 1];
        }
    }

    if (baseOutline !== null && baseOutline !== '') {
        payload.inputs[`baseOutline`] = baseOutline;
    }

    const headers = {
        'Authorization': `Bearer ${GENERATE_OUTLINE_DIFY_API_KEY}`,
        'Content-Type': 'application/json',
    }

    console.log("payload", payload);

    const res = await axios.post(DIFY_API_URL, payload, { headers });
    return res.data;
}

export async function generateArticle(baseOutline: string, userPrompts: string[], user: string) {

    if (!GENERATE_ARTICLE_DIFY_API_KEY || !DIFY_API_URL) {
        console.error('Dify送信エラー: トークンまたはURLが未設定です。');
        return;
    }

    const payload: {
        inputs: Record<string, string>
        response_mode: string,
        user: string,
    } = {
        inputs: {
            baseOutline: baseOutline,
        },
        response_mode: "blocking",
        user: user,
    }

    for (let i = 1; i <= userPrompts.length; i++) {
        if (userPrompts[i - 1] !== null) {
            payload.inputs[`userPrompt${i}`] = userPrompts[i - 1];
        }
    }

    const headers = {
        'Authorization': `Bearer ${GENERATE_ARTICLE_DIFY_API_KEY}`,
        'Content-Type': 'application/json',
    }

    const res = await axios.post(DIFY_API_URL, payload, { headers });
    return res.data;
}
