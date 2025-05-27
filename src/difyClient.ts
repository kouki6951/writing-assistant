import axios from 'axios';

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = process.env.DIFY_API_URL;

export async function sendToDify(userInput: string, user: string) {

    if (!DIFY_API_KEY || !DIFY_API_URL) {
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
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
    }

    const res = await axios.post(DIFY_API_URL, payload, { headers });
    return res.data;
}