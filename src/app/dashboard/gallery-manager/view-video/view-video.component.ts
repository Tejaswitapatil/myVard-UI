import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from "~/app/services/status_codes";

@Component({
    selector:'app-view-video',
    templateUrl:'./view-video.component.html',
    styleUrls:['./view-video.component.css']
})
export class Viewvideocomponent implements OnInit{

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    video
    videoId=''

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router:Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private route:ActivatedRoute,
        private cd:ChangeDetectorRef,
        private getData:GetDataService
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        this.video = JSON.parse(query['video'])
        console.log(this.video)
        this.videoId = this.getYoutubeId(this.video.link)
        this.cd.detectChanges()
    }

    onback() {
        this.routerextension.back()
    }

    deleteVideo() {
        this.getData.loadingDialog()
        this.getData.deleteVideoGallery({ uid: this.video._id }).subscribe(res => {
            this.getData.closeloading()
            if(res.response_code == STATUS_CODES.DATA_UPDATED){
                this.getData.toast('Video deleted')
                this.onback()
            }else{
                this.getData.toast('Failed to delete')
            }
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error deleting Video')
        })
    }

    getYoutubeId(url){
        if(this.youtube_parser(url) == undefined){
            return this.youtube_parser2(url)
        }else return this.youtube_parser(url)
        
    }

    youtube_parser(url: string) {
        return url.split("v=")[1]
    }

    youtube_parser2(url: string) {
        return url.split("/")[3]
    }
    
}