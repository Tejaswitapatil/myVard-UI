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
    selector: 'app-categories-view',
    templateUrl: './categories-view.component.html',
    styleUrls: ['./categories-view.component.css']
})
export class CategoriesViewcomponent implements OnInit {

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top = 500
    left = 300
    categories: any[] = [
        //   {
        //       'name': 'Default Category',
        //       'imagePaths': 'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //       'description': 'Lorem ipsum dolor sit amet, consectetur...Lorem ipsum dolor sit amet, consectetur...Lorem ipsum dolor sit amet, consectetur...',
        //       'status': true,
        //   },
        //   {
        //       'name': 'Category 1',
        //       'imagePaths': 'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //       'description': 'Lorem ipsum dolor sit amet, consectetur...',
        //       'status': false,

        //   }

    ]


    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService,
        private cd: ChangeDetectorRef,
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        this.getCategoryList()
    }

    getCategoryList() {
        this.categories = []
        this.getData.loadingDialog()
        this.getData.getCategoryList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.categories = res.categoryData
                // console.log(res)
                this.cd.detectChanges()

            } else this.getData.toast('No data found')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    toggleStatus(i) {
        console.log(i)
        this.categories[i].status = !this.categories[i].status
        var p = this.categories
        // this.categories = []
        // this.getData.loadingDialog()
        // setTimeout(() => {
        //     this.categories = p
        //     this.getData.closeloading()

        // }, 3000)
        this.updateStatus(this.categories[i])

    }

    updateStatus(obj) {

        obj.uid = obj._id
        console.log(obj)
        this.getData.loadingDialog()
        this.getData.updateCategoryStatus(obj).subscribe(res => {
            this.getData.closeloading()
            console.log(res)
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getCategoryList()
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
        this.routerextension.navigate(['/dashboard/edit-categories'], { queryParams: { category: JSON.stringify(i) } });
    }

    onDelete(i) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { text: `Are you sure you want to delete ${i.name}.` },
            fullscreen: false
        };

        this.modal.showModal(DeleteModal, options).then((result: any) => {
            console.log(result);
            if (result == 1) {
                this.deleteProducts(i)
            }
        });
    }

    deleteProducts(i) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { text: `Do you want to delete products with category ${i.name}.` },
            fullscreen: false
        };

        this.modal.showModal(DeleteModal, options).then((result: any) => {
            console.log(result);
            if (result == 1) {
                this.delete(i, 'yes')
            } else if (result == 2) {
                this.delete(i, 'no')
            }
        });
    }

    delete(i, product_delete) {
        this.getData.loadingDialog()
        this.getData.deleteCategory({ uid: i._id, product_delete: product_delete }).subscribe(res => {
            this.getData.closeloading()
            console.log(res)
            this.getCategoryList()
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getData.toast('category deleted')
            } else if (res.response_code == STATUS_CODES.DATABASE_RUNTIME_ERROR) {
                this.getData.toast('category deleted without products')
            } else this.getData.toast('could not delete')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error deleting data')
        })
    }

    OnTap() {
        this.routerextension.navigate(['/dashboard/add-categories']);
    }



}