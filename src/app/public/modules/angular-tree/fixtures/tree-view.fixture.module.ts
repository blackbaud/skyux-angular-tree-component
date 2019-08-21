import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  TreeModule
} from 'angular-tree-component';

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
    TreeModule.forRoot()
  ],
  declarations: [
    SkyTreeViewFixtureComponent
  ],
  exports: [
  ]
})
export class SkyTreeViewFixturesModule { }
