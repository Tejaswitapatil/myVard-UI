import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'

@Component({
    selector:'app-enter-phone',
    templateUrl:'./enter-phone.component.html',
    styleUrls:['./enter-phone.component.css']
})
export class EnterPhonecomponent implements OnInit{

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top=500
    left=300

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router:Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService
    ) {
        page.actionBarHidden = true
    }
    ngOnInit(): void {
        
    }

    OnTap() {
        
    }
    Goback()
    {
        this.routerextension.back()
    }


    enterotp()
    {
        this.routerextension.navigate(['/dashboard/enter-otp']);
    }
    
}