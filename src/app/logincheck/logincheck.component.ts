import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { UiService } from "../ui.service";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector:'app-logincheck',
    templateUrl:"./logincheck.component.html",
    styleUrls:['./logincheck.component.css']
})
export class LoginCheck implements OnInit
{
    constructor(private page:Page,
        private routerExtensions:RouterExtensions,
        private loginservice:LoginService,
        private uiService:UiService)
    {
        page.actionBarHidden=true
    }

    ngOnInit()
    {
        this.uiService.sideDrawer = false
        setTimeout(()=>{
            if(appSettings.getString('vcardToken')){
                this.routerExtensions.navigate(["dashboard"],{clearHistory:true});
            }else{
                this.routerExtensions.navigate(["login"],{clearHistory:true});
            }    
        },3000)
        
        
    
    }
}