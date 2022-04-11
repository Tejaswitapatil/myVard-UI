import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormatTimePipe } from './displaytime.pipe';

@NgModule({
  declarations: [
    FormatTimePipe
  ],
  exports: [
    FormatTimePipe
  ]
})
export class SharingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharingModule,
      providers: []
    };
  }
}