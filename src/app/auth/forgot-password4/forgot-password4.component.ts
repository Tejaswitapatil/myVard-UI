import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page} from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../services/status_codes'
import * as appSettings from "tns-core-modules/application-settings";
import { GetDataService } from "~/app/services/getdata.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-forgot-password4',
    templateUrl:'./forgot-password4.component.html',
    styleUrls:['forgot-password4.component.css']
})

export class Forgotpassword4 implements OnInit{
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
            this.loginService.verifyOTP({
                otp:this.one+this.two+this.three+this.four,
                email:this.getData.temp_username
            }).subscribe(otpres=>{
                this.getData.closeloading()
                if(otpres.response_code == STATUS_CODES.SUCCESS){
                    this.getData.temp_otp = this.one+this.two+this.three+this.four
                    appSettings.setString('vcardTokentemp', otpres.token)
                    this.routerextension.navigate(['forgot-password5'])
                }else{
                    console.log(otpres)
                    this.getData.toast('error verifying OTP')
                }
            },err=>{
                this.getData.closeloading()
                this.getData.toast(err)
            })

            // this.routerextension.navigate(['dashboard'],{clearHistory:true,animated:true,transition:{name:'slideLeft'}})
        }else{
            this.getData.toast('Enter otp')
        }
    }

    Goback()
    {
        this.routerextension.back()
    }
}