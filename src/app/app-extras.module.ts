import {
  NgModule
} from '@angular/core';

import {
  MyLibrarySampleModule
} from './public';

import { SkyTreeViewModule } from './public/modules/sky-tree-view/sky-tree-view.module';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyIconModule } from '@skyux/indicators';

@NgModule({
  exports: [
    MyLibrarySampleModule,
    SkyTreeViewModule,
    SkyCheckboxModule,
    SkyIconModule
  ]
})
export class AppExtrasModule { }
