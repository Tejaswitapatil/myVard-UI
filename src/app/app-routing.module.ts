import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginCheck } from "./logincheck/logincheck.component";
import { LoginComponent } from "./auth/login/login.component";
import { LoginOtpComponent } from "./auth/login-otp/login-otp.component";
import { EnterotpComponent } from "./auth/enterotp/enterotp.component";
import { OtpverifiedComponent } from "./auth/otp-verified/otp-verified.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { CreateaccountComponent } from "./auth/create-account/create-account.component";
import { CreateaccountComponent2 } from "./auth/create-account2/create-account2.component";
import { Forgotpassword1 } from "./auth/forgot-password1/forgot-password1.component";
import { Forgotpassword2 } from "./auth/forgot-password2/forgot-password2.component";
import { Forgotpassword3 } from "./auth/forgot-password3/forgot-password3.component";
import { Forgotpassword4 } from "./auth/forgot-password4/forgot-password4.component";
import { Forgotpassword5 } from "./auth/forgot-password5/forgot-password5.component";
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
import { Productcomponent } from "./dashboard/product-manager/product.component";
import { ProductViewcomponent } from "./dashboard/product-manager/product-view/product-view.component";
import { CategoriesViewcomponent } from "./dashboard/product-manager/categories-view/categories-view.component";
import { AddCategoriescomponent } from "./dashboard/product-manager/add-category/add-categories.component";
import { AddProductcomponent } from "./dashboard/product-manager/add-product/add-product.component";
import { Viewvideocomponent } from "./dashboard/gallery-manager/view-video/view-video.component";
import { EditProductcomponent } from "./dashboard/product-manager/edit-product/edit-product.component";
import { Portfoliocomponent } from "./dashboard/portfolio-manager/portfolio.component";
import { AddProjectcomponent } from "./dashboard/portfolio-manager/add-project/add-project.component";
import { EditProjectcomponent } from "./dashboard/portfolio-manager/edit-project/edit-project.component";
import { ViewProjectcomponent } from "./dashboard/portfolio-manager/view-project/view-project.component";
import { Servicecomponent } from "./dashboard/service-manager/service.component";
import { AddServicecomponent } from "./dashboard/service-manager/add-service/add-service.component";
import { EditServicecomponent } from "./dashboard/service-manager/edit-service/edit-service.component";
import { ViewServicecomponent } from "./dashboard/service-manager/view-service/view-service.component";
import { EditVideocomponent } from "./dashboard/gallery-manager/edit-video/edit-video.component";
import { EditCategoriescomponent } from "./dashboard/product-manager/edit-category/edit-categories.component";
import { EmailUpdatedcomponent } from "./dashboard/profile/email-updated/email-updated.component";
import { EnterEmailcomponent } from "./dashboard/profile/enter-email/enter-email.component";
import { EnterOtpcomponent } from "./dashboard/profile/enter-otp/enter-otp.component";
import { EnterPhonecomponent } from "./dashboard/profile/enter-phone/enter-phone.component";
import { NewEmailcomponent } from "./dashboard/profile/new-email/new-email.component";
import { UpdateEmailcomponent } from "./dashboard/profile/update-email/update-email.component";
import { Profilecomponent } from "./dashboard/profile/profile.component";
import { Settingscomponent } from "./dashboard/settings/settings.component";
import { EditProfilecomponent } from "./dashboard/profile/edit-profile/edit-profile.component";
import { CreateCardComponent } from "./dashboard/card/create-card/create-card.component";
import { ViewProductcomponent } from "./dashboard/product-manager/view-product/view-product.component";
import { SelectImagescomponent } from "./dashboard/card/create-card/select-images/select-images.component";

const routes: Routes = [
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    // { path: "", redirectTo: 'dashboard/edit-profile', pathMatch: 'full' },
    { path: "logincheck", component: LoginCheck },
    { path: "login", component: LoginComponent },
    { path: "login-otp", component: LoginOtpComponent },
    { path: "enter-otp", component: EnterotpComponent },
    { path: 'otp-verified', component: OtpverifiedComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'create-account', component: CreateaccountComponent },
    { path: 'create-account2', component: CreateaccountComponent2 },
    { path: 'forgot-password1', component: Forgotpassword1 },
    { path: 'forgot-password2', component: Forgotpassword2 },
    { path: 'forgot-password3', component: Forgotpassword3 },
    { path: 'forgot-password4', component: Forgotpassword4 },
    { path: 'forgot-password5', component: Forgotpassword5 },
    { path: 'forgot-password6', component: Forgotpassword6 },
    { path: 'dashboard', component: Dashboardcomponent,
        children:[
            {path:'',component:Maincomponent},
            {path:'home',component:Homecomponent},
            {path:'scan',component:Scancomponent},
            {path:'settings',component:Settingscomponent},
            {path:'gallery',component:Gallerycomponent},
            {path:'image-view',component:ImageViewcomponent},
            {path:'image',component:Imagecomponent},
            {path:'video-view',component:VideoViewcomponent},
            {path:'add-video',component:AddVideocomponent},
            {path:'edit-video',component:EditVideocomponent},
            {path:'view-video',component:Viewvideocomponent},
            {path:'product',component:Productcomponent},
            {path:'product-view',component:ProductViewcomponent},
            {path:'view-product',component:ViewProductcomponent},
            {path:'categories-view',component:CategoriesViewcomponent},
            {path:'add-categories',component:AddCategoriescomponent},
            {path:'edit-categories',component:EditCategoriescomponent},
            {path:'add-product',component:AddProductcomponent},
            {path:'edit-product',component:EditProductcomponent},
            {path:'portfolio',component:Portfoliocomponent},
            {path:'add-project',component:AddProjectcomponent},
            {path:'edit-project',component:EditProjectcomponent},
            {path:'view-project',component:ViewProjectcomponent},
            {path:'service',component:Servicecomponent},
            {path:'add-service',component:AddServicecomponent},
            {path:'edit-service',component:EditServicecomponent},
            {path:'view-service',component:ViewServicecomponent},
            {path:'profile',component:Profilecomponent},
            {path:'edit-profile',component:EditProfilecomponent},
            {path:'email-updated',component:EmailUpdatedcomponent},
            {path:'enter-email',component:EnterEmailcomponent},
            {path:'enter-otp',component:EnterOtpcomponent},
            {path:'enter-phone',component:EnterPhonecomponent},
            {path:'new-email',component:NewEmailcomponent},
            {path:'update-email',component:UpdateEmailcomponent},
            {path:'create-card',component:CreateCardComponent},
            {path:'select-images',component:SelectImagescomponent},
            
            
        ] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }