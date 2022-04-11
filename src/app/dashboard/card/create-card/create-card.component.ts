import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { Page, View } from "tns-core-modules/ui/page";
import { UiService } from "~/app/ui.service";

@Component({
    selector: 'app-create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
    public _isFabOpen: boolean;
    @ViewChild("btna", { static: false }) btna: ElementRef;
    @ViewChild("btnb", { static: false }) btnb: ElementRef;
    @ViewChild("fab", { static: false }) fab: ElementRef;
    contry: string[];
    constructor(
        private page: Page,
        private uiService: UiService
    ) {
        page.actionBarHidden = true
        this.contry = [
            "", "India", "USA", "Europe", "China", "UAE", "Others"

        ];
    }
    ngOnInit(): void {

    }
    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    displayOptions() {
        if (this._isFabOpen) {
            // Rotate main fab
            const fab = <View>this.fab.nativeElement;
            fab.animate({ rotate: 0, duration: 280, delay: 0 });

            // Show option 1
            const btna = <View>this.btna.nativeElement;
            btna.animate({ translate: { x: 0, y: 0 }, opacity: 0, duration: 280, delay: 0 });

            // Show option 2
            const btnb = <View>this.btnb.nativeElement;
            btnb.animate({ translate: { x: 0, y: 0 }, opacity: 0, duration: 280, delay: 0 });


            this._isFabOpen = false;
        } else {
            // Rotate main fab
            const view = <View>this.fab.nativeElement;
            view.animate({ rotate: 45, duration: 280, delay: 0 });

            // Show option 1
            const btna = <View>this.btna.nativeElement;
            btna.animate({ translate: { x: 0, y: -80 }, opacity: 1, duration: 280, delay: 0 });

            // Show option 2
            const btnb = <View>this.btnb.nativeElement;
            btnb.animate({ translate: { x: 0, y: -160 }, opacity: 1, duration: 280, delay: 0 });


            this._isFabOpen = true;
        }
    }

}