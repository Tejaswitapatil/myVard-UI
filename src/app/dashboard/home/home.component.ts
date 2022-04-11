import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { UiService } from "~/app/ui.service";
import { screen, device } from "tns-core-modules/platform/platform"
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class Homecomponent implements OnInit {
    public _isFabOpen: boolean;
    @ViewChild("btna", { static: false }) btna: ElementRef;
    @ViewChild("btnb", { static: false }) btnb: ElementRef;
    @ViewChild("fab", { static: false }) fab: ElementRef;
    top = 550
    left = 200
    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    name=''

    constructor(
        private page: Page,
        private uiService: UiService,
        private routerExtensions:RouterExtensions
    ) {
        // page.actionBarHidden = false
    }
    ngOnInit(): void {
        if (this.height > 1440) {
            // this.top = this.height * 25 / 100;
        }else if(this.height < 1000){
            this.top = this.height * 35 / 100;
        } else {
            this.top = this.height * 40 / 100;
        }
        console.log(this.height)
        console.log(this.top)

        this.name = appSettings.getString('vcardName')
    }
    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    displayOptions() {

        this.routerExtensions.navigate(['/dashboard/create-card'])
        
        // if (this._isFabOpen) {
        //     // Rotate main fab
        //     const fab = <View>this.fab.nativeElement;
        //     fab.animate({ rotate: 0, duration: 280, delay: 0 });

        //     // Show option 1
        //     const btna = <View>this.btna.nativeElement;
        //     btna.animate({ translate: { x: 0, y: 0 }, opacity: 0, duration: 280, delay: 0 });

        //     // Show option 2
        //     const btnb = <View>this.btnb.nativeElement;
        //     btnb.animate({ translate: { x: 0, y: 0 }, opacity: 0, duration: 280, delay: 0 });


        //     this._isFabOpen = false;
        // } else {
        //     // Rotate main fab
        //     const view = <View>this.fab.nativeElement;
        //     view.animate({ rotate: 45, duration: 280, delay: 0 });

        //     // Show option 1
        //     const btna = <View>this.btna.nativeElement;
        //     btna.animate({ translate: { x: 0, y: -80 }, opacity: 1, duration: 280, delay: 0 });

        //     // Show option 2
        //     const btnb = <View>this.btnb.nativeElement;
        //     btnb.animate({ translate: { x: 0, y: -160 }, opacity: 1, duration: 280, delay: 0 });


        //     this._isFabOpen = true;
        // }
    }

}