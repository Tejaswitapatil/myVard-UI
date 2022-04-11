import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { UiService } from "~/app/ui.service";

@Component({
    selector: 'view-service',
    templateUrl: './view-service.component.html',
    styleUrls: ['./view-service.component.css']
})
export class ViewServicecomponent implements OnInit {
    isActive = true
    serviceName = ''
    serviceUrl = ''
    serviceDesc = ''
    youtubeSrc = ''
    youtubeVideoId = ''
    currentImages=[]
    currentImage=''
    _id=''

    constructor
        (
            private routerextension: RouterExtensions,
            private route: ActivatedRoute,
            private cdref:ChangeDetectorRef,
            private uiService: UiService
        ) { }


    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        var service = JSON.parse(query['service'])
        this.serviceName = service.name
        this.serviceDesc = service.description
        this.serviceUrl = service.url
        this.youtubeSrc = service.youtube_link
        this.currentImages = service.image
        this._id = service._id

        this.onyoutubeSrc()
    }

    onback() {
        this.routerextension.back()
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    toggleStatus() {
        this.isActive = !this.isActive
    }

    getPreviewImage(id) {
        if(id){
            return `https://img.youtube.com/vi/${id}/0.jpg`
        }else{
            return `~/assets/images/youtube-preview.png`
        }
        
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