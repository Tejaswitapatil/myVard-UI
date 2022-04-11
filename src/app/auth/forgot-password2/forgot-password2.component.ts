import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from '../../services/status_codes'
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginService } from "~/app/services/login.service";

@Component({
    selector: 'app-forgot-password2',
    templateUrl: './forgot-password2.component.html',
    styleUrls: ['forgot-password2.component.css']
})

export class Forgotpassword2 implements OnInit {

    email = ''

    constructor(private page: Page,
        private getData: GetDataService,
        private loginService: LoginService,
        private routerextension: RouterExtensions,) {
        page.actionBarHidden = true

    }

    ngOnInit(): void {

    }

    forgotpassword3() {
        if (!(this.email == '')) {

            if(!this.getData.validateEmail(this.email)){
                return this.getData.toast('Enter valid Email')
            }

            this.getData.loadingDialog()
            this.loginService.checkuserexists({
                'email': this.email,
            }).subscribe(res => {
                this.getData.closeloading()
                if (res.response_code == STATUS_CODES.SUCCESS) {

                    this.getData.loadingDialog()
                    this.loginService.getOTP({
                        email: this.email
                    }).subscribe(otpres => {
                        this.getData.closeloading()
                        console.log(otpres)
                        if (otpres.response_code == STATUS_CODES.SUCCESS) {
                            this.getData.temp_email = this.email
                            this.getData.temp_username = this.email
                            this.routerextension.navigate(['forgot-password4'])
                        } else {
                            this.getData.toast('Failed sending OTP')
                        }
                    }, err => {
                        this.getData.closeloading()
                        this.getData.toast(err)
                    })

                } else this.getData.toast('User not found')
            }, err => {
                this.getData.closeloading()
                this.getData.toast(err)
            })
        } else this.getData.toast('Enter email')
    }

    Goback() {
        this.routerextension.back()
    }
}