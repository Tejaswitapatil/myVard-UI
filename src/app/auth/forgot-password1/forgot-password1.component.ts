import { Component, OnInit } from "@angular/core";
import { Page} from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector:'app-forgot-password1',
    templateUrl:'./forgot-password1.component.html',
    styleUrls:['forgot-password1.component.css']
})

export class Forgotpassword1 implements OnInit{

    constructor( private page: Page,
        // private router: Router,
        private routerextension: RouterExtensions,) {
            page.actionBarHidden = true
            
        }


    ngOnInit(): void {
        
    }

    forgotpassword2() {
        this.routerextension.navigate(['forgot-password2'])
    }

    Goback()
    {
        this.routerextension.back()
    }

}