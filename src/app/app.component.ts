import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import * as statusBar from 'nativescript-status-bar'
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
const app = require('tns-core-modules/application')
import { UiService } from './ui.service';
import { Subscription } from "rxjs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { android as androidAppInstance } from "tns-core-modules/application"
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import * as application from 'tns-core-modules/application';
import { knownFolders } from 'tns-core-modules/file-system'
import {SslPinning} from "nativescript-ssl-pinning";
import * as fs from "tns-core-modules/file-system";
import { NativescriptSslPinningHttpClientModule } from "nativescript-ssl-pinning/angular";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
// import * as insomnia from 'nativescript-insomnia'
import { AlertTypesConstants, StoreUpdate } from 'nativescript-store-update'

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls:['app.component.css']
})

export class AppComponent implements OnInit{
 

    constructor(private uiService:UiService,private _changeDetectionRef: ChangeDetectorRef,
        private router:Router,
        private http:HttpClient)
    {   
          

    }
  
    ngOnInit(){
        StoreUpdate.checkForUpdate()

        this.uiService.sideDrawerEnabled.subscribe(x=>{
            //this.sideDrawerEnabled = x
          })
      
          /* this.drawerSub = this.uiService.drawerState.subscribe(()=>{
            if(this.drawer)
            {
             this.drawer.toggleDrawerState()
            } 
            
        })*/

        //statusBar.hide(); 
    }

    ngAfterViewInit() {
        //this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }
 }
