import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyTreeViewModule
} from './public/modules/sky-tree-view/sky-tree-view.module';

@NgModule({
  exports: [
    SkyCheckboxModule,
    SkyDropdownModule,
    SkyIconModule,
    SkyTreeViewModule
  ]
})
export class AppExtrasModule { }
