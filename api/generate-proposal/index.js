const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const { Buffer } = require('buffer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    const { proposal } = req.body || {};
    // Basic HTML rendering - replace with your template rendering
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${proposal?.title||'Proposal'}</title></head><body><h1>${proposal?.title||'Proposal'}</h1><p>${proposal?.body||'No content'}</p></body></html>`;

    const executablePath = await chromium.executablePath;
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath || '/usr/bin/chromium-browser',
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=proposal.pdf');
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
