import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { GetDataService } from "~/app/services/getdata.service";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../../services/status_codes'

@Component({
    selector: 'app-enter-email',
    templateUrl: './enter-email.component.html',
    styleUrls: ['./enter-email.component.css']
})
export class EnterEmailcomponent implements OnInit {
    email = ''

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService,
        private loginService: LoginService
    ) {
        page.actionBarHidden = true
    }
    ngOnInit(): void {
        this.email = this.getData.temp_email
    }

    OnTap() {

    }

    Goback() {
        this.routerextension.back()
    }

    enterotp() {
        this.getData.temp_email = this.email
        this.routerextension.navigate(['/dashboard/enter-otp']);
    }

    onGetOTP() {
        if (!this.getData.validateEmail(this.email)) {
            return this.getData.toast('Enter a valid email')
        }

        if (!(this.email == '')) {
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
                        if (otpres.response_code == STATUS_CODES.SUCCESS) {
                            this.getData.temp_username = this.email
                            this.enterotp()
                        } else {
                            this.getData.toast('Failed sending OTP')
                        }
                    }, err => {
                        this.getData.closeloading()
                        this.getData.toast(err)
                    })

                } else {
                    this.getData.toast('Please enter valid username API')
                }
            }, err => {
                this.getData.closeloading()
                this.getData.toast(err)
            })

        } else {
            this.getData.toast('Please enter valid email')
        }

    }

}