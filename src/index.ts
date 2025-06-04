import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { sendToDify, generateOutline, generateArticle } from './difyClient';
import { sendToSlack } from './slackClient';
import { generateOutlineModalView, loadingModalView, outlineModalView, generateArticleModalView } from './modalView';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// アウトライン作成ツール
app.post('/generate_outline', async (req, res) => {

  let body = req.body;

  if (body.payload) {
    body = JSON.parse(body.payload);
  }

  // アウトライン作成ツールのモーダル表示
  if (body.command === "/generate_outline") {

    const triggerId = body.trigger_id;

    await axios.post(
      'https://slack.com/api/views.open',
      generateOutlineModalView(triggerId),
      {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
  
    return res.status(200).send('');
  }
});

// 記事生成ツール
app.post('/generate_article', async (req, res) => {

  let body = req.body;

  if (body.payload) {
    body = JSON.parse(body.payload);
  }

  // 記事生成ツールのモーダル表示
  if (body.command === "/generate_article") {
    const triggerId = body.trigger_id;

    console.log(triggerId);

    await axios.post(
      'https://slack.com/api/views.open',
      generateArticleModalView(triggerId, body.channel_id),
      {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
  
    return res.status(200).send('');
  }
})

app.post('/writing-assistant', async (req, res) => {

  try {
    let body = req.body;

    if (body.payload) {
      body = JSON.parse(body.payload);
    }

  // Slack Challenge
  if (body.type === "url_verification") {
    console.log("Slack Challenge Received");
    return res.status(200).json(body.challenge);
  }

  if (body.type === 'view_submission') {
    const callbackId = body.view.callback_id;

    if (callbackId === 'generate_outline_modal') {

      const values = body.view.state.values;
      const articleTitle: string = values.article_title.article_text.value;
      const baseOutline: string = values.outline_block.outline_text.value || '';
      const userPrompts: string[] = [];
      
    
      const user = body.user.id || 'anonymous';
      for (let i = 1; i <= 4; i++) {
        const prompt = values[`user-prompts${i}_block`][`user-prompts${i}`].value;
        if (prompt !== null) {
          userPrompts.push(prompt);
        }
      }
    
      res.status(200).json({
        response_action: "update",
        view: loadingModalView(),
      });
    
      const outline = await generateOutline(articleTitle, userPrompts, user, baseOutline);    
      const result = await axios.post('https://slack.com/api/views.update', {
        view_id: body.view.id,
        view: outlineModalView(outline.answer),
      }, {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        }
      })
    
      return;

    } else if (callbackId === 'generate_article_modal') {

      const values = body.view.state.values;
      const baseOutline: string = values.outline_block.outline.value;
      const userPrompts: string[] = [];
      const user = body.user.id || 'anonymous';
      const channelId = body.view.private_metadata;
  
      for (let i = 1; i <= 4; i++) {
        const prompt = values[`user-prompts${i}_block`][`user-prompts${i}`].value;
        if (prompt !== null) {
          userPrompts.push(prompt);
        }
      }
  
      res.status(200).json();

      await sendToSlack(channelId, "記事生成中です。何も入力せずしばらくお待ちください。!");

      const article = await generateArticle(baseOutline, userPrompts, user);

      await sendToSlack(channelId, article.answer);
  
      console.log(article.answer);

    }
  }

  // 通常のメッセージ処理
  if (body.event && body.event.type === 'app_mention') {
    res.status(200).send('OK');
    console.log(body.evnet)
    const messageText = body.event.text.replace(/<@[^>]+>/g, '').trim();
    const channel = body.event.channel;
    const user = body.event.user || 'anonymous';

    try {
      await sendToSlack(channel, "記事生成中です。何も入力せずしばらくお待ちください。!");
      const difyResponse = await sendToDify(messageText, user);
      const returnText = difyResponse.answer;
      await sendToSlack(channel, returnText);

    } catch (error) {
      await sendToSlack(channel, "記事生成に失敗しました。");
      console.log(error)
    }
  }

  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }

});

app.listen(PORT, () => {
  console.log(`Slack Webhook server running on port ${PORT}`);
});
