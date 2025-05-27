import express from 'express';
import dotenv from 'dotenv';
import { sendToDify } from './difyClient';
import { sendToSlack } from './slackClient';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/writing-assistant', async (req, res) => {
  const body = req.body;

  // Slack Challenge
  if (body.type === "url_verification") {
      console.log("Slack Challenge Received");
      return res.status(200).json(body.challenge);
  }

  res.status(200).send('OK');

  // 通常のメッセージ処理
  if (body.event && body.event.type === 'app_mention') {
    const messageText = body.event.text.replace(/<@[^>]+>/g, '').trim();
    const channel = body.event.channel;
    const user = body.event.user || 'anonymous';

    try {
      await sendToSlack(channel, "記事生成中です。何も入力せずしばらくお待ちください。");
      const difyResponse = await sendToDify(messageText, user);
      const returnText = difyResponse.answer;
      await sendToSlack(channel, returnText);

    } catch (error) {
      await sendToSlack(channel, "記事生成に失敗しました。");
    }
  }
});

app.listen(PORT, () => {
  console.log(`Slack Webhook server running on port ${PORT}`);
});
