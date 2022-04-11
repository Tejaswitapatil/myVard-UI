import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Page, View } from "tns-core-modules/ui/page";
import { screen, device } from "tns-core-modules/platform/platform"
import { Router } from "@angular/router";
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { Imagecomponent } from '~/app/dashboard/gallery-manager/image/image.component'
import { UiService } from "~/app/ui.service";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { GetDataService } from "~/app/services/getdata.service";
import { STATUS_CODES } from "~/app/services/status_codes";
import * as appSettings from "tns-core-modules/application-settings";
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import { AddImageBottomSheet } from "~/app/bottomsheets/add-image-bottomsheet/add-image.bottomsheet";
var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
import * as filepicker from "nativescript-plugin-filepicker";
import { DatePicker } from "@nativescript/core";
import { DatepickerModal } from "~/app/modals/datepicker-modal/datepicker-modal.modal";
import { ModalDialogOptions } from "nativescript-angular/modal-dialog";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfilecomponent implements OnInit {

    minDate: Date = new Date(1975, 0, 29);
    maxDate: Date = new Date(2021, 4, 12);

    // --------------------datepicker---------------------//


    public selectedIndex = 1;
    public items: Array<string>;
    Gender = [
        "Male", "Female", "Transgender", "Others"
    ]
    month = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"
    ]
    Date: any;
    dates = []
    year = []
    contry = [
        "India", "USA", "Europe", "China", "UAE", "Others"
    ]
    username = ''
    name = ''
    email = ''
    mobile = 0
    gender = ''
    bloodgroup = ''
    dob: Date
    image = ''
    type = ''
    register_type = ''
    selectedcountryIndex = 0
    selectedgenderIndex = 0
    selecteddatesIndex = 0
    selectedmonthIndex = 0
    selectedyearIndex = 0

    constructor(
        private page: Page,
        private routerextension: RouterExtensions,
        private router: Router,
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private modal: ModalDialogService,
        private uiService: UiService,
        private getData: GetDataService,
        private cd: ChangeDetectorRef,
        private _modalService: ModalDialogService,
        private _vcRef: ViewContainerRef
    ) {
        page.actionBarHidden = false
    }

    onTap(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            context: {},
            fullscreen: true
        };

        this._modalService.showModal(DatepickerModal, options)
            .then((result: string) => {
                console.log(result);
            });
    }

    ngOnInit(): void {

        this.dates = [];
        for (var i = 1; i <= 31; i++) {
            this.dates.push(0 + i);
        }


        this.year = [];
        for (var i = 1990; i < 2015; i++) {
            this.year.push("" + i);
        }

        this.getUserProfileData()

    }

    onProfileImage() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: { text: `Change Profile Photo` },
        };

        this.bottomSheet.show(AddImageBottomSheet, options).subscribe(result => {
            console.log('Option selected:', result);
            if (result == 2) {
                this.onCamera()
            } else if (result == 3) {
                this.onFilepicker()
            } else if (result == 4) {
                this.getData.toast('not available..!')
            }
        });
    }

    getUserProfileData() {
        this.getData.loadingDialog()
        this.getData.getUserProfileData().subscribe(res => {
            this.getData.closeloading()
            console.log(res)
            if (res.response_code == STATUS_CODES.SUCCESS) {
                console.log(res.userProfileData.email)
                this.email = res.userProfileData.email
                this.name = res.userProfileData.name
                this.mobile = parseInt(res.userProfileData.mobile)
                this.dob = new Date(res.userProfileData.dob)
                this.bloodgroup = res.userProfileData.bloodGroup
                this.gender = res.userProfileData.gender
                this.type = res.userProfileData.type
                this.register_type = res.userProfileData.register_type
                this.timeformatter(this.dob)
                this.genderFormatter(this.gender)
                this.image = appSettings.getString('vcardUserImage') || '~/assets/images/No-Profile.png' || res.userProfileData.image

                this.cd.detectChanges()

            } else this.getData.toast('cannot load profile')
        }, err => {
            console.log(err)
            this.getData.closeloading()
            this.getData.toast('Error fetching data')
        })
    }

    updatePersonalProfile() {
        var temp_image = ''
        if (!this.getData.validateEmail(this.email)) {
            return this.getData.toast('Enter a valid email')
        }

        if (this.mobile.toString().length != 10) {
            return this.getData.toast('Enter valid Mobile')
        }

        if (this.image == '~/assets/images/No-Profile.png') {
            temp_image = ''
        } else {
            this.image = temp_image
        }

        console.log({
            name: this.name,
            mobile: this.mobile,
            gender: this.Gender[this.selectedgenderIndex],
            bloodGroup: this.bloodgroup,
            profileImage: this.image,
            dob: new Date(`${this.selectedmonthIndex + 1}/${this.dates[this.selecteddatesIndex]}/${this.year[this.selectedyearIndex]}`),
            type: this.type,
            register_type: this.register_type,
        })

        if (!(this.email == '')) {
            if (!(this.name == '')) {
                if (!(this.mobile == 0)) {
                    if (!(this.bloodgroup == '')) {

                        this.getData.loadingDialog()

                        this.getData.updatePersonalProfile({
                            name: this.name,
                            mobile: this.mobile,
                            gender: this.Gender[this.selectedgenderIndex],
                            bloodGroup: this.bloodgroup,
                            profileImage: this.image,
                            dob: new Date(`${this.selectedmonthIndex + 1}/${this.dates[this.selecteddatesIndex]}/${this.year[this.selectedyearIndex]}`),
                            type: this.type,
                            register_type: this.register_type,
                        }).subscribe(res => {
                            this.getData.closeloading()
                            console.log(res)
                            if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                                this.getData.toast('profile details updated')
                                this.routerextension.back()

                            } else this.getData.toast('cannot update data')
                        }, err => {
                            console.log(err)
                            this.getData.closeloading()
                            this.getData.toast('Error updating data')
                        })

                    } else return this.getData.toast('enter bloodgroup')
                } else return this.getData.toast('enter mobile')
            } else return this.getData.toast('enter name')
        } else return this.getData.toast('Invalid email')
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
            this.getData.getUploadURL({ filename: 'vcard-profile-image', 'file_extension': this.getExtension(results[0].file) })
                .subscribe(res => {
                    console.log(res)
                    this.getData.closeloading()
                    if (res.response_code == '200') {
                        this.uploadimage(res.uploadURL, results[0].file, res.fileURL)
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
            mode: "single",
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
                    this.getData.getUploadURL({ filename: 'vcard-profile-image', 'file_extension': this.getExtension(obj) })
                        .subscribe(res => {
                            console.log('URl created')
                            this.getData.closeloading()
                            if (res.response_code == '200') {
                                this.uploadimage(res.uploadURL, obj, res.fileURL)
                            }
                        }, err => {
                            this.getData.closeloading()
                            this.getData.toast('Error occured')
                        })
                })

            }).catch((e) => {
                console.log(e)
                this.getData.toast('Error selecting file')
            });


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
        task.on("responded", (res) => {
            this.onmediaEvent(res, fileUrl)
        });
        task.on("error", (res) => {
            this.onmediaEvent(res, fileUrl)
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

    onmediaEvent(e, url) {

        if (e.responseCode == 200) {
            this.image = url

            this.getData.loadingDialog()
            this.getData.updateProfileImage({ profileImage: this.image })
                .subscribe(res => {
                    this.getData.closeloading()
                    if (res.response_code == STATUS_CODES.DATA_UPDATED) {
                        this.getData.toast('Profile Image updated')
                        this.routerextension.back()
                    }
                }, err => {
                    console.log(err)
                    this.getData.closeloading()
                    this.getData.toast('Error occured')
                })

            this.cd.detectChanges()
        } else {
            this.getData.closeloading()
            this.getData.toast('Image update failed')
        }
    }

    onchangecountry(args) {
        this.selectedcountryIndex = args.newIndex
    }

    onchangegender(args) {
        this.selectedgenderIndex = args.newIndex
    }

    onchangedates(args) {
        this.selecteddatesIndex = args.newIndex
    }

    onchangemonth(args) {
        this.selectedmonthIndex = args.newIndex
    }

    onchangeyear(args) {
        this.selectedyearIndex = args.newIndex
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }


    oneditEmail() {
        this.getData.temp_email = this.email
        this.routerextension.navigate(['/dashboard/update-email']);
    }

    genderFormatter(gender) {
        this.Gender.forEach((g, i) => {
            if (g == gender) {
                this.selectedgenderIndex = i
            }
        })
    }

    timeformatter(time) {
        let day = time.getDate()
        let month = (time.getMonth() + 1)
        let year = time.getFullYear()

        this.dates.forEach((d, i) => {
            if (d == day) {
                this.selecteddatesIndex = i
            }
        })
        this.month.forEach((m, i) => {
            if (m == month) {
                this.selectedmonthIndex = i
            }
        })
        this.year.forEach((y, i) => {
            if (y == year) {
                this.selectedyearIndex = i
            }
        })
    }


    // ======================datepicker===============//

    onDatePickerLoaded(args) {
        // const datePicker = args.object as DatePicker;
    }

    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }



}