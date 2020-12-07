import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  SkyAngularTreeModule
} from '@skyux/angular-tree-component';

import {
  SkyCheckboxModule,
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  TreeModule
} from 'angular-tree-component';

import {
  AngularTreeDemoComponent
} from './angular-tree-demo.component';

// Build will crash if we try to insert function calls inside the NgModule decorator.
// To get around this, we just use a variable to refer to the .forRoot() function call.
// https://github.com/angular/angular/issues/23609
const treeModuleForRoot = TreeModule.forRoot();

@NgModule({
  imports: [
    treeModuleForRoot,
    CommonModule,
    ReactiveFormsModule,
    SkyAngularTreeModule,
    SkyCheckboxModule,
    SkyDropdownModule,
    SkyFluidGridModule,
    SkyRadioModule
  ],
  declarations: [
    AngularTreeDemoComponent
  ],
  exports: [
    AngularTreeDemoComponent
  ]
})
export class AngularTreeDemoModule { }
