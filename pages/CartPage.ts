import { Base } from "./BasePage";

export class CartPage extends Base
{
     private readonly prodnames:string="div.inventory_item_name"
     private readonly removebtn:string="(//button[.='Remove'])[1]"
     
     async getprodnames()
     {
          await this.page.waitForTimeout(3000)
          let names:string[]=[]
          let allnames=await this.page.locator(this.prodnames).all()
          for(let i=0;i<allnames.length;i++)
             names.push(await allnames[i].textContent()||'')

          return names;
     }
     async removeproduct()
     {
          await this.page.locator(this.removebtn).click()          
     }
}