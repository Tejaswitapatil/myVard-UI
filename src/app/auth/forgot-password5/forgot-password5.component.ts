import { Component, OnInit } from "@angular/core";
import { Page} from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import { Router } from "@angular/router";
import { GetDataService } from "~/app/services/getdata.service";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../services/status_codes'
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector:'app-forgot-password5',
    templateUrl:'./forgot-password5.component.html',
    styleUrls:['forgot-password5.component.css']
})

export class Forgotpassword5 implements OnInit{


    isChecked=true
    securePassword = true;
    password=''
    password2=''
    
    constructor( private page: Page,
        private router: Router,
        private getdata:GetDataService,
        private loginService:LoginService,
        private routerextension: RouterExtensions) {
            page.actionBarHidden = true
            
        }

    ngOnInit(): void {
        
    }

    updatepassword(){
        if(!(this.password == '')){
            if(this.password == this.password2){
                if(this.validatepassword(this.password2)){
                    this.getdata.loadingDialog()
                    this.loginService.resetPassword({
                        otp: this.getdata.temp_otp,
                        new_password: this.password,
                    }).subscribe(res=>{
                        this.getdata.closeloading()
                        if(res.response_code == STATUS_CODES.DATA_UPDATED){
                            this.routerextension.navigate(['forgot-password6'],{clearHistory:true})
                        }else{
                            console.log(res)
                            this.getdata.toast('error occured')
                        }
                    },err=>{
                        console.log(err)
                        this.getdata.closeloading()
                        this.getdata.toast(err)
                    })
                }else{
                    this.getdata.toast('Password not in proper format')
                }
            }else{
                this.getdata.toast('Password do not match')
            }
        }else{
            this.getdata.toast('Enter password')
        }
    }

    Goback()
    {
        this.routerextension.back()
    }

    toggleShow() {
        this.securePassword = !this.securePassword;
    }

    onCheckedChange(args){
        let sw = args.object as Switch;
        this.isChecked = sw.checked;
    }

    validatepassword(p:string){
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(p)
    }

}