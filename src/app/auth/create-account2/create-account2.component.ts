import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import { GetDataService } from "~/app/services/getdata.service";
import { LoginService } from "~/app/services/login.service";
import { STATUS_CODES } from '../../services/status_codes'
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: 'app-create-account2',
    templateUrl: './create-account2.component.html',
    styleUrls: ['./create-account2.component.css']
})

export class CreateaccountComponent2 implements OnInit {
    isChecked=true
    securePassword = true;
    password=''
    password2=''

    constructor(private page: Page,
        private router: Router,
        private getdata:GetDataService,
        private loginService:LoginService,
        private routerextension: RouterExtensions) {
        page.actionBarHidden = true
    }

    ngOnInit(): void {

    }

    onregister(){
        if(!(this.password == '')){
            if(this.password == this.password2){
                if(this.validatepassword(this.password2)){
                    this.getdata.loadingDialog()
                    this.loginService.register({
                        username: this.getdata.temp_email,
                        password: this.password,
                        name: this.getdata.temp_name,
                        email: this.getdata.temp_email,
                        mobile: this.getdata.temp_mobile,
                        type: 'user',
                        register_type: 'CREDENTIALS'
                    }).subscribe(res=>{
                        this.getdata.closeloading()
                        if(res.response_code == STATUS_CODES.DATA_INSERTED){
                            this.getdata.toast('user registered')
                            this.routerextension.navigate(['dashboard'],{clearHistory:true,animated:true,transition:{name:'slideLeft'}})
                        }else if(res.response_code == STATUS_CODES.ALREADY_REGISTERED){
                            this.getdata.toast('user already registered')
                            this.routerextension.navigate(['login'],{clearHistory:true,animated:true,transition:{name:'slideRight'}})
                        }
                    },err=>{
                        this.getdata.closeloading()
                        dialogs.alert(err)
                    })
                }else{
                    this.getdata.toast('Password not in proper format')
                }
            }else{
                this.getdata.toast('Password do not match')
            }
        }else{
            this.getdata.toast('Enter password')
        }
    }

    toggleShow() {
        this.securePassword = !this.securePassword;
    }

    onCheckedChange(args){
        let sw = args.object as Switch;
        this.isChecked = sw.checked;
    }

    validatepassword(p:string){
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(p)
    }

    Goback() {
        this.routerextension.back()
    }

    onsignin(){
        this.routerextension.navigate(['login'],{clearHistory:true})
    }

}