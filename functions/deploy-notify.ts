export async function onRequest(context: any) {
  const TELEGRAM_BOT_TOKEN = '7929187604:AAGOA4kxssGzFEgifSjxxzWrN6YXFGwY-Qs'
  const TELEGRAM_CHAT_ID = '5090748346'

  const message = 'Cloudflare Pages deployment succeeded! 🎉'
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  })

  if (!response.ok) {
    return new Response('Failed to send Telegram message', { status: 500 })
  }

  return new Response('Telegram message sent', { status: 200 })
}