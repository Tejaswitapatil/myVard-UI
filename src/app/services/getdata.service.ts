import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { CrossPlatformAES } from 'nativescript-crossplatform-aes';
let cryptLib = new CrossPlatformAES();
import { SslPinning } from "nativescript-ssl-pinning";
import * as fs from "tns-core-modules/file-system";
import { Http } from "@nativescript/core";
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";
import { DownloadProgress } from "nativescript-download-progress"
const dp = new DownloadProgress();
const permissions = require('nativescript-permissions')
import * as fileSystem from "tns-core-modules/file-system";
import {
  CFAlertActionAlignment,
  CFAlertActionStyle,
  CFAlertDialog, CFAlertStyle,
  DialogOptions
} from "nativescript-cfalert-dialog";
let cfalertDialog = new CFAlertDialog();
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as SocialLogin from "nativescript-social-login";
import { BehaviorSubject } from 'rxjs';
import { urlconfig } from './config'
import * as Toast from "nativescript-toast";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  appversion = 'v1'
  appversionnumber = 10

  temp_username = ''
  temp_name = ''
  temp_email = ''
  temp_mobile = ''
  temp_otp = ''
  temp_otp_token = ''

  constructor(private http: HttpClient) {

  }

  logout() {
    appSettings.clear()
    SocialLogin.logout(() => { })
  }

  toast(t) {
    Toast.makeText(t).show()
  }

  alertdialoge(t) {
    dialogs.alert(t)
  }

  loadingDialog() {

    cfalertDialog.dismiss(true)
    let options: DialogOptions = {
      dialogStyle: CFAlertStyle.NOTIFICATION,
      title: "Loading",
      message: "Please wait...",
      cancellable: true,
    }
    cfalertDialog.show(options);
  }

  closeloading() {
    cfalertDialog.dismiss(true)
  }

  //portfolio
  deletePortfolio(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.portfolioUrl + '/deletePortfolio', data, { headers: header })
  }
  getPortfolioList(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string, portfolioData: any }>(urlconfig.portfolioUrl + '/getPortfolioList', data, { headers: header })
  }
  updatePortfolio(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.portfolioUrl + '/updatePortfolio', data, { headers: header })
  }
  addPortfolio(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.portfolioUrl + '/addPortfolio', data, { headers: header })
  }


  //service
  deleteService(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.serviceUrl + '/deleteService', data, { headers: header })
  }
  getServiceList(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string, serviceData: any }>(urlconfig.serviceUrl + '/getServiceList', data, { headers: header })
  }
  getService(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string, portfolioData: any }>(urlconfig.serviceUrl + '/getService', data, { headers: header })
  }
  updateService(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.serviceUrl + '/updateService', data, { headers: header })
  }
  addService(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.serviceUrl + '/addService', data, { headers: header })
  }


  //videogallery
  deleteVideoGallery(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string, imageGalleryData: Array<any> }>(urlconfig.galleryUrl + '/deleteVideoGallery', data, { headers: header })
  }
  getVideoGalleryList(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string, videoGalleryData: any }>(urlconfig.galleryUrl + '/getVideoGalleryList', data, { headers: header })
  }
  updateVideoGallery(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string }>(urlconfig.galleryUrl + '/updateVideoGallery', data, { headers: header })
  }
  addVideoGallery(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string }>(urlconfig.galleryUrl + '/addVideoGallery', data, { headers: header })
  }


  //imagegallery
  deleteImageGallery(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string, imageGalleryData: Array<any> }>(urlconfig.galleryUrl + '/deleteImageGallery', data, { headers: header })
  }
  getImageGalleryList(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string, imageGalleryData: Array<any> }>(urlconfig.galleryUrl + '/getImageGalleryList', data, { headers: header })
  }
  addImageGallery(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string }>(urlconfig.galleryUrl + '/addImageGallery', data, { headers: header })
  }

  //category
  deleteCategory(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.categoryUrl + '/deleteCategory', data, { headers: header })
  }
  getCategoryList(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string, categoryData: any }>(urlconfig.categoryUrl + '/getCategoryList', data, { headers: header })
  }
  addCategory(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.categoryUrl + '/addCategory', data, { headers: header })
  }
  updateCategory(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.categoryUrl + '/updateCategory', data, { headers: header })
  }
  updateCategoryStatus(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.categoryUrl + '/updateCategoryStatus', data, { headers: header })
  }


  //product
  getProductList(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string, productData: Array<any> }>(urlconfig.productUrl + '/getProductList', data, { headers: header })
  }
  addProduct(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.productUrl + '/addProduct', data, { headers: header })
  }
  updateProduct(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.productUrl + '/updateProduct', data, { headers: header })
  }
  updateProductStatus(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.productUrl + '/updateProductStatus', data, { headers: header })
  }
  deleteProduct(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken')
    });
    return this.http.post<{ response_code: string }>(urlconfig.productUrl + '/deleteProduct', data, { headers: header })
  }

  //user

  getUserProfileData() {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string, userProfileData: any }>(urlconfig.usersUrl + '/getUserProfileData', '', { headers: header })
  }

  updatePersonalProfile(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string }>(urlconfig.usersUrl + '/updatePersonalProfile', data, { headers: header })
  }

  updatePrimaryEmail(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string }>(urlconfig.usersUrl + '/updatePrimaryEmail', data, { headers: header })
  }

  updateProfileImage(data) {
    let header = new HttpHeaders({
      "token": appSettings.getString('vcardToken') || ''
    });
    return this.http.post<{ response_code: string }>(urlconfig.usersUrl + '/updateProfileImage', data, { headers: header })
  }


  getUploadURL(data) {
    return this.http.post<{ response_code: string, uploadURL: string, Key: string, fileURL: string }>(urlconfig.commonUrl + '/createFileUploadUrl', data)
  }

  decryptdata(d) {
    const decryptedString = cryptLib.decryptCipherTextWithRandomIV(d, "vidyarthivigyanmanthan2021slc");
    return JSON.parse(decryptedString)
  }

  encryptdata(d) {
    let cipherText = cryptLib.encryptPlainTextWithRandomIV(JSON.stringify(d), "vidyarthivigyanmanthan2021slc");
    return cipherText.replace(/(\r\n|\n|\r)/gm, "")
  }

  timeformatter(time) {
    var tm = time.getDate() + "-" + (time.getMonth() + 1) + "-" + time.getFullYear() + " | " + time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return tm
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}
