import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
var Sqlite = require("nativescript-sqlite");
import * as dialogs from "tns-core-modules/ui/dialogs";
import { device } from "tns-core-modules/platform";
import { UiService } from "../../ui.service";
import { setCurrentOrientation, orientationCleanup } from "nativescript-screen-orientation";
import * as appSettings from "tns-core-modules/application-settings";
import { GetDataService } from "../../services/getdata.service";
import * as Toast from "nativescript-toast";
import { setTimeout, clearTimeout } from "tns-core-modules/timer";
import * as utils from "tns-core-modules/utils/utils";
import { alert, AlertOptions } from "tns-core-modules/ui/dialogs";
import * as Connectivity from "tns-core-modules/connectivity";
import {
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertDialog, CFAlertStyle,
    DialogOptions
} from "nativescript-cfalert-dialog";
let cfalertDialog = new CFAlertDialog();
import { SslPinning } from "nativescript-ssl-pinning";
import { registerElement } from "@nativescript/angular/element-registry";
registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
import { MenuBottomSheet } from "../../bottomsheets/menu.bottomsheet";
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import { Menu } from "nativescript-menu";

@Component({
    selector: 'app-galery',
    templateUrl: './galery.component.html',
    styleUrls: ['./galery.component.css']
})
export class Gallerycomponent implements OnInit {
    currentTab
    constructor(
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private page: Page,
        private uiService: UiService,
        private routerextensions: RouterExtensions
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {

    }
    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    buttonTap() {
        if (this.currentTab == 0) {
            Menu.popup({
                view: this.page.getViewById("menuBtn"),
                actions: ["Select images", "Take photo"]
              })
                .then(action => {
                    if (action.id == 0) {
                        this.onCamera()
                    } else if (action.id == 1) {
                        this.onFilepicker()
                    } else {

                    }
                })
            .catch(console.log);
    }else if(this.currentTab == 1) {
    Menu.popup({
        view: this.page.getViewById("menuBtn"),
        actions: ["Select video", "Take video"]
    })
        .then(action => {
            if (action.id == 0) {
                this.onCamera()
            } else if (action.id == 1) {
                this.onFilepicker()
            } else {

            }
        })
        .catch(console.log);
}
        
    }

onCamera(){

}

onFilepicker(){

}

selectedIndexChanged(e){
    this.currentTab = e.newIndex
}

fabTap(){
    const options: BottomSheetOptions = {
        viewContainerRef: this.containerRef,
        context: ['Facebook', 'Google', 'Twitter'],
    };

    this.bottomSheet.show(MenuBottomSheet, options).subscribe(result => {
        console.log('Option selected:', result);
    });

}
}