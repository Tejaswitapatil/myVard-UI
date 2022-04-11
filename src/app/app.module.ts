import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular";

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { LoginCheck } from "./logincheck/logincheck.component";
import { LoginComponent } from "./auth/login/login.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SharingModule } from './SharedModule';
import { NativescriptSslPinningHttpClientModule } from "nativescript-ssl-pinning/angular"
import { NativeScriptMaterialBottomSheetModule } from "nativescript-material-bottomsheet/angular";
import { MenuBottomSheet } from "./bottomsheets/menu.bottomsheet"
import { LoginOtpComponent } from "./auth/login-otp/login-otp.component";
import { EnterotpComponent } from "./auth/enterotp/enterotp.component";
import { OtpverifiedComponent } from "./auth/otp-verified/otp-verified.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { CreateaccountComponent } from "./auth/create-account/create-account.component";
import { CreateaccountComponent2 } from "./auth/create-account2/create-account2.component";
import { LoadingModal } from "./loading/loading.modal";
import { Forgotpassword1 } from "./auth/forgot-password1/forgot-password1.component";
import { Forgotpassword2 } from "./auth/forgot-password2/forgot-password2.component";
import { Forgotpassword3 } from "./auth/forgot-password3/forgot-password3.component";
import { Forgotpassword4 } from "./auth/forgot-password4/forgot-password4.component";
import { Forgotpassword5 } from "./auth/forgot-password5/forgot-password5.component";
import { NativeScriptLottieModule } from '@nativescript-community/ui-lottie/angular';
import { Forgotpassword6 } from "./auth/forgot-password6/forgot-password6.component";
import { Dashboardcomponent } from "./dashboard/dashboard.component";
import { Maincomponent } from "./dashboard/main/main.component";
import { Gallerycomponent } from "./dashboard/gallery-manager/galery.component";
import { Homecomponent } from "./dashboard/home/home.component";
import { Scancomponent } from "./dashboard/scan/scan.component";
import { ImageViewcomponent } from "./dashboard/gallery-manager/image-view/image-view.component";
import { VideoViewcomponent } from "./dashboard/gallery-manager/video-view/video-view.component";
import { Imagecomponent } from "./dashboard/gallery-manager/image/image.component";
import { AddVideocomponent } from "./dashboard/gallery-manager/add-video/add-video.component";
import { YoutubePlayerModule } from 'nativescript-youtubeplayer/angular';
import { Productcomponent } from "./dashboard/product-manager/product.component";
import { CategoriesViewcomponent } from "./dashboard/product-manager/categories-view/categories-view.component";
import { ProductViewcomponent } from "./dashboard/product-manager/product-view/product-view.component";
import { AddImageBottomSheet } from "./bottomsheets/add-image-bottomsheet/add-image.bottomsheet";
import { AddCategoriescomponent } from "./dashboard/product-manager/add-category/add-categories.component";
import { AddProductcomponent } from "./dashboard/product-manager/add-product/add-product.component";
import { Viewvideocomponent } from "./dashboard/gallery-manager/view-video/view-video.component";
import { EditProductcomponent } from "./dashboard/product-manager/edit-product/edit-product.component";
import { Portfoliocomponent } from "./dashboard/portfolio-manager/portfolio.component";
import { AddProjectcomponent } from "./dashboard/portfolio-manager/add-project/add-project.component";
import { EditProjectcomponent } from "./dashboard/portfolio-manager/edit-project/edit-project.component";
import { ViewProjectcomponent } from "./dashboard/portfolio-manager/view-project/view-project.component";
import { SaveChangesModal } from "./dashboard/portfolio-manager/save-changes-modal/save-changes.modal";
import { Servicecomponent } from "./dashboard/service-manager/service.component";
import { AddServicecomponent } from "./dashboard/service-manager/add-service/add-service.component";
import { EditServicecomponent } from "./dashboard/service-manager/edit-service/edit-service.component";
import { ViewServicecomponent } from "./dashboard/service-manager/view-service/view-service.component";
import { EditVideocomponent } from "./dashboard/gallery-manager/edit-video/edit-video.component";
import { DeleteModal } from "./modals/delete-modal/delete-modal.modal";
import { AddModal } from "./modals/add-modal/add.modal";
import { EditCategoriescomponent } from "./dashboard/product-manager/edit-category/edit-categories.component";
import { Profilecomponent } from "./dashboard/profile/profile.component";
import { EmailUpdatedcomponent } from "./dashboard/profile/email-updated/email-updated.component";
import { EnterEmailcomponent } from "./dashboard/profile/enter-email/enter-email.component";
import { EnterOtpcomponent } from "./dashboard/profile/enter-otp/enter-otp.component";
import { EnterPhonecomponent } from "./dashboard/profile/enter-phone/enter-phone.component";
import { NewEmailcomponent } from "./dashboard/profile/new-email/new-email.component";
import { UpdateEmailcomponent } from "./dashboard/profile/update-email/update-email.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./services/http-interceptor.service";
import { Settingscomponent } from "./dashboard/settings/settings.component";
import { EditProfilecomponent } from "./dashboard/profile/edit-profile/edit-profile.component";
import { CreateCardComponent } from "./dashboard/card/create-card/create-card.component";
import { ProductsTabComponent } from "./dashboard/card/create-card/products-tab/products-tab.component";
import { ViewProductcomponent } from "./dashboard/product-manager/view-product/view-product.component";
import { SetupProfileModal } from "./modals/setup-profile-modal/setup-profile.modal";
import { SelectImagescomponent } from "./dashboard/card/create-card/select-images/select-images.component";
import { DatepickerModal } from "./modals/datepicker-modal/datepicker-modal.modal";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        FormsModule,
        SharingModule,
        DropDownModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NativeScriptUIListViewModule,
        TNSCheckBoxModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        NativeScriptMaterialBottomSheetModule.forRoot(),
        NativeScriptLottieModule,
        YoutubePlayerModule,
    ],
    entryComponents: [
        MenuBottomSheet,
        LoadingModal,
        AddImageBottomSheet,
        SaveChangesModal,
        DeleteModal,
        AddModal,
        SetupProfileModal,
        DatepickerModal
    ],
    declarations: [
        AppComponent,
        LoginCheck,
        LoginComponent,
        LoginOtpComponent,
        MenuBottomSheet,
        AddImageBottomSheet,
        EnterotpComponent,
        OtpverifiedComponent,
        SignupComponent,
        CreateaccountComponent,
        CreateaccountComponent2,
        LoadingModal,
        DeleteModal,
        AddModal,
        DatepickerModal,
        SetupProfileModal,
        Forgotpassword1,
        Forgotpassword2,
        Forgotpassword3,
        Forgotpassword4,
        Forgotpassword5,
        Forgotpassword6,
        Dashboardcomponent,
        Maincomponent,
        Gallerycomponent,
        Homecomponent,
        Scancomponent,
        Settingscomponent,
        ImageViewcomponent,
        Imagecomponent,
        VideoViewcomponent,
        Viewvideocomponent,
        EditVideocomponent,
        AddVideocomponent,
        Productcomponent,
        ViewProductcomponent,
        CategoriesViewcomponent,
        AddCategoriescomponent,
        EditCategoriescomponent,
        ProductViewcomponent,
        AddProductcomponent,
        EditProductcomponent,
        Portfoliocomponent,
        AddProjectcomponent,
        EditProjectcomponent,
        ViewProjectcomponent,
        SaveChangesModal,
        Servicecomponent,
        AddServicecomponent,
        EditServicecomponent,
        ViewServicecomponent,
        Profilecomponent,
        EditProfilecomponent,
        EmailUpdatedcomponent,
        EnterEmailcomponent,
        EnterOtpcomponent,
        EnterPhonecomponent,
        NewEmailcomponent,
        UpdateEmailcomponent,
        CreateCardComponent,
        SelectImagescomponent,
        ProductsTabComponent
    ],
    providers: [
        ModalDialogService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class AppModule { }
