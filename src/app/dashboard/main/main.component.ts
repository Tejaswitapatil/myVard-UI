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

@Component({
    selector:'app-main',
    templateUrl:'./main.component.html',
    styleUrls:['./main.component.css']
})
export class Maincomponent implements OnInit{
    actBarTitle='Home'

    constructor(
        private bottomSheet: BottomSheetService, 
        private containerRef: ViewContainerRef,
        private page:Page,
        private uiService: UiService,
        private routerExtension:RouterExtensions
    ){
        page.actionBarHidden = false
    }
    ngOnInit(): void {

    }
    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    onSelectedIndexchanged(args){

        if(args.newIndex == 0){
            this.actBarTitle='Home'
        }else if(args.newIndex == 1){
            this.actBarTitle='Scan'
        }else if(args.newIndex == 2){
            this.actBarTitle='Profile'
        }else if(args.newIndex == 3){
            this.actBarTitle='Settings'
        }
    }

    editProfile(){
        this.routerExtension.navigate(['/dashboard/edit-profile'])
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