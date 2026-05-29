import {expect, test} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { ProductsPage } from "../pages/ProductsPage"
import { CartPage } from "../pages/CartPage"
import { ENV } from "../playwright.config"

let login:LoginPage, products:ProductsPage,cart:CartPage

test.beforeEach(async ({page})=>{

    login=new LoginPage(page)
    products=new ProductsPage(page)
    cart=new CartPage(page)

    await login.openUrl(ENV.url)
})
test("To validate the count of products", async({page})=>{
     //await login.login(ENV.uid,ENV.pwd)
     let status=await products.getheading()
     expect(status).toBeTruthy()
     let count=await products.getProductsCount()
     expect(count).toBe(6) 
})
test("To validate Prices are in sorting order", async({page})=>{
     //await login.login(ENV.uid,ENV.pwd)
     let status=await products.getheading()
     expect(status).toBeTruthy()
     await products.sortProducts("lohi")
     let prices=await products.getprices()
     let flag=true
     for(let i=0;i<prices.length-1;i++)
     {
        if(prices[i]>prices[i+1])
        {
            flag=false
            break
        }
     }
     expect(flag).toBeTruthy()
})
test("To validate the products added in the cart", async({page})=>{
     //await login.login(ENV.uid,ENV.pwd)
     let status=await products.getheading()
     expect(status).toBeTruthy()
     let names1=await products.addProductsTocart()
     await products.gotoCart()
     let names2=await cart.getprodnames()
     console.log(names1)
     console.log(names2)
     expect(names1[0]).toBe(names2[0])
     expect(names1[1]).toBe(names2[1])

     
})
test("To validate remove product from the cart", async()=>{
     //await login.login(ENV.uid,ENV.pwd)
     let status=await products.getheading()
     expect(status).toBeTruthy()
     let names1=await products.addProductsTocart()
     await products.gotoCart()
     await cart.removeproduct()
     let names2=await cart.getprodnames()
     expect(names2.length).toBe(names1.length-1)

})