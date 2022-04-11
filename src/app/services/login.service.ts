import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "tns-core-modules/application-settings";
import { urlconfig } from './config'
import * as appSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn:"root"
})
export class LoginService{
    
    constructor(private http:HttpClient)
    {
        
    }

    register(data){
        return this.http.post<{response_code:string}>(urlconfig.registerUrl+'/addUser',data)
    }

    resetPassword(data){
        let header = new HttpHeaders({
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "token": appSettings.getString('vcardTokentemp')
        });
        return this.http.post<{response_code:string}>(urlconfig.loginUrl+'/resetPassword',data,{headers: header})
    }

    signin(data){
        return this.http.post<{response_code:string}>(urlconfig.registerUrl+'/addUser',data)
    }

    getOTP(data){
        return this.http.post<{response_code:string}>(urlconfig.commonUrl+'/sendOTP',data)
    }

    verifyOTP(data){
        return this.http.post<{response_code:string,token:string}>(urlconfig.commonUrl+'/verifyOTP',data)
    }

    verifyOTPWithLogin(data){
        return this.http.post<{response_code:string,token:string}>(urlconfig.loginUrl+'/verifyOTPWithLogin',data)
    }

    checkuserexists(data){
        return this.http.post<{response_code:string,existing_register_type:string}>(urlconfig.loginUrl+'/checkUserExits',data)
    }

    loginwithcredentails(data){
        return this.http.post<{response_code:string,token:string}>(urlconfig.loginUrl+'/verifyUserLogin',data)
    }


}