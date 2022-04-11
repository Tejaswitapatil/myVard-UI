import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogService, RouterExtensions } from "nativescript-angular";
import { GetDataService } from "~/app/services/getdata.service";
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import { AddImageBottomSheet } from "~/app/bottomsheets/add-image-bottomsheet/add-image.bottomsheet";
import { STATUS_CODES } from "~/app/services/status_codes";
import { UiService } from "~/app/ui.service";
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");

@Component({
    selector: 'app-add-categories',
    templateUrl: './add-categories.component.html',
    styleUrls: ['./add-categories.component.css']
})
export class AddCategoriescomponent implements OnInit {

    isActive = true
    categoryName = ''
    categoryDesc = ''
    categoryImage = ''
    currentImages=[]
    currentImage = ''

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService,
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private cdref: ChangeDetectorRef,
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {

    }

    toggleStatus() {
        this.isActive = !this.isActive
    }

    onCategory() {
        if (!(this.categoryName == '')) {
            if (!(this.categoryDesc == '')) {
                this.getData.loadingDialog()
                console.log({
                    name: this.categoryName,
                    description: this.categoryDesc,
                    image: this.currentImages[0],
                    status: this.isActive
                })
                this.getData.addCategory({
                    name: this.categoryName,
                    description: this.categoryDesc,
                    image: this.currentImages[0],
                    status: this.isActive
                }).subscribe(res => {
                    this.getData.closeloading()
                    if (res.response_code == STATUS_CODES.DATA_INSERTED) {
                        this.routerextension.back()
                        this.getData.toast('Data Inserted')
                    } else {
                        console.log(res)
                        this.getData.toast('Unable to Insert data')
                    }
                }, err => {
                    this.getData.closeloading()
                    console.log(err)
                    this.getData.toast('Error Insert data')
                })
            } else return this.getData.toast('Data Invalid')
        } else return this.getData.toast('Data Invalid')

    }

    onreset() {
        this.isActive = true
        this.categoryName = ''
        this.categoryDesc = ''
        this.categoryImage = ''
        this.currentImage = ''
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
            this.getData.getUploadURL({ filename: 'vcard-category-image', 'file_extension': this.getExtension(results[0].file) })
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
                extensions: ['jpg', 'jpeg', 'png', 'JPG'],
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
            this.getData.getUploadURL({ filename: 'vcard-category-image', 'file_extension': this.getExtension(results[0].file) })
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
            // this.currentImages.push(this.currentImage)
            this.currentImages[0] = this.currentImage
            this.getData.toast('file saved')
            this.cdref.detectChanges()
        } else {
            this.getData.toast('Unable to upload file')
        }
    }

    onselectImages() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: []
        };

        this.bottomSheet.show(AddImageBottomSheet, options).subscribe(result => {
            console.log('Option selected:', result);

            if (result == 2) {
                this.onCamera()
            } else if (result == 3) {
                this.onFilepicker()
            }
        });
    }

    onback() {
        this.routerextension.back()
    }

}