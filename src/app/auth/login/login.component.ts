import { Component, ElementRef, NgZone, ViewChild, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "../../services/login.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { device } from "tns-core-modules/platform";
import { UiService } from "../../ui.service";
import * as appSettings from "tns-core-modules/application-settings";
import { GetDataService } from "../../services/getdata.service";
import * as Toast from "nativescript-toast";
import { setTimeout, clearTimeout } from "tns-core-modules/timer";
import * as utils from "tns-core-modules/utils/utils";
import { alert, AlertOptions } from "tns-core-modules/ui/dialogs";
import * as Connectivity from "tns-core-modules/connectivity";
import {
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertDialog, CFAlertStyle,
    DialogOptions
} from "nativescript-cfalert-dialog";
let cfalertDialog = new CFAlertDialog();
import { registerElement } from "@nativescript/angular/element-registry";
registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';
import * as SocialLogin from "nativescript-social-login";
import { STATUS_CODES } from '../../services/status_codes'
import { ModalDialogParams, ModalDialogService } from "nativescript-angular/directives/dialogs";
import { LoadingModal } from "~/app/loading/loading.modal";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username = ''; password = ''; number;
    securePassword = true;
    @ViewChild("password", { static: false }) p: ElementRef;

    constructor(
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private page: Page,
        private ngZone: NgZone,
        private loginService: LoginService,
        private router: Router,
        private routerextension: RouterExtensions,
        private getdata: GetDataService,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService
    ) {
        page.actionBarHidden = true
    }

    ngOnInit(): void {
                
    }

    toggleShow() {
        this.securePassword = !this.securePassword;
    }

    forgotPassword() {
        this.routerextension.navigate(['forgot-password1'], { animated: true, transition: { name: 'slideLeft' } })
    }

    onOTP() {
        this.getdata.temp_username = this.username
        this.routerextension.navigate(['login-otp'], { animated: true, transition: { name: 'slideLeft' } })
    }

    onsignup() {
        this.routerextension.navigate(['signup'], { animated: true, transition: { name: 'slideLeft' } })
    }

    loginwithcredentials() {
        if(!this.getdata.validateEmail(this.username)){
            return this.getdata.toast('Enter a valid email')
        }

        if (!(this.username == '')) {
            if (!(this.password == '')) {
                
                this.getdata.loadingDialog()
                this.loginService.loginwithcredentails({
                    'login_type': 'CREDENTIALS',
                    'email': this.username,
                    'password': this.password,
                }).subscribe(res3 => {
                    console.log(res3)
                    this.getdata.closeloading()
                    if (res3.response_code == STATUS_CODES.SUCCESS) {
                        appSettings.setString('vcardToken', res3.token)
                        appSettings.setString('vcardUsername', this.username)
                        this.routerextension.navigate(['/dashboard'],{clearHistory:true})
                    } else {
                        return this.getdata.toast('login failed. Check username password')
                    }
                },err=>{
                    this.getdata.closeloading()
                    this.getdata.toast(err)
                })
            } else {
                return this.getdata.toast('Please enter valid password')
            }
        } else {
            return this.getdata.toast('Please enter valid username')
        }
    }

    loginwithfb() {
        SocialLogin.loginWithFacebook((result) => {
            this.ngZone.run(() => {
                console.log("code: " + result.code);
                console.log("error: " + result.error);
                console.log("first name: " + result.firstName);
                console.log("last name: " + result.lastName);
                console.log("photo: " + result.photo);
                console.log("provider: " + result.provider);
                console.log("email: " + result.userToken);

                if (result.error || result.code == SocialLogin.LoginResultType.Cancelled) {
                    this.getdata.toast('login failed')
                } else {
                    this.getdata.loadingDialog()
                    this.loginService.checkuserexists({
                        'email': result.userToken,
                    }).subscribe(res => {
                        this.getdata.closeloading()
                        if (res.existing_register_type == 'facebook') {
                            this.getdata.loadingDialog()
                            this.loginService.loginwithcredentails({
                                'login_type': 'facebook',
                                'email': result.userToken,
                            }).subscribe(res2 => {
                                this.getdata.closeloading()
                                if (res2.response_code == STATUS_CODES.SUCCESS) {
                                    appSettings.setString('vcardToken', res2.token)
                                    appSettings.setString('vcardUsername', result.userToken)
                                    appSettings.setString('vcardName', result.firstName)
                                    if(result.photo) appSettings.setString('vcardUserImage', result.photo)
                                    this.routerextension.navigate(['/dashboard'],{clearHistory:true})
                                } else {
                                    this.getdata.toast('login failed. Check username password')
                                }
                            },err=>{
                                this.getdata.closeloading()
                                this.getdata.toast(err)
                            })
                        }
                    },err=>{
                        this.getdata.closeloading()
                        this.getdata.toast(err)
                    })
                }
            })
        })
    }

    loginwithgoogle() {
        SocialLogin.loginWithGoogle((result) => {
            this.ngZone.run(() => {

                console.log("code: " + result.code);
                console.log("error: " + result.error);
                console.log("email: " + result.userToken);
                console.log("first name: " + result.firstName);
                console.log("last name: " + result.lastName);
                console.log("photo: " + result.photo);
                console.log("provider: " + result.provider);
                if (result.error || result.code == SocialLogin.LoginResultType.Cancelled) {
                    this.getdata.toast('login failed')
                }else{
                    this.getdata.loadingDialog()
                    this.loginService.checkuserexists({
                        'email': result.userToken,
                    }).subscribe(res => {
                        console.log(res)
                        this.getdata.closeloading()
                        if (res.response_code == STATUS_CODES.SUCCESS) {
                            if (res.existing_register_type == 'google') {
                                this.getdata.loadingDialog()
                                this.loginService.loginwithcredentails({
                                    'login_type': 'google',
                                    'email': result.userToken,
                                }).subscribe(res1 => {
                                    console.log(res1)
                                    this.getdata.closeloading()
                                    if (res1.response_code == STATUS_CODES.SUCCESS) {
                                        appSettings.setString('vcardToken', res1.token)
                                        appSettings.setString('vcardUsername', result.userToken)
                                        appSettings.setString('vcardName', result.firstName)
                                        if(result.photo) appSettings.setString('vcardUserImage', result.photo)
                                        this.routerextension.navigate(['/dashboard'],{clearHistory:true})
                                    } else {
                                        this.getdata.toast('login failed. Check username password')
                                    }
                                },err=>{
                                    this.getdata.closeloading()
                                    this.getdata.toast(err)
                                })
                            } else {
                                this.nouserfoundDialog()
                            }
                        } else {
                            this.errorOccured()
                            this.getdata.logout()
                        }
                    },err=>{
                        this.getdata.closeloading()
                        this.getdata.toast(err)
                    })
                }

            });
        });
    }

    nouserfoundDialog() {
        this.getdata.toast('No user found')
    }

    errorOccured() {
        this.getdata.toast('Some error occured retry again')
    }

    showloading(){
        let options = {
            context: {
                'data': 'no data'
            },
            fullscreen: false,
            cancelable: true,
            animated: true,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(LoadingModal, options).then(res => {

        })

    }

}