import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogOptions, ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { GetDataService } from "~/app/services/getdata.service";
import { UiService } from "~/app/ui.service";
import { STATUS_CODES } from "~/app/services/status_codes";
import { DeleteModal } from "~/app/modals/delete-modal/delete-modal.modal";

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css']
})
export class Servicecomponent implements OnInit {
    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top = 550
    left = 200
    services: any[] = [
        // {
        //     'name': 'My project',
        //     'image': [
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png'
        //     ],
        //     'description': 'Lorem ipsum dolor sit amet, consectetur...Lorem ipsum dolor sit amet, consectetur...Lorem ipsum dolor sit amet, consectetur...',
        //     'status': true,
        // },
        // {
        //     'name': 'Project name 2',
        //     'image': [
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //     ],
        //     'description': 'Lorem ipsum dolor sit amet, consectetur...',
        //     'status': false,

        // },
        // {
        //     'name': 'Project name 3',
        //     'image': [
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //         'https://vvm.org.in/assets/images/Vigyan-Prasar.png',
        //     ],
        //     'description': 'Lorem ipsum dolor sit amet, consectetur...',
        //     'status': true,
        // }

    ]

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private getData: GetDataService,
        private uiService: UiService,
        private cd: ChangeDetectorRef,
    ) {
        page.actionBarHidden = false
    }
    ngOnInit(): void {
        if (this.height > 1440) {
            // this.top = this.height * 25 / 100;
        } else {
            this.top = this.height * 40 / 100;
        }
        console.log(this.height)
        this.getServiceList()
    }

    onDelete(i) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: { text: `Are you sure you want to delete ${i.name}` },
            fullscreen: false
        };

        this.modal.showModal(DeleteModal, options).then((result: any) => {
            console.log(result);
            if (result == 1) {
                this.delete(i)
            }
        });
    }

    delete(i){
        this.getData.loadingDialog()
        this.getData.deleteService({ uid: i._id }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getData.toast('service deleted')
                this.getServiceList()
            } else this.getData.toast('could not delete')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error deleting data')
        })
    }

    getServiceList() {
        this.getData.loadingDialog()
        this.getData.getServiceList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.services = res.serviceData
                // console.log(res.serviceData)
                this.cd.detectChanges()

            } else this.getData.toast('No images found')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    OnTap() {
        this.routerextension.navigate(['/dashboard/add-service']);
    }

    Goedit(i) {
        this.routerextension.navigate(['/dashboard/edit-service'], { queryParams: { service: JSON.stringify(i) } });
    }

    Goview(i) {
        this.routerextension.navigate(['/dashboard/view-service'], { queryParams: { service: JSON.stringify(i) } });
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    toggleStatus(i) {
        console.log(i)
        this.services[i].status = !this.services[i].status
        var p = this.services
        this.services = []
        this.getData.loadingDialog()
        setTimeout(() => {
            this.services = p
            this.getData.closeloading()
        }, 3000)
    }

}