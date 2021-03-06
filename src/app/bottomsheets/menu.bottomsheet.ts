import { Component, OnInit } from '@angular/core';
import { BottomSheetParams } from 'nativescript-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core/ui/list-view';

@Component({
    selector:'menu-bottomsheet',
    templateUrl:'menu.bottomsheet.html',
    styleUrls:['menu.bottomsheet.css']
})

export class MenuBottomSheet implements OnInit{
    options: string[];
    constructor(
        private params: BottomSheetParams
    ){}

    ngOnInit()
    {
        this.options = this.params.context;
    }

    onTap({ index }: ItemEventData) {
        this.params.closeCallback(this.options[index]);
    }
}