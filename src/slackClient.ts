import axios from 'axios';

const SLACK_BOT_TOKEN  = process.env.SLACK_BOT_TOKEN;
const SLACK_BOT_URL = process.env.SLACK_BOT_URL;

export async function sendToSlack(channel: string, text: string) {

  if (!SLACK_BOT_TOKEN || !SLACK_BOT_URL) {
    console.error('Slack送信エラー: トークンまたはURLが未設定です。');
    return;
  }

  const res = await axios.post(SLACK_BOT_URL, {
    channel,
    text,
  }, {
    headers: {
      'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.data.ok) {
    console.error('Slack送信エラー:', res.data);
  }
}