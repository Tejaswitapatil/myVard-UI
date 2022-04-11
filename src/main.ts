// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AlertTypesConstants, StoreUpdate } from 'nativescript-store-update'
import { AppModule } from "./app/app.module";
import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
import {
  android as androidApp,
  AndroidApplication,
  AndroidActivityBundleEventData
} from "tns-core-modules/application";
registerElement('PDFView', () => PDFView);
declare let com: any;
import { ad } from "tns-core-modules/utils/utils";
import * as SocialLogin from "nativescript-social-login";
import * as application from 'tns-core-modules/application';
registerElement("ImageSwipe", () => require("nativescript-image-swipe/image-swipe").ImageSwipe);

if (application.android) {
  application.android.on(application.AndroidApplication.activityResumedEvent, () => {
      let result = SocialLogin.init({
          google: {
              initialize: true,
              // serverClientId: '657716183305-1e8fsttat36v0hhsbgehr8krme0vklp8.apps.googleusercontent.com'
              serverClientId: '657716183305-2cjoulqvkq3vag3jvm1q13b3vg6l1g0i.apps.googleusercontent.com',
              isRequestAuthCode: false,
          },
          facebook: {
            initialize: true,
          }
      });
  });

  // SocialLogin.addLogger(function (msg: any, tag: string) {
  //     console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
  // });
}


StoreUpdate.init({
    majorUpdateAlertType: AlertTypesConstants.OPTION,
    notifyNbDaysAfterRelease: 0,
    alertOptions: {
      title: 'Attention please',
      message: 'Your app is out of date',
    },
  })
  
  const context = ad.getApplicationContext();
  androidApp.on(AndroidApplication.activityCreatedEvent, (args: AndroidActivityBundleEventData) => {
    
    com.google.android.gms.security.ProviderInstaller.installIfNeededAsync(
      context,
      new com.google.android.gms.security.ProviderInstaller.ProviderInstallListener(
        {
          onProviderInstalled: () => {
            console.log("Provider Installed!");
          },
          onProviderInstallFailed: (errorCode, intent) => {
            console.log("Error: " + errorCode);
          }
        }
      )
    );
  });


platformNativeScriptDynamic().bootstrapModule(AppModule);
