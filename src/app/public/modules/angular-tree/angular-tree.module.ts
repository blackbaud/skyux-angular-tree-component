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
  SkyCheckboxModule
} from '@skyux/forms';
import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  SkyAngularTreeResourcesModule
} from '../shared/angular-tree-resources.module';

import {
  SkyAngularTreeContextMenuComponent
} from './angular-tree-context-menu.component';

import {
  SkyAngularTreeNodeWrapperComponent
} from './angular-tree-node-wrapper.component';

import {
  SkyTreeViewToolbarComponent
} from './angular-tree-toolbar.component';

import {
  SkyAngularTreeRootComponent
} from './angular-tree-root.component';

@NgModule({
  declarations: [
    SkyAngularTreeRootComponent,
    SkyAngularTreeContextMenuComponent,
    SkyAngularTreeNodeWrapperComponent,
    SkyTreeViewToolbarComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyIconModule,
    SkyToolbarModule,
    SkyAngularTreeResourcesModule,
    TreeModule.forRoot()
  ],
  exports: [
    SkyAngularTreeRootComponent,
    SkyAngularTreeContextMenuComponent,
    SkyAngularTreeNodeWrapperComponent,
    SkyTreeViewToolbarComponent,
    TreeModule
  ]
})
export class SkyAngularTreeModule { }
