import {Page, test} from "@playwright/test"

export class Base
{
    page:Page

    constructor(p:Page)
    {
        this.page=p
    }
    async openUrl(url:string)
    {
        await this.page.goto(url)
    }
}
