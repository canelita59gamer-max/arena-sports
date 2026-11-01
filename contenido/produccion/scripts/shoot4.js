const { chromium } = require('playwright');
const path = require('path');

const scenes = [
  { file: 's0-hook-text.html', out: 's0-hook-text.jpg' },
  { file: 's1-phone-mijugador.html', out: 's1-phone-mijugador.jpg' },
  { file: 's2-phone-stats.html', out: 's2-phone-stats.jpg' },
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
