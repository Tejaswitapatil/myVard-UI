import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
import { LoginService } from "~/app/services/login.service";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
import * as Toast from "nativescript-toast";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from "~/app/services/status_codes";
import {
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertDialog, CFAlertStyle,
    DialogOptions
} from "nativescript-cfalert-dialog";
import { HttpClient } from "@angular/common/http";
let cfalertDialog = new CFAlertDialog();
import { urlconfig } from '../../../services/config'
import * as filepicker from "nativescript-plugin-filepicker";

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.css']
})
export class ImageViewcomponent implements OnInit {
    public _isFabOpen: boolean;
    @ViewChild("btna", { static: false }) btna: ElementRef;
    @ViewChild("btnb", { static: false }) btnb: ElementRef;
    @ViewChild("fab", { static: false }) fab: ElementRef;

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top = 500
    left = 300
    left2 = 200
    currentUploadfileUrl = ''
    gallery = []
    selectedImages=[]
    showCheckBox=false

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private loginService: LoginService,
        private getData: GetDataService,
        private ngZone: NgZone,
        private cd: ChangeDetectorRef,
        private http: HttpClient
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        this.getImages()
        // this.top = this.height * 35 / 100;
        if (this.height > 1440) {
            // this.top = this.height * 22 / 100;
            // this.left = this.width * 25 / 100;
            // this.left2 = this.width * 20 / 100;
        } else {
            this.top = this.height * 40 / 100;
            this.left = this.width * 45 / 100;
            this.left2 = this.width * 30 / 100;
        }
        // this.left = this.width * 45 / 100;
        // this.left2 = this.width * 30 / 100;
    }

    onLongPress(i){
        this.showCheckBox = !this.showCheckBox
    }

    checkImage(i,e){
        this.gallery[i].selected = !this.gallery[i].selected
        console.log(i,e)
    }

    getImages() {
        this.getData.loadingDialog()
        this.getData.getImageGalleryList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()
            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.gallery = res.imageGalleryData
                this.gallery.forEach(obj=>{
                    obj.selected = false
                })
                // console.log(this.gallery)
                this.cd.detectChanges()

            } else Toast.makeText('No images found').show()
        }, err => {
            console.log(err)
            this.getData.closeloading()
            Toast.makeText('Error fetching data').show()
        })
    }

    OnTap(i) {
        if(this.showCheckBox) return
        this.routerextension.navigate(['/dashboard/image'], { queryParams: { src: JSON.stringify(this.gallery), index: i } })
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
                        this.uploadimage(res.uploadURL, results[0].file, res.fileURL)
                        this.currentUploadfileUrl = res.fileURL
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

        let context = filepicker.create({
            mode: "multiple",
            extensions: ['jpg', 'jpeg', 'png', 'JPG'],
        });

        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                console.log(selection);
                selection.forEach(obj => {
                    this.getData.loadingDialog()
                    this.getData.getUploadURL({ filename: 'vcard-gallery-image', 'file_extension': this.getExtension(obj) })
                        .subscribe(res => {
                            console.log('URl created')
                            this.getData.closeloading()
                            if (res.response_code == '200') {
                                this.uploadimage(res.uploadURL, obj, res.fileURL)
                                this.currentUploadfileUrl = res.fileURL
                            }
                        },err=>{
                            this.getData.closeloading()
                            this.getData.toast('Error occured')
                        })
                })

            }).catch((e) => {
                console.log(e)
                this.getData.toast('Error selecting file')
            });

        // let options: FilePickerOptions = {
        //     android: {
        //         extensions: ['jpg', 'jpeg', 'png', 'JPG'],
        //         maxNumberFiles: 1,
        //     }
        // };

        // let mediafilepicker = new Mediafilepicker();
        // mediafilepicker.openImagePicker(options);

        // mediafilepicker.on("getFiles", (res) => {
        //     let results = res.object.get('results');
        //     console.dir(results);
        //     console.dir(results[0].file);

        //     this.getData.loadingDialog()
        //     this.getData.getUploadURL({ filename: 'vcard-gallery-image', 'file_extension': this.getExtension(results[0].file) })
        //         .subscribe(res => {
        //             console.log(res)
        //             this.getData.closeloading()
        //             if (res.response_code == '200') {
        //                 this.uploadimage(res.uploadURL, results[0].file)
        //                 this.currentUploadfileUrl = res.fileURL
        //             }
        //         })

        // });

        // mediafilepicker.on("error", function (res) {
        //     let msg = res.object.get('msg');
        //     console.log(msg);
        // });

        // mediafilepicker.on("cancel", function (res) {
        //     let msg = res.object.get('msg');
        //     console.log(msg);
        // });
    }

    uploadimage(URL, imgpath, fileUrl) {
        // console.log(imgpath)
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

        // task.on("responded", this.onmediaEvent.bind(this,'adi'));
        task.on("responded", (res)=>{
            this.onmediaEvent(res,fileUrl)
        });
        task.on("error", (res)=>{
            this.onmediaEvent(res,fileUrl)
        });

    }

    getExtension(path) {
        var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
            // (supports `\\` and `/` separators)
            pos = basename.lastIndexOf(".");       // get last position of `.`

        if (basename === "" || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)

        return basename.slice(pos + 1);            // extract extension ignoring `.`
    }

    onmediaEvent(e,url) {
        
        if (e.responseCode == 200) {

            this.getData.addImageGallery({ link: url }).subscribe(res => {
                this.getData.closeloading()
                console.log(res)
                if (res.response_code == STATUS_CODES.DATA_INSERTED) {
                    Toast.makeText('File uploaded').show()
                    this.getImages()
                } else {
                    Toast.makeText('Could not make changes').show()
                }
            }, err => {
                console.log(err)
                this.getData.closeloading()
                Toast.makeText('Error uploading file').show()
            })
        } else {
            this.getData.closeloading()
            Toast.makeText('Upload failed').show()
        }
    }

    displayOptions() {
        if (this._isFabOpen) {

            this._isFabOpen = false;

            setTimeout(() => {
                // Rotate main fab
                const fab = <View>this.fab.nativeElement;
                fab.animate({ rotate: 0, duration: 280, delay: 0 });

                // Show option 1
                const btna = <View>this.btna.nativeElement;
                btna.animate({ translate: { x: 0, y: 0 }, opacity: 0, duration: 280, delay: 0 });

                // Show option 2
                const btnb = <View>this.btnb.nativeElement;
                btnb.animate({ translate: { x: 0, y: 0 }, opacity: 0, duration: 280, delay: 0 });

            }, 500)


        } else {
            this._isFabOpen = true;

            setTimeout(() => {
                // Rotate main fab
                const view = <View>this.fab.nativeElement;
                view.animate({ rotate: 45, duration: 280, delay: 0 });

                // Show option 1
                const btna = <View>this.btna.nativeElement;
                btna.animate({ translate: { x: 0, y: -80 }, opacity: 1, duration: 280, delay: 0 });

                // Show option 2
                const btnb = <View>this.btnb.nativeElement;
                btnb.animate({ translate: { x: 0, y: -160 }, opacity: 1, duration: 280, delay: 0 });

            }, 500)

        }
    }

}