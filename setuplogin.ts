import { chromium } from "@playwright/test"

async function loginsetup()
{
 
    let browser=await chromium.launch()
    let context=await browser.newContext()
    let page=await context.newPage()
    await page.goto("http://www.saucedemo.com/")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.locator("input#login-button").click()

    await page.waitForURL("https://www.saucedemo.com/inventory.html")

    await context.storageState({path:"./loginauth.json"})
    await browser.close()
}

export default loginsetup;