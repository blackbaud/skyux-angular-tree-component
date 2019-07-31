import { TreeModule } from 'angular-tree-component';
import { SkyToolbarModule } from '@skyux/layout';
import { SkyDropdownModule } from '@skyux/popovers';
import { SkyIconModule } from '@skyux/indicators';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyTreeViewService } from './sky-tree-view.service';
import { NgModule } from '@angular/core';
import { SkyTreeViewNodeWrapperComponent } from './sky-tree-view-node-wrapper.component';
import { SkyTreeViewToolbarComponent } from './sky-tree-view-toolbar.component';
import { CommonModule } from '@angular/common';
import { SkyTreeViewComponent } from './sky-tree-view.component';
import { SkyTreeViewContextMenuComponent } from './sky-tree-view-context-menu.component';

@NgModule({
  declarations: [
    SkyTreeViewNodeWrapperComponent,
    SkyTreeViewToolbarComponent,
    SkyTreeViewComponent,
    SkyTreeViewContextMenuComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyToolbarModule,
    SkyDropdownModule,
    SkyToolbarModule,
    SkyIconModule,
    TreeModule.forRoot()
  ],
  providers: [
    SkyTreeViewService
  ],
  exports: [
    SkyTreeViewNodeWrapperComponent,
    SkyTreeViewToolbarComponent,
    SkyTreeViewComponent,
    SkyTreeViewContextMenuComponent,
    TreeModule
  ]
})
export class SkyTreeViewModule { }