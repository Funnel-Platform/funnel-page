export const onRequestPost: PagesFunction = async ({ request }) => {
  const TELEGRAM_BOT_TOKEN = '7929187604:AAGOA4kxssGzFEgifSjxxzWrN6YXFGwY-Qs'
  const TELEGRAM_CHAT_ID = '-1002578645141'

  const payload = await request.json();
  const status = payload?.payload?.deployment_trigger?.metadata?.deployment_status;
  const project = payload?.payload?.deployment_trigger?.metadata?.project_name ?? 'Unknown';

  const success = payload?.payload?.deployment_trigger?.metadata?.deployment_status === 'success';
  const failed = payload?.payload?.deployment_trigger?.metadata?.deployment_status === 'failure';

  let message = `🚀 *Deployment Status for ${project}*\n`;

  if (success) {
    message += `✅ *Success*\nYour build was deployed successfully.`;
  } else if (failed) {
    message += `❌ *Failed*\nThere was an issue with the deployment.`;
  } else {
    message += `ℹ️ *Status:* ${status}`;
  }

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  return new Response('Processed deploy status', { status: res.ok ? 200 : 500 });
};