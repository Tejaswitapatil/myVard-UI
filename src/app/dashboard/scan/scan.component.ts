import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { UiService } from "~/app/ui.service";

@Component({
    selector:'app-scan',
    templateUrl:'./scan.component.html',
    styleUrls:['./scan.component.css']
})
export class Scancomponent implements OnInit{
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
}