import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from '../../../services/status_codes'
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: 'app-new-email',
    templateUrl: './new-email.component.html',
    styleUrls: ['./new-email.component.css']
})
export class NewEmailcomponent implements OnInit {
    email = ''
    email2 = ''

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService
    ) {
        page.actionBarHidden = true
    }
    ngOnInit(): void {

    }

    updateEmail() {
        if (!this.getData.validateEmail(this.email)) {
            return this.getData.toast('Enter a valid email')
        }

        if (!(this.email == '')) {
            if (!(this.email2 == '')) {
                if (this.email == this.email2) {

                    this.getData.loadingDialog()
                    this.getData.getUserProfileData().subscribe(res => {
                        this.getData.closeloading()
                        console.log(res)
                        if (res.response_code == STATUS_CODES.SUCCESS) {
                            console.log(res.userProfileData)
                            res.userProfileData.new_email = this.email
                            res.userProfileData.otp_token = this.getData.temp_otp_token
                            
                            this.updatePrimaryEmail(res.userProfileData)
                        } else this.getData.toast('cannot load profile')
                    }, err => {
                        console.log(err)
                        this.getData.closeloading()
                        this.getData.toast('Error fetching data')
                    })

                } else return this.getData.toast('Email does not match')
            } else return this.getData.toast('Enter email')
        } else return this.getData.toast('Enter email')
    }

    updatePrimaryEmail(data) {
        console.log(data)
        if (!this.getData.validateEmail(data.email)) {
            return this.getData.toast('Enter a valid email')
        }

        this.getData.loadingDialog()

        this.getData.updatePrimaryEmail(data).subscribe(res => {
            this.getData.closeloading()
            console.log(res)
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.emailupdated()

            } else this.getData.toast('cannot update data')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error updating data')
        })
    }

    Goback() {
        this.routerextension.back()
    }

    emailupdated() {
        this.routerextension.navigate(['/dashboard/email-updated']);
    }

}