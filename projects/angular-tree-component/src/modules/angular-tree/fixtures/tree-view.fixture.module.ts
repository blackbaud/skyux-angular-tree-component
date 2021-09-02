import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyAngularTreeModule
} from '../angular-tree.module';

import {
  SkyTreeViewFixtureComponent
} from './tree-view.fixture.component';

@NgModule({
  imports: [
    CommonModule,
    SkyAngularTreeModule,
    SkyDropdownModule
  ],
  declarations: [
    SkyTreeViewFixtureComponent
  ],
  exports: [
  ]
})
export class SkyTreeViewFixturesModule { }
