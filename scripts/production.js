import { spawn } from 'child_process';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const BOT_TOKEN = '7929187604:AAGOA4kxssGzFEgifSjxxzWrN6YXFGwY-Qs';
const CHAT_ID = '-1002578645141';

function notifyTelegram(message) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });
}

function runBuild() {
  const envConfig = dotenv.config().parsed;
  const siteName = envConfig.NUXT_ENV_SITE_NAME || 'Unknown Site';
  const siteDomain = envConfig.NUXT_ENV_SITE_DOMAIN || 'Unknown Site';
  const branchName = process.env.CF_PAGES_BRANCH || 'unknown-branch';

  const child = spawn('npm', ['run', 'generate'], { stdio: 'inherit' });

  child.on('exit', async (code) => {
    if (code === 0) {
      await notifyTelegram(`✅ ${siteName} - build successful (branch: ${branchName}), changes are live!\nhttps://${siteDomain}`);
      process.exit(0);
    } else {
      await notifyTelegram(`❌ ${siteName} - build failure (branch: ${branchName}), please check logs`);
      process.exit(1);
    }
  });
}


runBuild();