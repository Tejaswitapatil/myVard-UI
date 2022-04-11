import { Component, OnInit } from "@angular/core";
import { Page} from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { GetDataService } from "~/app/services/getdata.service";
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    selector:'app-forgot-password3',
    templateUrl:'./forgot-password3.component.html',
    styleUrls:['forgot-password3.component.css']
})

export class Forgotpassword3 implements OnInit{

    mobile=''
    constructor( private page: Page,
        private getData:GetDataService,
        private routerextension: RouterExtensions,) {
            page.actionBarHidden = true
            
        }
    ngOnInit(): void {
        
    }

    forgotpassword4() {
        if(!(this.mobile == '')){
            this.getData.temp_mobile = this.mobile
            this.routerextension.navigate(['forgot-password4'])
        }else this.getData.toast('Enter mobile number')
        
    }

    Goback()
    {
        this.routerextension.back()
    }
}