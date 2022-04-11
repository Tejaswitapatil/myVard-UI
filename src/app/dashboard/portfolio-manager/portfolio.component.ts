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
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class Portfoliocomponent implements OnInit {

    public height = screen.mainScreen.heightPixels
    public width = screen.mainScreen.widthPixels
    top = 550
    left = 200
    projects: any[] = [
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
        this.getPortfolioList()
    }

    

    getPortfolioList() {
        this.getData.loadingDialog()
        this.getData.getPortfolioList({ uid: 0 }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.SUCCESS) {
                this.projects = res.portfolioData
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
            context: { text: 'Are you sure you want to delete' },
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
        this.getData.deletePortfolio({ uid: i._id }).subscribe(res => {
            this.getData.closeloading()

            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                this.getData.toast('project deleted')
                this.getPortfolioList()
            } else this.getData.toast('could not delete')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error deleting data')
        })
    }

    toggleStatus(i) {
        console.log(i)
        this.projects[i].status = !this.projects[i].status
        var p = this.projects
        // this.projects = []
        // this.getData.loadingDialog()
        // setTimeout(() => {
        //     this.projects = p
        //     this.getData.closeloading()
            
        // }, 3000)
        this.updateProject(this.projects[i])
    }

    updateProject(obj) {
        obj.uid = obj._id
        console.log(obj)
        this.getData.loadingDialog()
        this.getData.updatePortfolio(obj).subscribe(res => {
            this.getData.closeloading()
            this.getPortfolioList()
            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
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

    OnTap() {
        this.routerextension.navigate(['/dashboard/add-project']);
    }

    Goedit(i) {
        this.routerextension.navigate(['/dashboard/edit-project'], { queryParams: { project: JSON.stringify(i) } });
    }

    Goview(i) {
        this.routerextension.navigate(['/dashboard/view-project'], { queryParams: { project: JSON.stringify(i) } });
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }



}