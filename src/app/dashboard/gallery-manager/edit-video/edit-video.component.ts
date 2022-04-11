import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { GetDataService } from "~/app/services/getdata.service";
import * as Toast from "nativescript-toast";
import { STATUS_CODES } from "~/app/services/status_codes";
import { UiService } from "~/app/ui.service";

@Component({
    selector: 'edit-video',
    templateUrl: './edit-video.component.html',
    styleUrls: ['./edit-video.component.css']
})
export class EditVideocomponent implements OnInit {
    youtubeSrc = ''
    youtubeVideoId = ''
    videoTitle = ''
    itemId

    constructor
        (
            private routerextension: RouterExtensions,
            private route: ActivatedRoute,
            private cd: ChangeDetectorRef,
            private getData: GetDataService,
            private uiService: UiService,
        ) { }


    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        this.itemId = query['id']
        this.getVideo()
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    getVideo(){
        this.getData.loadingDialog()
        this.getData.getVideoGalleryList({uid:this.itemId}).subscribe(res=>{
            this.getData.closeloading()
            console.log(res)
            if(res.response_code == STATUS_CODES.SUCCESS){
                this.videoTitle = res.videoGalleryData.title
                this.youtubeSrc = res.videoGalleryData.link
                this.onyoutubeSrc()
                this.cd.detectChanges()

            }else this.getData.toast('No images found')
        },err=>{
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    onback() {
        this.routerextension.back()
    }

    onreset() {
        this.youtubeSrc = ''
        this.youtubeVideoId = ''
        this.videoTitle = ''
        this.cd.detectChanges()
    }

    onEdit() {
        if (!(this.videoTitle == '')) {
            if (!(this.youtubeSrc == '')) {
                this.getData.loadingDialog()
                this.getData.updateVideoGallery({
                    link: this.youtubeSrc,
                    title: this.videoTitle,
                    uid: this.itemId
                }).subscribe(res => {
                    this.getData.closeloading()
                    console.log(res)
                    if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                        this.getData.toast('Video edited')
                        this.onback()
                    } else {
                        this.getData.toast('Could not edit video')
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
        this.cd.detectChanges()
    }

    youtube_parser(url: string) {
        return url.split("v=")[1]
    }

    youtube_parser2(url: string) {
        return url.split("/")[3]
    }

}