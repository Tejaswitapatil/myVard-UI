import { Component, OnInit } from '@angular/core';
import { BottomSheetParams } from 'nativescript-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core/ui/list-view';

@Component({
    selector:'add-image-bottomsheet',
    templateUrl:'add-image.bottomsheet.html',
    styleUrls:['add-image.bottomsheet.css']
})

export class AddImageBottomSheet implements OnInit{
    addImageText='Add Images'
    constructor(
        private params: BottomSheetParams
    ){}

    ngOnInit()
    {
        var d = this.params.context
        if(d.text){
            this.addImageText = d.text
        }
    }

    onTap(i) {
        this.params.closeCallback(i);
    }
}