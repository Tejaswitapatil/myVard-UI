import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { ScrollEventData, ScrollView } from "tns-core-modules/ui/scroll-view";
import { registerElement } from '@nativescript/angular/element-registry';
import {screen} from "tns-core-modules/platform/platform"
import * as statusBar from 'nativescript-status-bar'
import { ActivatedRoute } from "@angular/router";
import { Page } from "@nativescript/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector:'save-changes-modal',
    templateUrl:'./save-changes.modal.html'
})
export class SaveChangesModal implements OnInit {
    constructor(private _params: ModalDialogParams, private _page: Page, private router: RouterExtensions, private _activeRoute: ActivatedRoute) {}

    ngOnInit(): void {}
    onClose(): void {
        this._params.closeCallback("return value");
    }
}