import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../services/status_codes'
import * as appSettings from "tns-core-modules/application-settings";
import { GetDataService } from "~/app/services/getdata.service";

@Component({
    selector:'app-enterotp',
    templateUrl:'./enterotp.component.html',
    styleUrls:['./enterotp.component.css']
})

export class EnterotpComponent implements OnInit{
    one=''
    two=''
    three=''
    four=''
    @ViewChild("b", { static: false }) b: ElementRef;
    @ViewChild("c", { static: false }) c: ElementRef;
    @ViewChild("d", { static: false }) d: ElementRef;

    constructor( private page: Page,
        private router: Router,
        private loginService:LoginService,
        private getData:GetDataService,
        private routerextension: RouterExtensions) {
        page.actionBarHidden = true
    }

    ngOnInit(): void {
        
    }

    o1(){
        this.b.nativeElement.focus()
    }

    o2(){
        this.c.nativeElement.focus()
    }

    o3(){
        this.d.nativeElement.focus()
    }

    verifyOTP(){
        if(!(this.one=='' || this.two=='' || this.three=='' || this.four=='')){
            this.getData.loadingDialog()
            this.loginService.verifyOTPWithLogin({
                otp:this.one+this.two+this.three+this.four,
                email:this.getData.temp_username,
                'login_type': 'CREDENTIALS',
            }).subscribe(otpres=>{
                this.getData.closeloading()
                console.log(otpres)
                if(otpres.response_code == STATUS_CODES.SUCCESS){
                    appSettings.setString('vcardToken', otpres.token)
                    appSettings.setString('vcardUsername', this.getData.temp_username)
                    this.routerextension.navigate(['otp-verified'],{clearHistory:true,animated:true,transition:{name:'slideLeft'}})
                }else{
                    this.getData.toast('error verifying OTP')
                }
            },err=>{
                this.getData.closeloading()
                this.getData.toast(err)
            })

        }else{
            this.getData.toast('Enter otp')
        }
    }

    Goback(){
        this.routerextension.back()
    }

    onsignin() {
        this.routerextension.navigate(['login'],{clearHistory:true,animated:true,transition:{name:'slideRight'}})
    }

    onsignup(){
        this.routerextension.navigate(['signup'],{clearHistory:true,animated:true,transition:{name:'slideLeft'}})
    }

}