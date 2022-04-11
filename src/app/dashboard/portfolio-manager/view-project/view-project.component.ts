import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { GetDataService } from "~/app/services/getdata.service";
import { UiService } from "~/app/ui.service";
import { STATUS_CODES } from "~/app/services/status_codes";

@Component({
    selector: 'view-project',
    templateUrl: './view-project.component.html',
    styleUrls: ['./view-project.component.css']
})
export class ViewProjectcomponent implements OnInit {
    isActive = true
    projectName = ''
    projectUrl = ''
    projectDesc = ''
    youtubeSrc = ''
    youtubeVideoId = ''
    currentImages = []
    currentImage = ''
    _id = ''

    constructor
        (
            private routerextension: RouterExtensions,
            private route: ActivatedRoute,
            private cd: ChangeDetectorRef,
            private uiService: UiService,
            private getData: GetDataService
        ) { }


    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        var project = JSON.parse(query['project'])

        this._id = project._id
        this.getPortfolioList()

    }

    getPortfolioList() {
        this.getData.loadingDialog()
        this.getData.getPortfolioList({ uid: this._id }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.SUCCESS) {
                var project = res.portfolioData
                this.projectName = project.name
                this.projectDesc = project.description
                this.projectUrl = project.url
                this.youtubeSrc = project.youtube_link
                this.currentImages = project.image
                this.isActive = project.status
                this.onyoutubeSrc()
                this.cd.detectChanges()

            } else this.getData.toast('No data found')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    onback() {
        this.routerextension.back()
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    toggleStatus() {
        this.isActive = !this.isActive

        this.updateProject({
            name:this.projectName,
            description:this.projectDesc,
            url:this.projectUrl,
            youtube_link:this.youtubeSrc,
            image:this.currentImages,
            status:this.isActive
        })
    }

    updateProject(obj) {
        obj.uid = this._id
        console.log(obj)
        this.getData.loadingDialog()
        this.getData.updatePortfolio(obj).subscribe(res => {
            this.getData.closeloading()
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getData.toast('Data Updated')
                this.getPortfolioList()
            } else {
                console.log(res)
                this.getData.toast('Unable to update data')
            }
        }, err => {
            this.getData.closeloading()
            console.log(err)
            this.getData.toast('Error update data')
        })

    }

    Goedit() {
        const query = this.route.snapshot.queryParams
        var project = JSON.parse(query['project'])
        this.routerextension.navigate(['/dashboard/edit-project'], { queryParams: { project: JSON.stringify(project) } });
    }

    getPreviewImage(id) {
        if (id) {
            return `https://img.youtube.com/vi/${id}/0.jpg`
        } else {
            return `~/assets/images/youtube-preview.png`
        }

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