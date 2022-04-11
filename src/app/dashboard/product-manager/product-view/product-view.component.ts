import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogOptions, ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from "~/app/services/status_codes";
import { DeleteModal } from "~/app/modals/delete-modal/delete-modal.modal";

@Component({
    selector:'app-product-view',
    templateUrl:'./product-view.component.html',
    styleUrls:['./product-view.component.css']
})
export class ProductViewcomponent implements OnInit{

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top=500
    left=300

    products=[
        {
            name:'Test',
            description:'test',
            status:true,
            image:['https://vvm.org.in/assets/images/Vigyan-Prasar.png','https://vvm.org.in/assets/images/Vigyan-Prasar.png','https://vvm.org.in/assets/images/Vigyan-Prasar.png']
        }
    ]

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router:Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData:GetDataService,
        private cd: ChangeDetectorRef,
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        this.getProductList()
    }

    toggleStatus(i){
        console.log(i)
        this.products[i].status = !this.products[i].status
        var p = this.products
        // this.products = []
        // setTimeout(() => {
        //     this.products = p
        //     this.updateStatus(i)
        // }, 3000)
        this.updateStatus(this.products[i])
        
    }

    getProductList() {
        this.products = []
        this.getData.loadingDialog()
        this.getData.getProductList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.products = res.productData
                // console.log(res.portfolioData)
                this.cd.detectChanges()

            } else this.getData.toast('No images found')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    onDelete(i) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { text: `Are you sure you want to delete product ${i.name}` },
            fullscreen: false
        };

        this.modal.showModal(DeleteModal, options).then((result: any) => {
            console.log(result);
            if (result == 1) {
                this.delete(i)
            }
        });
    }

    delete(i) {
        this.getData.loadingDialog()
        this.getData.deleteProduct({ uid: i._id }).subscribe(res => {
            this.getData.closeloading()
            this.getProductList()
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getData.toast('product deleted')
            } else this.getData.toast('could not delete')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error deleting data')
        })
    }

    updateStatus(obj){
        obj.uid = obj._id
        console.log(obj)
        this.getData.loadingDialog()
        this.getData.updateProductStatus(obj).subscribe(res => {
            this.getData.closeloading()
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getProductList()
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
    }

    Goedit(i) {
        this.routerextension.navigate(['/dashboard/edit-product'], { queryParams: { product: JSON.stringify(i) } });
    }

    Goview(i) {
        this.routerextension.navigate(['/dashboard/view-product'], { queryParams: { product: JSON.stringify(i) } });
    }


    OnTap() {
        this.routerextension.navigate(['/dashboard/add-product']);
    }
    
}