import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { ScrollEventData, ScrollView } from "tns-core-modules/ui/scroll-view";
import { registerElement } from '@nativescript/angular/element-registry';
import {screen} from "tns-core-modules/platform/platform"
import * as statusBar from 'nativescript-status-bar'
import { GetDataService } from "../services/getdata.service";

@Component({
    selector:'loading-modal',
    templateUrl:'./loading.modal.html'
})
export class LoadingModal{

    constructor(private params:ModalDialogParams,private getData:GetDataService)
    {
        var d = params.context
        console.log(d.data)
    }

    public close()
    {
        this.params.closeCallback()
    }

}