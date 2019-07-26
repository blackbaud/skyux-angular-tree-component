import {
  NgModule
} from '@angular/core';

import {
  TreeModule, TreeModel
} from 'angular-tree-component';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  MyLibrarySampleModule
} from './public';

@NgModule({
  imports: [
    TreeModule.forRoot()
  ],
  providers: [
    TreeModel
  ],
  exports: [
    MyLibrarySampleModule,
    SkyCheckboxModule,
    SkyDropdownModule,
    SkyToolbarModule,
    TreeModule
  ]
})
export class AppExtrasModule { }
