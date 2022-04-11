import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Observable, Page } from 'tns-core-modules/ui/page';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { UiService } from '../ui.service';
import { Subscription } from "rxjs";
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import * as appSettings from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as utils from "tns-core-modules/utils/utils";
import { filter } from "rxjs/operators";
import * as geoLocation from "nativescript-geolocation";
import { getCurrentLocation } from 'nativescript-geolocation';
import { LoginService } from '../services/login.service';
import { GetDataService } from '../services/getdata.service';

import { registerElement } from "@nativescript/angular/element-registry";
registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
import { MenuBottomSheet } from "../bottomsheets/menu.bottomsheet";
import { BottomSheetOptions, BottomSheetService } from 'nativescript-material-bottomsheet/angular';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class Dashboardcomponent implements OnInit {

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;
    selectedIndex: Number = 1;
    indexobserver: Observable;
    _activatedUrl: string = '/'
    private dashboardCall;
    public navItem;
    username=''
    profileImage=''
    name=''

    constructor(
        page: Page, private _changeDetectionRef: ChangeDetectorRef,
        private uiService: UiService, private loginservice: LoginService,
        private getdata: GetDataService,
        private bottomSheet: BottomSheetService,
        private containerRef: ViewContainerRef,
        private router: Router, private routerExtensions: RouterExtensions
    ) {
        // page.actionBarHidden = false
    }
    ngOnInit() {
        this.dashboardCall = this.uiService.dashboardCall.subscribe((state) => {
            // console.log('setNavItem 1', state);
            this.setNavItem(state);
        });
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState()
            }
        });
        console.log(appSettings.getString('vcardToken'))
        
        this.name = appSettings.getString('vcardName')
        this.username = appSettings.getString('vcardUsername')
        this.profileImage = appSettings.getString('vcardUserImage') || '~/assets/images/No-Profile.png'
    }

    fabTap() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: ['Facebook', 'Google', 'Twitter'],
        };

        this.bottomSheet.show(MenuBottomSheet, options).subscribe(result => {
            console.log('Option selected:', result);
        });
    }

    onSelectedIndexChanged(e) {
        console.log(e)
    }

    enableLocationServices(): void {
        geoLocation.isEnabled().then(enabled => {
            if (!enabled) {
                geoLocation.enableLocationRequest().then(() => this.getlocation())
            } else {
                this.getlocation()
            }
        });
    }

    getlocation() {
        geoLocation.watchLocation(location => {

        }, error => {
            alert(error);
        }, {
            desiredAccuracy: 3,
            updateDistance: 10,
            minimumUpdateTime: 1000 * 1
        })
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                setTimeout(() => {
                    this.setNavItem(event.url);
                    //console.log('on back press');
                }, 400);
            }
        });
    }

    selectedmenu(i) {
        this.selectedIndex = i
        //console.log(i)
    }

    /* ngAfterViewInit() {
      this.drawer = this.drawerComponent.sideDrawer;
      this._changeDetectionRef.detectChanges();
    } */

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }



    logOut() {
        this.uiService.toggleDrawer()
        this.getdata.logout()
        this.routerExtensions.navigate(['login'], { clearHistory: true });
    }

    gallerymanager() {
        this.uiService.toggleDrawer()
        this.routerExtensions.navigate(['/dashboard/gallery']);
    }

    productmanager() {
        this.uiService.toggleDrawer()
        this.routerExtensions.navigate(['/dashboard/product']);
    }

    portfoliomanager() {
        this.uiService.toggleDrawer()
        this.routerExtensions.navigate(['/dashboard/portfolio']);
    }

    servicemanager() {
        this.uiService.toggleDrawer()
        this.routerExtensions.navigate(['/dashboard/service']);
    }

    home() {
        this.uiService.toggleDrawer()
        this.routerExtensions.navigate(['/dashboard']);
    }



    alertLogout() {
        dialogs.confirm({
            title: "Logout",
            message: "Are you sure you want to logout?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            cancelable: false
        }).then(result => {
            if (result) {
                this.logOut();
            } else {
                //console.log('do nothing')
            }
        });
    }

    setNavItem($navItem) {
        // console.log('setNavItem', $navItem);
        this.navItem = $navItem;
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe()
        }
    }
}