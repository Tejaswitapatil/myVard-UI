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
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: 'app-enter-otp',
    templateUrl: './enter-otp.component.html',
    styleUrls: ['./enter-otp.component.css']
})
export class EnterOtpcomponent implements OnInit {
    one = ''
    two = ''
    three = ''
    four = ''
    @ViewChild("b", { static: false }) b: ElementRef;
    @ViewChild("c", { static: false }) c: ElementRef;
    @ViewChild("d", { static: false }) d: ElementRef;

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

    }

    o1() {
        this.b.nativeElement.focus()
    }

    o2() {
        this.c.nativeElement.focus()
    }

    o3() {
        this.d.nativeElement.focus()
    }

    verifyOTP() {
        if (!(this.one == '' || this.two == '' || this.three == '' || this.four == '')) {
            this.getData.loadingDialog()
            this.loginService.verifyOTP({
                otp: this.one + this.two + this.three + this.four,
                email: this.getData.temp_email,
            }).subscribe(otpres => {
                this.getData.closeloading()
                console.log(otpres)
                if (otpres.response_code == STATUS_CODES.SUCCESS) {
                    this.getData.temp_otp_token = otpres.token
                    this.getData.toast('OTP verified')
                    this.newemail()
                } else {
                    this.getData.toast('error verifying OTP')
                }
            }, err => {
                this.getData.closeloading()
                this.getData.toast(err)
            })

        } else {
            this.getData.toast('Enter otp')
        }
    }

    newemail() {
        this.routerextension.navigate(['/dashboard/new-email']);
    }

    Goback() {
        this.routerextension.back()
    }

}