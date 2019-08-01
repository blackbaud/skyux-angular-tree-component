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
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyTreeViewContextMenuComponent
} from './sky-tree-view-context-menu.component';

import {
  SkyTreeViewNodeWrapperComponent
} from './sky-tree-view-node-wrapper.component';

import {
  SkyTreeViewToolbarComponent
} from './sky-tree-view-toolbar.component';

import {
  SkyTreeViewComponent
} from './sky-tree-view.component';

@NgModule({
  declarations: [
    SkyTreeViewComponent,
    SkyTreeViewContextMenuComponent,
    SkyTreeViewNodeWrapperComponent,
    SkyTreeViewToolbarComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyDropdownModule,
    SkyIconModule,
    SkyToolbarModule,
    TreeModule.forRoot()
  ],
  exports: [
    SkyTreeViewComponent,
    SkyTreeViewContextMenuComponent,
    SkyTreeViewNodeWrapperComponent,
    SkyTreeViewToolbarComponent,
    TreeModule
  ]
})
export class SkyTreeViewModule { }
