import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogOptions, ModalDialogParams, ModalDialogService, RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";
import { PageChangeEventData } from "nativescript-image-swipe";
import { GetDataService } from "~/app/services/getdata.service";
import * as Toast from "nativescript-toast";
import { STATUS_CODES } from "~/app/services/status_codes";
import { DeleteModal } from "~/app/modals/delete-modal/delete-modal.modal";

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class Imagecomponent implements OnInit {
    src
    items = [];
    pageNumber: number = 1;
    currentIndex = 1

    constructor(
        private page: Page,
        private routerextensions: RouterExtensions,
        private route: ActivatedRoute,
        private getData: GetDataService,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        this.items = JSON.parse(query['src'])
        this.pageNumber = JSON.parse(query['index'])
    }

    public pageChanged(e: PageChangeEventData) {
        console.log(`Page changed to ${e.page}.`);
        this.currentIndex = e.page
    }

    onDelete() {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { text: 'Are you sure you want to delete' },
            fullscreen: false
        };

        this.modal.showModal(DeleteModal, options).then((result: any) => {
            
            if (result == 1) {
                this.deleteImage()
            }
        });
    }

    deleteImage() {
        this.getData.loadingDialog()

        this.getData.deleteImageGallery({ uid: this.items[this.currentIndex]._id }).subscribe(res => {
            this.getData.closeloading()
            console.log(res)
            if(res.response_code == STATUS_CODES.DATA_UPDATED){
                Toast.makeText('Image deleted').show()
                this.onback()
            }else{
                Toast.makeText('Failed to delete').show()
            }
        }, err => {
            console.log(err)
            this.getData.closeloading()
            Toast.makeText('Error deleting image').show()
        })
    }

    onback() {
        this.routerextensions.back()
    }
}