import { Base } from "./BasePage";

export class ProductsPage extends Base
{
     private readonly prodheading:string="//span[.='Products']"
     private readonly openmenu:string="Open Menu"
     private readonly logoutlink:string="Logout"
     private readonly prodname:string="div.inventory_item_name "
     private readonly prices:string="div.inventory_item_price"
     private readonly addcartbtn:string="Add to cart"
     private readonly cartlink:string='a.shopping_cart_link'


     async getheading()
     {
        await this.page.waitForSelector(this.prodheading)
        let status=await this.page.locator(this.prodheading).isVisible()
        return status
     }
     async logout()
     {
        await this.page.getByText(this.openmenu).click()
        await this.page.getByText(this.logoutlink).click()
     }
     async getProductsCount()
     {
       let allprods=await this.page.locator(this.prodname).all()
       return allprods.length
     }
     async sortProducts(sortorder:string)
     {
      await this.page.locator("select.product_sort_container").selectOption({value:sortorder})
      await this.page.waitForTimeout(2000)
     }
     async getprices()
     {       
       let arrprice:number[]=[]
       let allprices=await this.page.locator(this.prices).all()
       for(let i=0;i<allprices.length;i++)
       {
            arrprice.push(Number(String(await allprices[i].textContent()).slice(1)))
       }
       return arrprice
     }
     async addProductsTocart()
     {
         let pnames:string[]=[]
         for(let i=1;i<=2;i++)
         {   
             let n=Math.floor(Math.random()*6+1)
             await this.page.waitForTimeout(2000)
             let pname=await this.page.locator("(//button[.='Add to cart'])["+n+"]/ancestor::div[1]/preceding-sibling::div/a/div").textContent()
             pnames.push(pname||'')
             await this.page.locator("(//button[.='Add to cart'])["+n+"]").click()
             
         }        
         return pnames;
     }
     async gotoCart()
     {
      await this.page.locator(this.cartlink).click()      
     }


}