import {
  NgModule
} from '@angular/core';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyAngularTreeModule
} from './public/modules/angular-tree/angular-tree.module';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyDropdownModule,
    SkyAngularTreeModule
  ]
})
export class AppExtrasModule { }
