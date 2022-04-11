import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { NavigationExtras, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../services/status_codes'
import { GetDataService } from "~/app/services/getdata.service";

@Component({
    selector:'app-login-otp',
    templateUrl:'./login-otp.component.html',
    styleUrls:['./login-otp.component.css']
})

export class LoginOtpComponent implements OnInit{

    username='';
    
    constructor( private page: Page,
        private router: Router,
        private routerextension: RouterExtensions,
        private getData:GetDataService,
        private loginService:LoginService) {
        page.actionBarHidden = true
        
    }

    ngOnInit(): void {
        this.username = this.getData.temp_username
    }

    onsignin() {
        this.routerextension.navigate(['login'],{clearHistory:true})
    }

    onsignup(){
        this.routerextension.navigate(['signup'],{clearHistory:true,animated:true,transition:{name:'slideLeft'}})
    }

    onGetOTP() {

        if(!(this.username=='')){
            this.getData.loadingDialog()
            this.loginService.checkuserexists({
                'email': this.username,
            }).subscribe(res => {
                this.getData.closeloading()
                if (res.response_code == STATUS_CODES.SUCCESS) {      
                    this.getData.loadingDialog()
                    this.loginService.getOTP({
                        email:this.username
                    }).subscribe(otpres=>{
                        this.getData.closeloading()
                        if(otpres.response_code == STATUS_CODES.SUCCESS){
                            this.getData.temp_username = this.username
                            this.routerextension.navigate(['enter-otp'],{animated:true,transition:{name:'slideLeft'}})
                        }else{
                            this.getData.toast('Failed sending OTP')
                        }
                    },err=>{
                        this.getData.closeloading()
                        this.getData.toast(err)
                    })
                    
                }else{
                    this.getData.toast('Please enter valid username API')
                }
            },err=>{
                this.getData.closeloading()
                this.getData.toast(err)
            })
            
        }else{
            dialogs.alert('Please enter valid username')
        }
       
    }
    
    Goback() {
       this.routerextension.back()
    }
    

    nouserfoundDialog() {
        this.getData.toast('No user found')
    }

    errorOccured() {
        this.getData.toast('Some error occured retry again')
    }
}