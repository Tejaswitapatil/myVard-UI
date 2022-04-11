import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { ScrollEventData, ScrollView } from "tns-core-modules/ui/scroll-view";
import { registerElement } from '@nativescript/angular/element-registry';
import { screen } from "tns-core-modules/platform/platform"
import * as statusBar from 'nativescript-status-bar'
import { GetDataService } from "~/app/services/getdata.service";
import { ActivatedRoute } from "@angular/router";
import { Page } from "@nativescript/core";
import { RouterExtensions } from "nativescript-angular";


@Component({
    selector: 'delete-modal',
    templateUrl: './delete-modal.modal.html'
})
export class DeleteModal {
    deleteText=''

    constructor(private params: ModalDialogParams, private getData: GetDataService, private _page: Page, private router: RouterExtensions, private _activeRoute: ActivatedRoute) {
        var d = params.context
        this.deleteText = d.text
    }

    public close() {
        this.params.closeCallback()
    }

    ngOnInit(): void { }
    onClose(v): void {
        this.params.closeCallback(v);
    }


}