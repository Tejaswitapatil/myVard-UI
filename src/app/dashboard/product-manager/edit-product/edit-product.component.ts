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
    selector:'app-edit-product',
    templateUrl:'./edit-product.component.html',
    styleUrls:['./edit-product.component.css']
})
export class EditProductcomponent implements OnInit{

    isActive = true
    productName = ''
    productDesc = ''
    productImage = ''
    productUrl = ''
    price=''
    unit=''
    currentImages=[]
    categories=[]
    categoryTitles=[]
    selectedCategory=0
    selectedCategoryName=''
    currency=['INR','USD','YEN','EUR']
    selectedCurrency=0
    currentImage = ''
    youtubeSrc = ''
    youtubeVideoId = ''
    _id=''

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService,
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
    ) {
        page.actionBarHidden = true
    }
    ngOnInit(): void {
        const query = this.route.snapshot.queryParams
        var product = JSON.parse(query['product'])
        console.log(product)
        this.productName = product.name
        this.productDesc = product.description
        this.productUrl = product.url
        this.youtubeSrc = product.youtube_link
        this.currentImages = product.image
        this.price = product.price
        this.unit = product.unit
        this._id = product._id
        this.isActive = product.status
        this.selectedCategoryName = product.category_name

        this.getCategoryList()
        this.onyoutubeSrc()
        this.fillOptionsCurrency(product.currency)
    }

    fillOptionsCategory(selectedCategoryName){
        this.categories.forEach((obj,i)=>{
            if(selectedCategoryName == obj.name){
                this.selectedCategory = i
                this.selectedCategoryName = obj.name

                this.cd.detectChanges()
            }
        })
    }

    fillOptionsCurrency(selectedCurrency){
        this.currency.forEach((obj,i)=>{
            if(selectedCurrency == obj){
                this.selectedCurrency = i

                this.cd.detectChanges()
            }
        })
    }

    getCategoryList(){
        this.categories=[]
        this.categoryTitles=[]
        this.getData.loadingDialog()
        this.getData.getCategoryList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.categories = res.categoryData
                this.categories.forEach(obj=>{
                    this.categoryTitles.push(obj.name)
                })
                this.fillOptionsCategory(this.selectedCategoryName)
                this.cd.detectChanges()

            } else this.getData.toast('No data found')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    updateProduct() {
        if (!(this.productName == '')) {
            if (!(this.productDesc == '')) {
                if (!(this.productUrl == '')) {
                    if (!(this.youtubeSrc == '')) {

                        this.getData.loadingDialog()
                        console.log({
                            uid:this._id,
                            name: this.productName,
                            description: this.productDesc,
                            image: this.currentImages,
                            youtube_link: this.youtubeSrc,
                            url: this.productUrl,
                            category:this.categories[this.selectedCategory]._id,
                            price:this.price || '0',
                            unit:this.unit || '0',
                            currency:this.currency[this.selectedCurrency],
                            status: this.isActive,
                            category_name:this.selectedCategoryName
                        })
                        this.getData.updateProduct({
                            uid:this._id,
                            name: this.productName,
                            description: this.productDesc,
                            image: this.currentImages,
                            youtube_link: this.youtubeSrc,
                            url: this.productUrl,
                            category:this.categories[this.selectedCategory]._id,
                            price:this.price || '0',
                            unit:this.unit || '0',
                            currency:this.currency[this.selectedCurrency],
                            status: this.isActive,
                            category_name:this.selectedCategoryName
                        }).subscribe(res => {
                            this.getData.closeloading()
                            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
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
            this.getData.getUploadURL({ filename: 'vcard-product-image', 'file_extension': this.getExtension(results[0].file) })
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
            this.getData.getUploadURL({ filename: 'vcard-product-image', 'file_extension': this.getExtension(results[0].file) })
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
            this.cd.detectChanges()
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

            if(result == 2){
                this.onCamera()
            }else if(result == 3){
                this.onFilepicker()
            }
        });
    }

    onchangecategoryTitles(e){        
        this.selectedCategory = e.newIndex
        this.selectedCategoryName = this.categories[this.selectedCategory].name
    }

    onchangecurrency(e){        
        this.selectedCurrency = e.newIndex
    }

    toggleStatus() {
        this.isActive = !this.isActive
    }

    onback() {
        this.routerextension.back()
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
        this.cd.detectChanges()
    }

    youtube_parser(url: string) {
        return url.split("v=")[1]
    }

    youtube_parser2(url: string) {
        return url.split("/")[3]
    }
    
}