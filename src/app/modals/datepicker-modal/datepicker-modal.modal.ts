import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { ScrollEventData, ScrollView } from "tns-core-modules/ui/scroll-view";
import { registerElement } from '@nativescript/angular/element-registry';
import {screen} from "tns-core-modules/platform/platform"
import * as statusBar from 'nativescript-status-bar'
import { GetDataService } from "~/app/services/getdata.service";
import { DatePicker } from "@nativescript/core";


@Component({
    selector: 'datepicker-modal',
    templateUrl: './datepicker-modal.modal.html'
})
export class DatepickerModal {
    minDate: Date = new Date(1975, 0, 29);
    maxDate: Date = new Date(2021, 4, 12);


    
    constructor(private params:ModalDialogParams,private getData:GetDataService)
    {}

    public close()
    {
        this.params.closeCallback()
    }

     // ======================datepicker===============//

     onDatePickerLoaded(args) {
        // const datePicker = args.object as DatePicker;
    }

    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }

}