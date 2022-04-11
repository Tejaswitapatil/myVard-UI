import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { android as androidAppInstance } from "tns-core-modules/application"

@Injectable({providedIn:'root'})
export class UiService {
    public dashboardCall: Subject<any> = new Subject();
    private _drawerState = new BehaviorSubject<void>(null)
    private _sideDrawerEnabled = new BehaviorSubject(false);
    checkRouteActive;

    constructor(private router:Router) {}

    set sideDrawer(value: boolean) {
    this._sideDrawerEnabled.next(value);
    }

    get sideDrawerEnabled(): BehaviorSubject<boolean> {
        return this._sideDrawerEnabled;
    }

    get drawerState()
    {
        return this._drawerState.asObservable()
    }

    toggleDrawer()
    {
            return this._drawerState.next()
    }

    isAirplaneModeOn(): boolean {
        return android.provider.Settings.System.getInt(androidAppInstance.context.getContentResolver(),
            android.provider.Settings.System.AIRPLANE_MODE_ON) !== 0;
    }

    addActive() {
        if(this.router.isActive('dashboard',true)) {
          return true;
        } else {
            return false;
        }
    }
}