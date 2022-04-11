import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogService, RouterExtensions } from "nativescript-angular";
import { GetDataService } from "~/app/services/getdata.service";
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import { AddImageBottomSheet } from "~/app/bottomsheets/add-image-bottomsheet/add-image.bottomsheet";
import { STATUS_CODES } from "~/app/services/status_codes";
import { UiService } from "~/app/ui.service";

@Component({
    selector:'app-view-product',
    templateUrl:'./view-product.component.html',
    styleUrls:['./view-product.component.css']
})
export class ViewProductcomponent implements OnInit{

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
        private cd:ChangeDetectorRef,
        private uiService: UiService,
        private route: ActivatedRoute,
    ) {
        page.actionBarHidden = false
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

        this.onyoutubeSrc()
    }

    onback(){
        this.routerextension.back()
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
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

    Goedit() {
        const query = this.route.snapshot.queryParams
        var product = JSON.parse(query['product'])
        this.routerextension.navigate(['/dashboard/edit-product'], { queryParams: { product: JSON.stringify(product) } });
    }
    
}