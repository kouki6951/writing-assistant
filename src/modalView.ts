export const generateOutlineModalView = (trigger_id: string) => ({
    trigger_id: trigger_id,
    view: {
      type: 'modal',
      callback_id: 'generate_outline_modal',
      private_metadata: trigger_id,
      title: {
        type: 'plain_text',
        text: 'アウトライン生成モーダル',
      },
      submit: {
        type: 'plain_text',
        text: 'アウトライン生成',
      },
      close: {
        type: 'plain_text',
        text: '閉じる',
      },
      blocks: [
        {
          type: 'input',
          block_id: 'article_title',
          label: {
            type: 'plain_text',
            text: '生成したい記事のタイトル(200字以内)',
          },
          element: {
            type: 'plain_text_input',
            action_id: 'article_text',
            multiline: true,
          },
        },
        {
            type: 'input',
            block_id: 'outline_block',
            label: {
                type: 'plain_text',
                text: '参考にするアウトライン案がある場合は記入してください。',
            },
            element: {
                type: 'plain_text_input',
                action_id: 'outline_text',
                multiline: true,
            },
            optional: true,
        },
        {
            type: 'section',
            text: {
                type: 'plain_text',
                text: '追加の指示や要望がある場合は記入してください。(各200字以内)'
            }
        },
        {
            type: 'input',
            block_id: 'user-prompts1_block',
            label: {
                type: 'plain_text',
                text: '追加の指示や要望①',
            },
            element: {
                type: 'plain_text_input',
                action_id: 'user-prompts1',
                multiline: true,
            },
            optional: true,
        },
        {
            type: 'input',
            block_id: 'user-prompts2_block',
            label: {
                type: 'plain_text',
                text: '追加の指示や要望②',
            },
            element: {
                type: 'plain_text_input',
                action_id: 'user-prompts2',
                multiline: true,
            },
            optional: true,
        },
        {
            type: 'input',
            block_id: 'user-prompts3_block',
            label: {
                type: 'plain_text',
                text: '追加の指示や要望③',
            },
            element: {
                type: 'plain_text_input',
                action_id: 'user-prompts3',
                multiline: true,
            },
            optional: true,
        },
        {
            type: 'input',
            block_id: 'user-prompts4_block',
            label: {
                type: 'plain_text',
                text: '追加の指示や要望④',
            },
            element: {
                type: 'plain_text_input',
                action_id: 'user-prompts4',
                multiline: true,
            },
            optional: true,
        }
      ],
    }
})

export const loadingModalView = () => ({
    type: 'modal',
    callback_id: 'loading_modal', //
    title: {
        type: 'plain_text',
        text: '処理中...',
    },
    blocks: [
        {
            type: 'section',
            text: {
                type: 'plain_text',
                text: '記事のアウトラインを生成しています。\nしばらくお待ちください...',
            },
        },
    ],
    close: {
        type: 'plain_text',
        text: '閉じる',
    },
});

export const outlineModalView = (outline: string) => ({
    type: 'modal',
    callback_id: 'outline_modal',
    title: {
        type: 'plain_text',
        text: '記事のアウトライン',
    },
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: outline
            },
        }
    ],
    close: {
        type: 'plain_text',
        text: '閉じる',
    },
});

export const generateArticleModalView = (trigger_id: string, channel_id: string) => ({
    trigger_id: trigger_id,
    view: {
        type: 'modal',
        callback_id: 'generate_article_modal',
        private_metadata: channel_id,
        title: {
            type: 'plain_text',
            text: '記事生成モーダル',
          },
          submit: {
            type: 'plain_text',
            text: '記事生成',
          },
          close: {  
            type: 'plain_text',
            text: '閉じる',
          },
          blocks: [
            {
                type: 'input',
                block_id: 'outline_block',
                label: {
                  type: 'plain_text',
                  text: '記事のアウトライン',
                },
                element: {
                  type: 'plain_text_input',
                  action_id: 'outline',
                  multiline: true,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: '追加の指示や要望がある場合は記入してください。(各200字以内)'
                }
            },
            {
                type: 'input',
                block_id: 'user-prompts1_block',
                label: {
                    type: 'plain_text',
                    text: '追加の指示や要望①',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'user-prompts1',
                    multiline: true,
                },
                optional: true,
            },
            {
                type: 'input',
                block_id: 'user-prompts2_block',
                label: {
                    type: 'plain_text',
                    text: '追加の指示や要望②',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'user-prompts2',
                    multiline: true,
                },
                optional: true,
            },
            {
                type: 'input',
                block_id: 'user-prompts3_block',
                label: {
                    type: 'plain_text',
                    text: '追加の指示や要望③',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'user-prompts3',
                    multiline: true,
                },
                optional: true,
            },
            {
                type: 'input',
                block_id: 'user-prompts4_block',
                label: {
                    type: 'plain_text',
                    text: '追加の指示や要望④',
                },
                element: {
                    type: 'plain_text_input',
                    action_id: 'user-prompts4',
                    multiline: true,
                },
                optional: true,
            }
        ]
    }
})
