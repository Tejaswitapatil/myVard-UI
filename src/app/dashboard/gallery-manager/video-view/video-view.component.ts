import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from "~/app/services/status_codes";

@Component({
    selector: 'app-video-view',
    templateUrl: './video-view.component.html',
    styleUrls: ['./video-view.component.css']
})
export class VideoViewcomponent implements OnInit {
    @ViewChild("player", { static: false }) player: ElementRef;

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top = 500
    left = 300

    gallery: any[] = [
        // {
        //     'title': 'My vlog 3',
        //     'videoPath': '8FAUEv_E_xQ',
        //     'link': 'https://www.youtube.com/watch?v=8FAUEv_E_xQ',
        // },

        // {
        //     'title': 'My vlog 4',
        //     'videoPath': '3M3GK6rWpyE',
        //     'link': 'https://www.youtube.com/watch?v=3M3GK6rWpyE',
        // },


        // {
        //     'title': 'My vlog 5',
        //     'videoPath': 'ZAP6q_Zv-4g',
        //     'link': 'https://www.youtube.com/watch?v=ZAP6q_Zv-4g',
        // },
    ]


    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService,
        private cd: ChangeDetectorRef
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        if (this.height > 1440) {
            // this.top = this.height * 22 / 100;
            // this.left = this.width * 25 / 100;
        } else {
            this.top = this.height * 35 / 100;
            this.left = this.width * 45 / 100;
        }

        this.getVideos()


    }

    getVideos() {
        this.getData.loadingDialog()
        this.getData.getVideoGalleryList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()
            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.gallery = res.videoGalleryData
                console.log(this.gallery)
                this.cd.detectChanges()

            } else this.getData.toast('No videos found')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    onEdit(i) {
        this.routerextension.navigate(['/dashboard/edit-video'], { queryParams: { id: i } })
    }

    onvideoplay(v) {
        console.log(v)
        this.routerextension.navigate(['/dashboard/view-video'], { queryParams: { video: JSON.stringify(v) } })
    }

    OnTap(src) {
        this.routerextension.navigate(['/dashboard/add-video'])
    }

    getPreviewImage(id) {
        return `https://img.youtube.com/vi/${this.getYoutubeId(id)}/0.jpg`
    }

    toggle() {
        const player = <any>this.player.nativeElement
        player.toggleFullscreen();
        console.log(player)
    }

    getYoutubeId(url) {
        if (this.youtube_parser(url) == undefined) {
            return this.youtube_parser2(url)
        } else return this.youtube_parser(url)

    }

    youtube_parser(url: string) {
        return url.split("v=")[1]
    }

    youtube_parser2(url: string) {
        return url.split("/")[3]
    }


}