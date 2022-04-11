import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { UiService } from "~/app/ui.service";
import { EventData, Switch } from "@nativescript/core";

@Component({
    selector:'app-settings',
    templateUrl:'./settings.component.html',
    styleUrls:['./settings.component.css']
})
export class Settingscomponent implements OnInit{
    isActive = true
    constructor(
        private page:Page,
        private uiService: UiService
    ){
        // page.actionBarHidden = true
    }
    ngOnInit(): void {
        
    }
    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    toggleStatus() {
        this.isActive = !this.isActive
    }

}