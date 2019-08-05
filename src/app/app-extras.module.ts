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
  SkyTreeViewModule
} from './public/modules/sky-tree-view/sky-tree-view.module';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyDropdownModule,
    SkyTreeViewModule
  ]
})
export class AppExtrasModule { }
