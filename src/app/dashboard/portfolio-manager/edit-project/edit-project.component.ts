import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { GetDataService } from "~/app/services/getdata.service";
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import { AddImageBottomSheet } from "~/app/bottomsheets/add-image-bottomsheet/add-image.bottomsheet";
import { STATUS_CODES } from "~/app/services/status_codes";
import { UiService } from "~/app/ui.service";
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");

@Component({
    selector: 'edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectcomponent implements OnInit {
    isActive = true
    projectName = ''
    projectUrl = ''
    projectDesc = ''
    youtubeSrc = ''
    youtubeVideoId = ''
    currentImages=[]
    currentImage=''
    _id=''

    constructor
        (
            private routerextension: RouterExtensions,
            private route: ActivatedRoute,
            private cdref: ChangeDetectorRef,
            private getData: GetDataService,
            private bottomSheet: BottomSheetService,
            private containerRef: ViewContainerRef,
            private uiService: UiService
        ) { }


    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        var project = JSON.parse(query['project'])
        console.log(project)
        this.projectName = project.name
        this.projectDesc = project.description
        this.projectUrl = project.url
        this.youtubeSrc = project.youtube_link
        this.currentImages = project.image
        this._id = project._id
        this.isActive = project.status
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    updateProject() {
        if (!(this.projectName == '')) {
            if (!(this.projectDesc == '')) {
                if (!(this.projectUrl == '')) {
                    if (!(this.youtubeSrc == '')) {

                        this.getData.loadingDialog()
                        console.log({
                            name: this.projectName,
                            description: this.projectDesc,
                            image: this.currentImages,
                            youtube_link: this.youtubeSrc,
                            url: this.projectUrl,
                            status: this.isActive,
                            uid:this._id
                        })
                        this.getData.updatePortfolio({
                            name: this.projectName,
                            description: this.projectDesc,
                            image: this.currentImages,
                            youtube_link: this.youtubeSrc,
                            url: this.projectUrl,
                            status: this.isActive,
                            uid:this._id
                        }).subscribe(res => {
                            this.getData.closeloading()
                            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                                this.routerextension.back()
                                this.getData.toast('Data Updated')
                            } else {
                                console.log(res)
                                this.getData.toast('Unable to update data')
                            }
                        }, err => {
                            this.getData.closeloading()
                            console.log(err)
                            this.getData.toast('Error update data')
                        })

                    } else return this.getData.toast('Data Invalid')
                } else return this.getData.toast('Data Invalid')
            } else return this.getData.toast('Data Invalid')
        } else return this.getData.toast('Data Invalid')
    }

    onCamera() {
        let options: ImagePickerOptions = {
            android: {
                isCaptureMood: true, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 10,
                isNeedFolderList: false
            }
        };

        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openImagePicker(options);

        mediafilepicker.on("getFiles", (res) => {
            let results = res.object.get('results');
            console.dir(results);
            console.dir(results[0].file);

            this.getData.loadingDialog()
            this.getData.getUploadURL({ filename: 'vcard-gallery-image', 'file_extension': this.getExtension(results[0].file) })
            .subscribe(res => {
                console.log(res)
                this.getData.closeloading()
                if (res.response_code == '200') {
                    this.uploadimage(res.uploadURL, results[0].file)
                    this.currentImage = res.fileURL
                }
            })

        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }

    onFilepicker() {
        let options: FilePickerOptions = {
            android: {
                extensions: ['jpg', 'jpeg','png','JPG'],
                maxNumberFiles: 1,
            }
        };

        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openImagePicker(options);

        mediafilepicker.on("getFiles", (res) => {
            let results = res.object.get('results');
            console.dir(results);
            console.dir(results[0].file);

            this.getData.loadingDialog()
            this.getData.getUploadURL({ filename: 'vcard-gallery-image', 'file_extension': this.getExtension(results[0].file) })
                .subscribe(res => {
                    console.log(res)
                    this.getData.closeloading()
                    if (res.response_code == '200') {
                        this.uploadimage(res.uploadURL, results[0].file)
                        this.currentImage = res.fileURL
                    }
                })

        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }

    uploadimage(URL, imgpath) {
        console.log(imgpath)
        this.getData.loadingDialog()

        var request = {
            url: URL,
            method: "PUT",
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     "Token": 'zxcxzjbdkzsjdflskjf'
            // },
            androidAutoClearNotification: true
        };

        var params = [
            { name: 'file', filename: imgpath },
        ]

        // var task = session.multipartUpload(params, request);
        var task = session.uploadFile(imgpath, request);

        task.on("responded", this.onmediaEvent.bind(this));
        task.on("error", this.onmediaEvent.bind(this));

    }

    getExtension(path) {
        var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
            // (supports `\\` and `/` separators)
            pos = basename.lastIndexOf(".");       // get last position of `.`

        if (basename === "" || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)

        return basename.slice(pos + 1);            // extract extension ignoring `.`
    }

    onmediaEvent(e) {
        console.log(e)
        this.getData.closeloading()
        if (e.responseCode == 200) {
            this.currentImages.push(this.currentImage)
            this.getData.toast('file saved')
            this.cdref.detectChanges()
        } else {
            this.getData.toast('Unable to upload file')
        }
    }

    onback() {
        this.routerextension.back()
    }

    onselectImages() {

        if (this.currentImages.length == 5) {
            return this.getData.toast('Max 5 Images allowed')
        }
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: []
        };

        this.bottomSheet.show(AddImageBottomSheet, options).subscribe(result => {
            console.log('Option selected:', result);

            if(result == 2){
                this.onCamera()
            }else if(result == 3){
                this.onFilepicker()
            }
        });
    }

    onreset() {
        this.isActive = true
        this.projectName = ''
        this.projectUrl = ''
        this.projectDesc = ''
        this.youtubeSrc = ''
        this.youtubeVideoId = ''
        this.currentImage=''
        this.currentImages=[]
        this.cdref.detectChanges()
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