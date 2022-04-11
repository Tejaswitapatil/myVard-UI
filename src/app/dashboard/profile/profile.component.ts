import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogOptions, ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { UiService } from "~/app/ui.service";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from "~/app/services/status_codes";
import * as appSettings from "tns-core-modules/application-settings";
import { SetupProfileModal } from "~/app/modals/setup-profile-modal/setup-profile.modal";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class Profilecomponent implements OnInit {
    public selectedIndex = 1;
    public items: Array<string>;
    Gender: any;
    month: string[];
    Date: any;
    dates: any;
    year: any[];
    contry: string[];
    username=''
    name=''
    email=''
    mobile=''
    gender='NA'
    bloodgroup='NA'
    dob:Date
    dobText='NA'
    image=''

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private uiService: UiService,
        private getData:GetDataService,
        private cd:ChangeDetectorRef
    ) {
        page.actionBarHidden = false
    }

    ngOnInit(): void {
        this.contry = [
            "", "India", "USA", "Europe", "China", "UAE", "Others"

        ];

        this.Gender = [
            "Gender", "Gender", "Female", "Male", "Transgender", "Others"

        ];

        this.month = [
            "", "Month", "January", "Feb", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"
        ];


        this.dates = [];
        for (var i = 0; i < 30; i++) {
            this.dates.push(0 + i);
        }


        this.year = [];
        for (var i = 1990; i < 2015; i++) {
            this.year.push("" + i);
        }

        this.getUserProfileData()
    }

    getUserProfileData(){
        this.getData.loadingDialog()
        this.getData.getUserProfileData().subscribe(res => {
            this.getData.closeloading()
            console.log(res)
            if(res.response_code == STATUS_CODES.SUCCESS) {
                console.log(res)
                if(!res.userProfileData.dob){
                    console.log('No profile set!!')

                    const options: ModalDialogOptions = {
                        viewContainerRef: this.vcRef,
                        context: { text: `Welcome ${res.userProfileData.name}, Let's complete your profile first!` },
                        fullscreen: false
                    };

                    this.modal.showModal(SetupProfileModal, options).then((result: any) => {
            
                        if (result == 1) {
                            setTimeout(()=>{
                                this.routerextension.navigate(['/dashboard/edit-profile'])
                            },3000)
                            
                        }
                    });
                }
                this.email = res.userProfileData.email || 'NA'
                this.name = res.userProfileData.name || 'NA'
                this.mobile = res.userProfileData.mobile || 'NA'
                this.dob = new Date(res.userProfileData.dob) 
                this.bloodgroup = res.userProfileData.bloodGroup || 'NA'
                this.gender = res.userProfileData.gender || 'NA'
                this.image = appSettings.getString('vcardUserImage') || '~/assets/images/No-Profile.png' || res.userProfileData.image
                this.dobText = this.timeformatter(this.dob)

                this.cd.detectChanges()

            } else this.getData.toast('cannot load profile')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching profile data')
        })
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }

    public onopen() {
        console.log("Drop Down opened.");
    }

    public onclose() {
        console.log("Drop Down closed.");
    }


    onedit() {
        this.routerextension.navigate(['/dashboard/update-email']);
    }

    timeformatter(time)
    {
        try{
            let day = time.getDate()
            let month = (time.getMonth() + 1)
            let year = time.getFullYear()
    
            return `${day}/${month}/${year}`
        }catch(err){
            return `NA`
        }
        
    }


}