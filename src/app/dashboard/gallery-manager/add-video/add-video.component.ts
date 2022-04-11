import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { GetDataService } from "~/app/services/getdata.service";
import * as Toast from "nativescript-toast";
import { STATUS_CODES } from "~/app/services/status_codes";
import { UiService } from "~/app/ui.service";

@Component({
    selector: 'add-video',
    templateUrl: './add-video.component.html',
    styleUrls: ['./add-video.component.css']
})
export class AddVideocomponent implements OnInit {
    youtubeSrc = ''
    youtubeVideoId = ''
    videoTitle = ''

    constructor
        (
            private routerextension: RouterExtensions,
            private route: ActivatedRoute,
            private cdref: ChangeDetectorRef,
            private getData: GetDataService,
            private uiService: UiService,
        ) { }


    ngOnInit(): void {

    }

    onback() {
        this.routerextension.back()
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    onreset() {
        this.youtubeSrc = ''
        this.youtubeVideoId = ''
        this.videoTitle = ''
        this.cdref.detectChanges()
    }

    onAdd() {
        if (!(this.videoTitle == '')) {
            if (!(this.youtubeSrc == '')) {
                this.getData.loadingDialog()
                this.getData.addVideoGallery({
                    link: this.youtubeSrc,
                    title: this.videoTitle
                }).subscribe(res => {
                    this.getData.closeloading()
                    if (res.response_code == STATUS_CODES.DATA_INSERTED) {
                        this.getData.toast('Video added')
                        this.onback()
                    } else {
                        this.getData.toast('Could not add video')
                    }
                }, err => {
                    this.getData.closeloading()
                    this.getData.toast('Error occured')
                })
            } else {
                this.getData.alertdialoge('Please enter youtube link')
            }
        } else {
            this.getData.alertdialoge('Please enter Video title')
        }
    }

    getPreviewImage(id) {
        return `https://img.youtube.com/vi/${id}/0.jpg`
    }

    onyoutubeSrc() {
        this.youtubeVideoId = this.youtube_parser(this.youtubeSrc)
        if (this.youtubeVideoId == undefined) {
            this.youtubeVideoId = this.youtube_parser2(this.youtubeSrc)
        }
        this.cdref.detectChanges()
    }

    youtube_parser(url: string) {
        return url.split("v=")[1]
    }

    youtube_parser2(url: string) {
        return url.split("/")[3]
    }

}