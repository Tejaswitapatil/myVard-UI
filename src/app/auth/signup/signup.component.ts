import { Component, NgZone, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "~/app/services/login.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as appSettings from "tns-core-modules/application-settings";
import * as SocialLogin from "nativescript-social-login";
import { STATUS_CODES } from '../../services/status_codes'
import { GetDataService } from "~/app/services/getdata.service";

@Component({
    selector:'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})

export class SignupComponent implements OnInit{
    
    constructor( private page: Page,
        private router: Router,
        private ngZone: NgZone,
        private routerextension: RouterExtensions,
        private loginService: LoginService,
        private getData:GetDataService
        ) {
        page.actionBarHidden = true
        
        
    }

    ngOnInit(): void {
        
    }

    onsignup(){
        this.routerextension.navigate(['create-account'],{animated:true,transition:{name:'slideLeft'}})
    }

    onsignin() {
       this.routerextension.navigate(['login'],{clearHistory:true,animated:true,transition:{name:'slideRight'}})
    }

    registerwithfb() {
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
                    this.getData.toast('login failed')
                } else {
                    this.loginService.register({
                        'name': result.displayName,
                        'email': result.userToken,
                        'type': 'user',
                        'register_type': result.provider
                    }).subscribe(res => {
                        console.log(res)
                        if (res.response_code == STATUS_CODES.DATA_INSERTED) {
                            this.getData.toast('user registered successfully')
                            this.onsignin()
                        } else if (res.response_code == STATUS_CODES.ALREADY_REGISTERED) {
                            this.getData.toast('user adready regidtered')
                        } else {
                            this.getData.toast('registration failed')
                        }
                    })
                }
            })
        })
    }

    registerwithgoogle() {
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
                    this.getData.toast('login failed')
                } else {
                    this.loginService.register({
                        'name': result.displayName,
                        'email': result.userToken,
                        'type': 'user',
                        'register_type': result.provider
                    }).subscribe(res => {
                        console.log(res)
                        if (res.response_code == STATUS_CODES.DATA_INSERTED) {
                            this.getData.toast('user registered successfully')
                            this.onsignin()
                        } else if (res.response_code == STATUS_CODES.ALREADY_REGISTERED) {
                            this.getData.toast('user adready regidtered')
                        } else {
                            this.getData.toast('registration failed')
                        }
                    })
                }

            });
        });
    }

    nouserfoundDialog() {
        this.getData.toast('No user found')
    }

    errorOccured() {
        this.getData.toast('Some error occured retry again')
    }

}