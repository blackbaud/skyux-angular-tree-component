import {
  NgModule
} from '@angular/core';

import {
  SKY_LIB_RESOURCES_PROVIDERS,
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyTreeViewResourcesProvider
} from '../../plugin-resources/sky-tree-view-resources-provider';

@NgModule({
  exports: [
    SkyI18nModule
  ],
  providers: [{
    provide: SKY_LIB_RESOURCES_PROVIDERS,
    useClass: SkyTreeViewResourcesProvider,
    multi: true
  }]
})
export class SkyTreeViewResourcesModule { }
