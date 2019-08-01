import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyTreeViewModule
} from './../sky-tree-view.module';

import {
  SkyTreeViewFixtureComponent
} from './tree-view.fixture.component';

@NgModule({
  imports: [
    CommonModule,
    SkyTreeViewModule
  ],
  declarations: [
    SkyTreeViewFixtureComponent
  ],
  exports: [
  ]
})
export class SkyTreeViewFixturesModule { }
