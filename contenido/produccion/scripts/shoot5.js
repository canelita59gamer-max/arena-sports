const { chromium } = require('playwright');
const path = require('path');

const scenes = [
  { file: 'a1-hook.html', out: 'a1-hook.jpg' },
  { file: 'a2-bracket.html', out: 'a2-bracket.jpg' },
  { file: 'a3-cta.html', out: 'a3-cta.jpg' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const s of scenes) {
    const fileUrl = 'file://' + path.join(__dirname, 'scenes', s.file);
    await page.goto(fileUrl);
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(__dirname, 'shots', s.out),
      type: 'jpeg',
      quality: 92,
    });
    console.log('shot:', s.out);
  }
  await browser.close();
})();
