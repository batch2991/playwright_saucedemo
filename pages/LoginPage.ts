import { Base } from "./BasePage";

export class LoginPage extends Base
{

    private readonly userid:string="Username"   //placeholder attrbute
    private readonly passwd:string="Password"     //
    private readonly loginbtn:string="input#login-button"
    
    private readonly errormsg:string="//h3[@data-test='error']"

    async login(uid:string,pwd:string)
    {
        await this.page.getByPlaceholder(this.userid).fill(uid)
        await this.page.getByPlaceholder(this.passwd).fill(pwd)
        await this.page.locator(this.loginbtn).click()
    }

    async readErrormsg()
    {
        let msg=await this.page.locator(this.errormsg).textContent()
        return msg
    }


}