import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { GetDataService } from "./getdata.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private getData:GetDataService,private routerExtension:RouterExtensions){

    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
            // this.router.navigateByUrl(`/login`);
            console.log(err)
            this.getData.toast('Your login just expired')
            // this.getData.closeloading()
            // this.getData.logout()
            // this.routerExtension.navigate(['logincheck'],{clearHistory:true})

            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(x=>this.handleAuthError(x)))
    }
}