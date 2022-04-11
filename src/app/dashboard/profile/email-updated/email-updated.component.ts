import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'

@Component({
    selector:'app-email-updated',
    templateUrl:'./email-updated.component.html',
    styleUrls:['./email-updated.component.css']
})
export class EmailUpdatedcomponent implements OnInit{

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
        setTimeout(()=>{
            this.routerextension.navigate(['/dashboard'],{clearHistory:true})
        },3000)
    }

    OnTap() {
        
    }
    Goback()
    {
        this.routerextension.back()
    }

    
}