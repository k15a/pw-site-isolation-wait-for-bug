import { chromium } from "playwright"

async function main() {
  const browser = await chromium.launch({
    headless: false,
    // Enabling this line fixes the problem
    // args: ["--disable-features=IsolateOrigins,site-per-process"],
  })

  const page = await browser.newPage()
  await page.goto("about:blank")

  await page.evaluate(() => {
    const iframe = document.createElement("iframe")
    iframe.src = "https://files-n32x5sozh.now.sh/" // This is iframe.html
    document.body.appendChild(iframe)
  })

  //   await page.waitForLoadState("networkidle")

  for (const frame of page.frames()) {
    console.log("Loading frame", frame.url())
    await frame.waitForLoadState("networkidle")
  }

  console.log("Works!")
  await browser.close()
}

main().catch(console.error)
