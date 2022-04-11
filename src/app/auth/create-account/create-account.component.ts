import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { GetDataService } from "~/app/services/getdata.service";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../services/status_codes'
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
})

export class CreateaccountComponent implements OnInit {

    name = ''
    email = ''
    mobile = ''

    constructor(private page: Page,
        private router: Router,
        private getdata: GetDataService,
        private loginService: LoginService,
        private routerextension: RouterExtensions) {
        page.actionBarHidden = true

    }

    ngOnInit(): void {
    }

    next() {
        if(!this.getdata.validateEmail(this.email)){
            return this.getdata.toast('Enter a valid email')
        }

        if(this.mobile.length != 10){
            return this.getdata.toast('Enter valid Mobile')
        }

        if (!(this.name == '')) {
            if (!(this.email == '')) {
                if (!(this.mobile == '')) {
                    console.log(this.name, this.email, this.mobile)

                    // check registered email
                    this.getdata.loadingDialog()
                    this.loginService.checkuserexists({
                        'email': this.email,
                    }).subscribe(res => {
                        this.getdata.closeloading()
                        if(res.response_code == STATUS_CODES.SUCCESS){
                            
                            return this.getdata.toast('user with same email exists')
                        }else{
                            this.getdata.temp_name = this.name
                            this.getdata.temp_email = this.email
                            this.getdata.temp_mobile = this.mobile

                            this.routerextension.navigate(['create-account2'],{animated:true,transition:{name:'slideLeft'}})
                        }
                    },err=>{
                        this.getdata.closeloading()
                        dialogs.alert(err)
                    })
                } else this.getdata.toast('Enter mobile')
            } else this.getdata.toast('Enter Email')
        } else this.getdata.toast('Enter Name')
    }

    Goback() {
        this.routerextension.navigate(['signup'], { clearHistory: true })
    }

    onsignin() {
        this.routerextension.navigate(['login'], { clearHistory: true })
    }

}