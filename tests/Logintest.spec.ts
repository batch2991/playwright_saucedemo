import {expect, test} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ProductsPage } from "../pages/ProductsPage"
import { ENV } from "../playwright.config"

let login:LoginPage, products:ProductsPage

test.beforeEach(async ({page})=>{

    login=new LoginPage(page)
    products=new ProductsPage(page)  

    await login.openUrl("https://www.saucedemo.com")
})

test("To validate the login for valid inputs",async ({page})=>{
    await page.context().clearCookies()
    await login.login(ENV.uid,ENV.pwd)
    let status=await products.getheading()
    expect(status).toBeTruthy()
    await products.logout()

})

test("To validate the login for Invalid inputs", async({page})=>{
     await page.context().clearCookies()
    await login.login("standard_user","12324234")
    let msg=await login.readErrormsg()
    expect(msg).toContain("Username and password do not match any user in this service")
 
})